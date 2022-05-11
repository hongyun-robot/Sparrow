import { ticks } from '../../src/scale';

describe('Test the utils file', () => {
  test('Test the return value of the Ticks function', () => {
    const t = ticks(1, 10, 5);
    console.log(t);
  })
})
