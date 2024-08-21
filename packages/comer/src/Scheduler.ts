import { nextTick } from "ober";
import { HostAdapter, HostElement, HostIdleDeadline } from "./HostAdapter";
import { Flag } from "./Flag";

export type TaskHandler = () => void;
export type TaskPriority = "flush" | "immed" | "main" | "defer";
export type TaskContext = () => any;

export class Scheduler<T extends HostAdapter<HostElement>> {
  constructor(protected adapter: T) {}

  private priority = Flag<TaskPriority>("main");

  // ---------------------------- main -----------------------------

  private mainRunning = false;
  private mainTasks = new Set<TaskHandler>();

  private runMainTasks = () => {
    this.mainTasks.forEach((task) => task());
    this.mainTasks.clear();
    this.mainRunning = false;
    this.requestRunDeferTasks();
  };

  private requestRunMainTasks() {
    if (this.mainRunning) return;
    this.mainRunning = true;
    nextTick(this.runMainTasks);
  }

  // ---------------------------- defer -----------------------------

  private deferCallbackId: unknown;
  private deferTasks = new Set<TaskHandler>();

  private runDeferTasks = (deadline: HostIdleDeadline) => {
    if (this.mainRunning) return;
    for (const task of this.deferTasks) {
      if (deadline.timeRemaining() <= 0) break;
      if (task) task();
      this.deferTasks.delete(task);
    }
    this.deferCallbackId = void 0;
    if (this.deferTasks.size > 0) this.requestRunDeferTasks();
  };

  private requestRunDeferTasks() {
    if (this.mainRunning) return;
    if (this.deferCallbackId) return;
    this.deferCallbackId = this.adapter.requestIdleCallback(this.runDeferTasks);
  }

  // ----------------------------- immed -----------------------------

  private immedTasks = new Set<TaskHandler>();

  private runImmedTasks = () => {
    this.immedTasks.forEach((task) => task());
    this.immedTasks.clear();
  };

  // ----------------------------- paint -----------------------------

  private paintCallbackId: unknown;
  private paintTasks = new Set<TaskHandler>();

  private runPaintTasks = () => {
    this.mainTasks.forEach((task) => task());
    this.mainTasks.clear();
    this.paintCallbackId = void 0;
  };

  private requestRunPaintTasks() {
    if (this.paintCallbackId) return;
    const priority = this.priority.current();
    if (priority === "flush") return;
    this.paintCallbackId = this.adapter.requestPaintCallback(
      this.runPaintTasks,
    );
  }

  // ----------------------- execute & cancel -------------------------

  post(task: TaskHandler): void {
    if (!task) return;
    const priority = this.priority.current();
    if (priority === "immed" || priority === "flush") {
      this.immedTasks.add(task);
    } else if (priority === "defer") {
      this.deferTasks.add(task);
      this.requestRunDeferTasks();
    } else {
      this.mainTasks.add(task);
      this.requestRunMainTasks();
    }
  }

  paint(task: TaskHandler): void {
    if (!task) return;
    this.paintTasks.add(task);
    this.requestRunPaintTasks();
  }

  cancel(task: TaskHandler) {
    if (!task) return;
    this.deferTasks.delete(task);
    this.mainTasks.delete(task);
    this.immedTasks.delete(task);
    this.paintTasks.delete(task);
  }

  // ---------------------------- context -----------------------------

  defer<C extends TaskContext>(contextHandler: C): ReturnType<C> {
    return this.priority.run("defer", contextHandler);
  }

  immed<C extends TaskContext>(contextHandler: C): ReturnType<C> {
    const result = this.priority.run("immed", contextHandler);
    this.runImmedTasks();
    return result;
  }

  flush<C extends TaskContext>(contextHandler: C): ReturnType<C> {
    const result = this.immed(() => this.priority.run("flush", contextHandler));
    this.runPaintTasks();
    return result;
  }
}
