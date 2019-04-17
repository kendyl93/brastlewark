export const mapValues = f => xs =>
  Object.entries(xs).map(([key, value]) => f(value, key, xs));
