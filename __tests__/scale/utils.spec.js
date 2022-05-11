import { ticks, tickStep, nice, ceil, floor } from '../../src/scale';

describe('Test the utils file', () => {
  test('Test the return value of the Ticks function', () => {
    const t = ticks(1, 10, 5);
    console.log(t);
  })

  test('Test the return value of the nice function', () => {
    let d0 = 0.1;
    let d1 = 9.9;
    const step = tickStep(d0, d1, 6);
    [d0, d1] = nice([0.1, 9.9], {
      floor: (x) => floor(x, step),
      ceil: (x) => ceil(x, step),
    });

    console.log(d0);
    console.log(d1);
    console.log(ticks(d0, d1, 6));
  })
})
