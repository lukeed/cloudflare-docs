import { cpus } from 'os';
import { Pool } from './pool';

const pool = new Pool({
  script: new URL('./demo.mjs', import.meta.url),
  max: cpus().length,
  spawn: {
    execArgv: ['--loader','tsm']
  }
});

let i = 0;
let finished = 0;
for (; i < 10; i++) {
  pool.run<number>({ a: 42, b: 100 }, (err, result) => {
    console.log({ i, err, result, finished });
    if (++finished === 10) {
      console.log('>>> CLOSING <<<');
      pool.close();
    }
  });
}
