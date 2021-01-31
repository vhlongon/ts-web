type Callback = (params: unknown) => void;
// an object with key as event name and the value will be a callback
export type EventsType = { [key: string]: Callback[] };

export interface EventsInterface {
  on(eventName: string, callback: (params: unknown) => void): void;
  trigger(eventName: string, params?: unknown): void;
}

export const Eventing = (): EventsInterface => {
  const state = { events: <EventsType>{} };

  return {
    on: (eventName: string, callback: Callback): void => {
      const handlers = state.events[eventName] || []; // Callback[] or undefined

      state.events[eventName] = [...handlers, callback];
    },
    trigger: (eventName: string, params?: unknown): void => {
      const handlers = state.events[eventName] || [];

      if (!handlers.length) {
        return;
      }

      handlers.forEach((callback: Callback) => {
        callback(params);
      });
    },
  };
};
