export interface AttributesInterface<T> {
  get: <K extends keyof T>(key: K) => T[K];
  getAll(): T;
  set(update: T): void;
}

export const Attributes = <T>(data: T): AttributesInterface<T> => ({
  get: (key) => data[key],
  set: (update) => {
    Object.assign(data, update);
  },
  getAll: (): T => data,
});
