type Callback = () => void;
// an object with key as event name and the value will be a callback
type Events = { [key: string]: Callback[] };

export const Eventing = () => {
  const state = { events: <Events>{} };

  return {
    on: (eventName: string, callback: Callback): void => {
      const handlers = state.events[eventName] || []; // Callback[] or undefined

      state.events[eventName] = [...handlers, callback];
    },
    trigger: (eventName: string): void => {
      const handlers = state.events[eventName] || [];

      if (!handlers.length) {
        return;
      }

      handlers.forEach((callback: Callback) => {
        callback();
      });
    },
  };
};
