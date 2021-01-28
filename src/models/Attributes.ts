export const Attributes = <T>(data: T) => ({
  get: <K extends keyof T>(key: K): T[K] => data[key],
  set: (update: T): void => {
    Object.assign(data, update);
  },
});
