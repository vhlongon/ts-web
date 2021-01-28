import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { Sync } from './Sync';

interface UserData {
  id?: number;
  name?: string;
  age?: number;
}

type UserPropsPromise = Promise<UserData | void>;

const baseURL = 'http://localhost:3000/users';
export const User = (data: UserData) => {
  const state = { data };
  const { on, trigger } = Eventing();
  const sync = Sync<UserData>(baseURL);
  const { get, set: setAttribute } = Attributes<UserData>(state.data);
  const set = (update: UserData): void => {
    setAttribute(update);
    trigger('change', update);
  };
  return {
    data: state.data,
    on,
    trigger,
    get,
    set,
    fetch: async (): UserPropsPromise => {
      try {
        const id = get('id');

        if (!id) {
          const error = new Error('Cannot fetch without an id');
          trigger('error', error);
          return;
        }

        const response = await sync.fetch(id);
        set(response.data);
      } catch (e) {
        trigger('error', e);
      }
    },
    save: async (): UserPropsPromise => {
      try {
        const response = await sync.save(state.data);
        trigger('save', response.data);
      } catch (e) {
        trigger('error', e);
      }
    },
  };
};
