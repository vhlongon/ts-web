import { UserInterface } from './../models/User';

export const UserForm = (parent: HTMLElement | null, model: UserInterface) => {
  const template = (): string => `
  <div>
    <h1>User form</h1>
    <div>USer name: ${model.data.name}</div>
    <div>USer age: ${model.data.age}</div>
    <input />
    <button class="set-name">Change name</button>
    <button class="set-age">Set random age</button>
  </div>`;

  const render = (): void => {
    if (!parent) {
      throw new Error(' provide a valid html element');
    }
    parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = template();
    bindEvents(templateElement.content);
    parent.append(templateElement.content);
  };

  const onSetAgeClick = (): void => {
    model.setRandomAge();
  };

  const onSetNameClick = (): void => {
    const input = parent?.querySelector('input');

    model.set({ name: input?.value });
  };

  const eventsMap = (): { [key: string]: () => void } => ({
    'click:.set-age': onSetAgeClick,
    'click:.set-name': onSetNameClick,
  });

  const bindEvents = (fragment: DocumentFragment): void => {
    const events = eventsMap();

    Object.entries(events).forEach(([eventKey, eventHandler]) => {
      const [eventName, selector] = eventKey.split(':');
      if (selector) {
        fragment.querySelectorAll(selector).forEach((element) => {
          if (eventName) {
            element.addEventListener(eventName, eventHandler);
          }
        });
      }
    });
  };

  model.on('change', render);

  return {
    render,
  };
};
