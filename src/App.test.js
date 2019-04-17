import { roundValue } from './Math';
import { hasEmptyArrays, countedDuplicates } from './arrays';
import { mapValues } from './objects';

describe('Math', () => {
  it('should round value up', () => {
    expect(roundValue(0.9)).toEqual(1);
  });
  it('should round value down', () => {
    expect(roundValue(12.12345677)).toEqual(12);
  });
});

describe('Arrays', () => {
  it('should return number of empty arrays', () => {
    const arrays = [[], [], ['a', 'b'], [], ['c', 'd', 'e']];

    expect(hasEmptyArrays(arrays)).toEqual([false, false, true, false, true]);
  });
  it('should count duplicates in array', () => {
    const array = ['a', 'b', 'a', 'c', 'd', 'e', 'a', 'c'];

    expect(countedDuplicates(array)).toEqual({ a: 3, b: 1, c: 2, d: 1, e: 1 });
  });
});

describe('Objects', () => {
  it('should return proper values', () => {
    const players = {
      player1: { name: 'Lionel', secondName: 'Messi', age: 99 },
      player2: { name: 'Cristiano', secondName: 'Ronaldo', age: 99 }
    };

    expect(mapValues(({ secondName }) => secondName)(players)).toEqual([
      'Messi',
      'Ronaldo'
    ]);
  });
});
