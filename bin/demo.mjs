import { on } from 'events';
import { parentPort } from 'worker_threads';
// import { parentPort } from 'worker_threads';
import { listen } from './pool.ts';

// for await (let [task] of on(parentPort, 'message')) {
//   console.log('~> HEARD', task);
//   parentPort.postMessage(task.a + task.b);
// }

// parentPort.on('message', (task) => {
//   console.log('>>> heard', task);
//   parentPort.postMessage(task.a + task.b);
// });

// console.log('INSIDE DEMO WORKER');
await listen(task => {
// parentPort.on('message', task => {
  // console.log('>> listen', task);
  // throw new Error('too big');
  parentPort.postMessage(task.a + task.b);
});
