import { AxiosResponse } from 'axios';

interface Attributes<T> {
  get<K extends keyof T>(key: K): T[K];
  getAll(): T;
  set(update: T): void;
}

interface Sync<T> {
  fetch(id: number): Promise<AxiosResponse>;
  save(data: T): Promise<AxiosResponse>;
}

type ModelPromise = Promise<void>;

interface Events {
  on(eventName: string, callback: (params: unknown) => void): void;
  trigger(eventName: string, params?: unknown): void;
}

interface WithId {
  id?: number;
}

export interface ModelInterface<T> extends Attributes<T>, Events {
  data: T;
  fetch(): void;
  save(): void;
}

export const Model = <T extends WithId>(
  attributes: Attributes<T>,
  events: Events,
  sync: Sync<T>
): ModelInterface<T> => {
  const { on, trigger } = events;
  const { get, set: setAttribute, getAll } = attributes;
  const set = (update: T): void => {
    setAttribute(update);
    trigger('change', update);
  };
  return {
    getAll,
    data: getAll(),
    on,
    trigger,
    get,
    set,
    fetch: async (): ModelPromise => {
      try {
        const id = get('id');

        if (!id || typeof id !== 'number') {
          const error = new Error('Cannot fetch without a valid id');
          trigger('error', error);
          return;
        }

        const response = await sync.fetch(id);
        set(response.data);
      } catch (e) {
        trigger('error', e);
      }
    },
    save: async (): ModelPromise => {
      try {
        const response = await sync.save(getAll());
        trigger('save', response.data);
      } catch (e) {
        trigger('error', e);
      }
    },
  };
};
