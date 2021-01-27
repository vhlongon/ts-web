import { Attributes } from './Attributes';
import axios, { AxiosResponse } from 'axios';
import { Eventing } from './Eventing';

interface UserProps {
  id?: number;
  name?: string;
  age?: number;
}

const baseURL = 'http://localhost:3000';
export const User = (data: UserProps) => {
  const state = { data };
  const { on, trigger } = Eventing();
  const { get, set } = Attributes<UserProps>(state.data);

  return {
    on,
    trigger,
    get,
    set,

    fetch: async (): Promise<void> => {
      const id = get('id');
      const response: AxiosResponse = await axios.get(`${baseURL}/users/${id}`);
      set(response.data);

      return response.data;
    },
    save: async (): Promise<void> => {
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
