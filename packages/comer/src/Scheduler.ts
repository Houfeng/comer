import { nextTick } from "ober";
import { HostAdapter, HostElement } from "./HostAdapter";
import { Flag } from "./Flag";

export type TaskHandler = () => void;
export type TaskOptions = { deferrable: boolean };

export class Scheduler<T extends HostAdapter<HostElement>> {
  /**
   * Create a comer scheduler instance using the specified adapter
   * @param adapter Host adapter (eg. DOMAdapter)
   */
  constructor(protected adapter: T) {}

  private immedTasks = new Set<TaskHandler>();
  private deferTasks = new Set<TaskHandler>();

  private immedTasksRunning = false;
  private runImmedTasks() {
    if (this.immedTasksRunning) return;
    this.immedTasksRunning = true;
    nextTick(() => {
      const tasks = new Set(this.immedTasks);
      tasks.forEach((task) => task());
      this.immedTasks.clear();
      this.immedTasksRunning = false;
      this.runDeferTasks();
    });
  }

  private deferTasksRunning = false;
  private runDeferTasks = () => {
    if (this.immedTasksRunning) return;
    if (this.deferTasksRunning) return;
    this.deferTasksRunning = true;
    this.adapter.requestHostCallback(() => {
      const tasks = new Set(this.deferTasks);
      tasks.forEach((task) => task());
      this.deferTasks.clear();
      this.deferTasksRunning = false;
    });
  };

  perform(task: TaskHandler, options: TaskOptions): void {
    if (!task) return;
    const { deferrable } = options;
    if (this.syncFlag.current()) {
      this.syncTasks.add(task);
    } else if (deferrable) {
      this.deferTasks.add(task);
      this.runDeferTasks();
    } else {
      this.immedTasks.add(task);
      this.runImmedTasks();
    }
  }

  private syncFlag = Flag(false);
  private syncTasks = new Set<TaskHandler>();

  /**
   * Synchronize triggering component updates,
   * please use with caution as it may cause lag.
   */
  flushSync<H extends () => any>(handler: H): ReturnType<H> {
    this.syncTasks.clear();
    const result = this.syncFlag.run(true, handler);
    const tasks = new Set(this.syncTasks);
    tasks.forEach((task) => task());
    return result;
  }
}
