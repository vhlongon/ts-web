import axios, { AxiosResponse } from 'axios';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
type Callback = () => void;
type UserProp = number | string | undefined;
// an object with key as event name and the value will be a callback
type Events = { [key: string]: Callback[] };

const baseURL = 'http://localhost:3000';
export const User = (data: UserProps) => {
  const state = { data, events: <Events>{} };
  const get = (propName: keyof UserProps): UserProp => state.data[propName];
  const set = (update: UserProps): void => {
    Object.assign(state.data, update);
  };

  return {
    get,
    set,
    on(eventName: string, callback: Callback): void {
      const handlers = state.events[eventName] || []; // Callback[] or undefined

      state.events[eventName] = [...handlers, callback];
    },
    trigger(eventName: string): void {
      const handlers = state.events[eventName] || [];

      if (!handlers.length) {
        return;
      }

      handlers.forEach((callback: Callback) => {
        callback();
      });
    },
    async fetch(): Promise<void> {
      const id = get('id');
      const response: AxiosResponse = await axios.get(`${baseURL}/users/${id}`);
      set(response.data);

      return response.data;
    },
    async save(): Promise<void> {
      const id = get('id');

      if (id) {
        const response: AxiosResponse = await axios.put(
          `${baseURL}/users/${id}`,
          state.data
        );
        return response.data;
      } else {
        const response: AxiosResponse = await axios.post(
          `${baseURL}/users`,
          state.data
        );
        return response.data;
      }
    },
  };
};
