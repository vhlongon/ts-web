export const Attributes = <T>(data: T) => {
  return {
    // this is constraints the type "K" can be
    // so in the case of UserProps - id, age, name
    // then in the return we match the type for the prop
    get: <K extends keyof T>(key: K): T[K] => data[key],
    set: (update: T): void => {
      Object.assign(data, update);
    },
  };
};
