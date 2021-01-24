interface UserProps {
  name?: string;
  age?: number;
}
type Callback = () => void;
type UserProp = number | string;
// an object with key as event name and the value will be a callback
type Events = { [key: string]: Callback[] };

export const User = (data: UserProps) => ({
  events: <Events>{},
  get(propName: string): UserProp {
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
});
