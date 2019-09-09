import {randomIntFromInterval} from "./random";

describe('Random function', () => {
  it('should return random value more than 0 and less than 100', () => {
    const min = 0;
    const max = 100;
    const randomNumber = randomIntFromInterval(min, max);
    expect(randomNumber).toBeLessThan(max+1);
    expect(randomNumber).toBeGreaterThan(min-1);
  });
});
