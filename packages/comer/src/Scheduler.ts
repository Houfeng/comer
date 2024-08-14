import { nextTick } from "ober";
import { HostAdapter, HostElement, HostIdleDeadline } from "./HostAdapter";
import { Flag } from "./Flag";

export type TaskHandler = () => void;
export type TaskOptions = { deferrable: boolean };

export class Scheduler<T extends HostAdapter<HostElement>> {
  constructor(protected adapter: T) {}

  // ---------------------------- immed -----------------------------

  private immedRunning = false;
  private immedTasks = new Set<TaskHandler>();

  private runImmedTasks = () => {
    this.immedTasks.forEach((task) => task());
    this.immedTasks.clear();
    this.immedRunning = false;
    this.requestRunDeferTasks();
  };

  private requestRunImmedTasks() {
    if (this.immedRunning) return;
    this.immedRunning = true;
    nextTick(this.runImmedTasks);
  }

  // ---------------------------- defer -----------------------------

  private deferTasks = new Set<TaskHandler>();

  private runDeferTasks = (deadline: HostIdleDeadline) => {
    if (this.immedRunning) return;
    for (const task of this.deferTasks) {
      if (deadline.timeRemaining() <= 0) break;
      if (task) task();
      this.deferTasks.delete(task);
    }
    if (this.deferTasks.size > 0) this.requestRunDeferTasks();
  };

  private deferRunId: unknown;
  private requestRunDeferTasks() {
    if (this.immedRunning) return;
    if (this.deferRunId) this.adapter.cancelIdleCallback(this.deferRunId);
    this.deferRunId = this.adapter.requestIdleCallback(this.runDeferTasks);
  }

  // ---------------------------- sync -----------------------------

  private syncFlag = Flag(false);
  private syncTasks = new Set<TaskHandler>();

  get syncing() {
    return this.syncFlag.current();
  }

  flushSync<H extends () => any>(handler: H): ReturnType<H> {
    this.syncTasks.clear();
    const result = this.syncFlag.run(true, handler);
    this.syncTasks.forEach((task) => task());
    this.syncTasks.clear();
    return result;
  }

  // ----------------------------- perform -----------------------------

  perform(task: TaskHandler, options: TaskOptions): void {
    if (!task) return;
    const { deferrable } = options;
    if (this.syncFlag.current()) {
      this.syncTasks.add(task);
    } else if (deferrable) {
      this.deferTasks.add(task);
      this.requestRunDeferTasks();
    } else {
      this.immedTasks.add(task);
      this.requestRunImmedTasks();
    }
  }

  // ----------------------------- cancel ------------------------------

  cancel(task: TaskHandler) {
    if (!task) return;
    this.deferTasks.delete(task);
    this.immedTasks.delete(task);
    this.syncTasks.delete(task);
  }
}
