export const hasEmptyArrays = arrays =>
  arrays.map(array => array.length > 0 && array !== undefined);

export const countedDuplicates = array => {
  const result = {};

  for (let i = 0; i < array.length; i++) {
    result[array[i]] = (result[array[i]] || 0) + 1;
  }

  return result;
};
