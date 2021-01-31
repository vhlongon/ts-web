import axios, { AxiosResponse } from 'axios';
import { Eventing, EventsInterface } from './Eventing';

export interface CollectionInterface<T> extends EventsInterface {
  fetch(): Promise<void>;
  models: T[];
}

// we can pass as many generics as needed
// in this case T represents an instance of for example User
// while K represents the data structure returned, for example a user object
export const Collection = <T, K>(
  rootUrl: string,
  deserialize: (json: K) => T
): CollectionInterface<T> => {
  const { on, trigger } = Eventing();
  const models: T[] = [];

  return {
    on,
    trigger,
    fetch: async (): Promise<void> => {
      const response: AxiosResponse = await axios.get(rootUrl);

      response.data.forEach((value: K) => {
        models.push(deserialize(value));
      });

      trigger('change');
    },
    models,
  };
};
