import { AsyncResource } from 'async_hooks';
import { isMainThread, parentPort, Worker } from 'worker_threads';
import { EventEmitter } from 'events';
import { cpus } from 'os';

import type { WorkerOptions } from 'worker_threads';

const FREE = Symbol('FREE');

export interface Options {
  script: URL | string;
  spawn?: WorkerOptions;
  max?: number;
}

export type Callback<T=unknown> = (err: Error|null, result: T) => Promise<void> | void;

export interface Task<I=any, R=unknown> {
  input: I;
  handle: Callback<R>;
}

function exec<R=unknown>(callback: Callback<R>, err: Error|null, result: R | null) {
  let item = new AsyncResource('Task');
  item.runInAsyncScope(callback, null, err, result);
  item.emitDestroy(); // single use
}

export class Pool extends EventEmitter {
  jobs: Map<number, Callback<unknown>>;
  idles: Worker[];
  workers: Set<Worker>;
  script: URL|string;
  tasks: Task[];

  private options?: WorkerOptions;
  private exit: boolean;

  constructor(options: Options) {
    super();

    this.idles = [];
    this.script = options.script;
    this.workers = new Set;
    this.jobs = new Map;
    this.tasks = [];

    this.exit = false;
    this.options = {
      execArgv: [],
      ...options.spawn,
    };

    let i = 0;
    let max = options.max || cpus().length;
    while (i++ < max) this.spawn();

    this.on(FREE, () => {
      if (this.tasks.length > 0) {
        let task = this.tasks.shift()!;
        this.run(task.input, task.handle);
      }
    });
  }

  spawn(options?: WorkerOptions) {
    if (this.exit) return;

    let worker = new Worker(this.script, { ...this.options, ...options });

    worker.on('message', result => {
      let tid = worker.threadId;
      let handle = this.jobs.get(tid)!;
      exec(handle, null, result);

      this.jobs.delete(tid);
      this.idles.push(worker);
      this.emit(FREE);
    });

    worker.on('error', err => {
      let tid = worker.threadId;
      let handle = this.jobs.get(tid);

      if (handle) exec(handle, err, null);
      else this.emit('error', err);

      // replace current/dead worker
      this.workers.delete(worker);

      // TODO: options.retry
      this.jobs.delete(tid);
      this.spawn();
    });

    this.idles.push(worker);
    this.workers.add(worker);
    this.emit(FREE);
  }

  run<R, T=any>(input: T, handle: Callback<R>) {
    if (this.idles.length > 0) {
      let worker = this.idles.pop()!;
      // TODO: save `input` somewhere for/if retry
      this.jobs.set(worker.threadId, handle as Callback<unknown>);
      worker.postMessage(input);
    } else {
      this.tasks.push({ input, handle } as Task);
    }
  }

  close() {
    this.exit = true;
    for (let worker of this.workers) {
      worker.terminate();
    }
  }
}

export const isMain = isMainThread;
export const isWorker = !isMainThread;

export function listen<R=unknown>(callback: Callback<R>) {
  if (parentPort) parentPort.on('message', callback);
  else throw new Error("Missing `parentPort` link");
}
