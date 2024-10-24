import { nextTick } from "ober";
import { HostAdapter, HostElement, HostIdleDeadline } from "./HostAdapter";
import { Flag } from "./Flag";

export type TaskHandler = () => void;
export type TaskPriority = "flush" | "immed" | "usual" | "defer";
export type TaskContext = () => any;

export class Scheduler<T extends HostAdapter<HostElement>> {
  constructor(protected adapter: T) { }

  private priority = Flag<TaskPriority>("usual");

  get current() {
    return this.priority.current();
  }

  // ---------------------------- usual -----------------------------

  private usualRunning = false;
  private usualTasks = new Set<TaskHandler>();

  private runUsualTasks = () => {
    this.usualTasks.forEach((task) => task());
    this.usualTasks.clear();
    this.usualRunning = false;
    this.requestRunDeferTasks();
  };

  private requestRunUsualTasks() {
    if (this.usualRunning) return;
    this.usualRunning = true;
    nextTick(this.runUsualTasks);
  }

  // ---------------------------- defer -----------------------------

  private deferCallbackId: unknown;
  private deferTasks = new Set<TaskHandler>();

  private runDeferTasks = (deadline: HostIdleDeadline) => {
    if (this.usualRunning) return;
    for (const task of this.deferTasks) {
      if (deadline.timeRemaining() <= 0) break;
      this.defer(() => task());
      this.deferTasks.delete(task);
    }
    this.deferCallbackId = void 0;
    if (this.deferTasks.size > 0) this.requestRunDeferTasks();
  };

  private requestRunDeferTasks() {
    if (this.usualRunning) return;
    if (this.deferCallbackId) return;
    const { requestIdleCallback } = this.adapter;
    this.deferCallbackId = requestIdleCallback(this.runDeferTasks);
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
    this.paintTasks.forEach((task) => task());
    this.paintTasks.clear();
    this.paintCallbackId = void 0;
  };

  private requestRunPaintTasks() {
    if (this.paintCallbackId) return;
    const priority = this.current;
    if (priority === "flush") return;
    const { requestPaintCallback } = this.adapter;
    this.paintCallbackId = requestPaintCallback(this.runPaintTasks);
  }

  // ----------------------- execute & cancel -------------------------

  post = (task: TaskHandler): void => {
    if (!task) return;
    const priority = this.current;
    if (priority === "immed" || priority === "flush") {
      this.immedTasks.delete(task);
      this.immedTasks.add(task);
    } else if (priority === "defer") {
      this.deferTasks.delete(task);
      this.deferTasks.add(task);
      this.requestRunDeferTasks();
    } else {
      this.usualTasks.delete(task);
      this.usualTasks.add(task);
      this.requestRunUsualTasks();
    }
  };

  paint = (task: TaskHandler): void => {
    if (!task) return;
    this.paintTasks.delete(task);
    this.paintTasks.add(task);
    this.requestRunPaintTasks();
  };

  cancel = (task?: TaskHandler): void => {
    if (!task) return;
    this.deferTasks.delete(task);
    this.usualTasks.delete(task);
    this.immedTasks.delete(task);
    this.paintTasks.delete(task);
  };

  // ---------------------------- context -----------------------------

  defer = <C extends TaskContext>(fn: C): ReturnType<C> => {
    if (this.priority.current() === "defer") return fn();
    return this.priority.run("defer", fn);
  };

  immed = <C extends TaskContext>(fn: C): ReturnType<C> => {
    if (this.priority.current() === "immed") return fn();
    return this.priority.run("immed", () => {
      const result = fn();
      this.runImmedTasks();
      return result;
    });
  };

  flush = <C extends TaskContext>(fn: C): ReturnType<C> => {
    if (this.priority.current() === "flush") return fn();
    return this.priority.run("flush", () => {
      const result = fn();
      this.runImmedTasks();
      this.runPaintTasks();
      return result;
    });
  };
}
