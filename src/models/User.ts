import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}
type UserProp = number | string | undefined;

const baseURL = 'http://localhost:3000';
export const User = (data: UserProps) => {
  const state = { data };
  const { on, trigger } = Eventing();
  const get = (propName: keyof UserProps): UserProp => state.data[propName];
  const set = (update: UserProps): void => {
    Object.assign(state.data, update);
  };

  return {
    on,
    trigger,
    get,
    set,

    async fetch(): Promise<void> {
      const id = get('id');
      const response: AxiosResponse = await axios.get(`${baseURL}/users/${id}`);
      set(response.data);

      return response.data;
    },
    async save(): Promise<void> {
      const id = get('id');

      // if there is alrady an object with the id yet we update its value
      if (id) {
        const response: AxiosResponse = await axios.put(
          `${baseURL}/users/${id}`,
          state.data
        );
        return response.data;
        // otherwise we create a new object with the data provided
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
