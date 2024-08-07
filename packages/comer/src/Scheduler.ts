import { nextTick } from "ober";
import { HostAdapter, HostElement, HostIdleDeadline } from "./HostAdapter";
import { Flag } from "./Flag";

export type TaskHandler = () => void;
export type TaskOptions = { deferrable: boolean };

export class Scheduler<T extends HostAdapter<HostElement>> {
  /**
   * Create a comer scheduler instance using the specified adapter
   * @param adapter Host adapter (eg. DOMAdapter)
   */
  constructor(protected adapter: T) {}

  // ---------------------------- immed -----------------------------

  private immedFlag = Flag(true);
  private immedRunning = false;
  private immedTasks = new Set<TaskHandler>();

  private runImmedTasks = () => {
    this.immedFlag.run(false, () => this.immedTasks.forEach((task) => task()));
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

  private deferFlag = Flag(true);
  private deferTasks = new Set<TaskHandler>();

  private runDeferTasks = (deadline: HostIdleDeadline) => {
    this.deferFlag.run(false, () => {
      for (const task of this.deferTasks) {
        if (task) task();
        this.deferTasks.delete(task);
        if (deadline.timeRemaining() < 1) break;
      }
    });
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

  /**
   * Synchronize triggering component updates,
   * please use with caution as it may cause lag.
   */
  flushSync<H extends () => any>(handler: H): ReturnType<H> {
    this.syncTasks.clear();
    const result = this.syncFlag.run(true, handler);
    this.syncFlag.run(false, () => this.syncTasks.forEach((task) => task()));
    this.syncTasks.clear();
    return result;
  }

  // =---------------------------- perform -----------------------------

  perform(task: TaskHandler, options: TaskOptions): void {
    if (!task) return;
    const { deferrable } = options;
    if (this.syncFlag.current()) {
      this.syncTasks.add(task);
    } else if (this.deferFlag.current() && deferrable) {
      this.deferTasks.add(task);
      this.requestRunDeferTasks();
    } else if (this.immedFlag.current()) {
      this.immedTasks.add(task);
      this.requestRunImmedTasks();
    }
  }
}
