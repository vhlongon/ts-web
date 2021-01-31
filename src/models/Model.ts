import { AttributesInterface } from './Attributes';
import { EventsInterface } from './Eventing';
import { ApiSyncInterface, WithIdInterface } from './ApiSync';

export interface ModelInterface<T>
  extends AttributesInterface<T>,
    EventsInterface {
  data: T;
  fetch(): Promise<void>;
  save(): Promise<void>;
}

export const Model = <T extends WithIdInterface>(
  attributes: AttributesInterface<T>,
  events: EventsInterface,
  sync: ApiSyncInterface<T>
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
    fetch: async (): Promise<void> => {
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
    save: async (): Promise<void> => {
      try {
        const response = await sync.save(getAll());
        trigger('save', response.data);
      } catch (e) {
        trigger('error', e);
      }
    },
  };
};
