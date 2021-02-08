import { ModelInterface } from './../models/Model';

// here is an example of using a generic to a generic as argument
// T is the first generic corresponding to a UserInterface
// whereas K is the UserData, so basically we are saying to ts
// the `model` arg is an instance of User
// it is a bit unclear since K (the second generic) is used before it is defined
export const View = <T extends ModelInterface<K>, K>(
  parent: HTMLElement | null,
  model: T,
  template: () => string,
  eventsMap: () => { [key: string]: () => void }
) => {
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

  const render = (): void => {
    if (!parent) {
      throw new Error(' provide a valid html element');
    }
    parent.innerHTML = '';
    const templateElement = document.createElement('template');
    templateElement.innerHTML = template();
    const { content } = templateElement;
    bindEvents(content);
    parent.append(content);
  };

  const bindModel = (): void => {
    model.on('change', render);
  };

  bindModel();

  return { render };
};
