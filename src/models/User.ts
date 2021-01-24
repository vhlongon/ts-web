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
export const User = (data: UserProps) => ({
  events: <Events>{},
  get(propName: keyof UserProps): UserProp {
    return data[propName];
  },
  set(update: UserProps): void {
    Object.assign(data, update);
  },
  on(eventName: string, callback: Callback): void {
    const handlers = this.events[eventName] || []; // Callback[] or undefined

    this.events[eventName] = [...handlers, callback];
  },
  trigger(eventName: string): void {
    const handlers = this.events[eventName] || [];

    if (!handlers.length) {
      return;
    }

    handlers.forEach((callback: Callback) => {
      callback();
    });
  },
  async fetch(): Promise<void> {
    const response: AxiosResponse = await axios.get(
      `${baseURL}/users/${this.get('id')}`
    );
    this.set(response.data);

    return response.data;
  },
});
