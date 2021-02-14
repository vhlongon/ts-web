import { ModelInterface } from './../models/Model';

// here is an example of using a generic to a generic as argument
// T is the first generic corresponding to a UserInterface
// whereas K is the UserData, so basically we are saying to ts
// the `model` arg is an instance of User
// it is a bit unclear since K (the second generic) is used before it is defined
export const View = <T extends ModelInterface<K>, K>(
  parent: Element | null | undefined,
  model: T,
  template: () => string,
  regions: { [key: string]: Element } = {},
  eventsMap?: () => { [key: string]: () => void },
  regionsMap?: () => { [key: string]: string },
  onRender?: (regions: { [key: string]: Element }) => void
) => {
  const events = eventsMap ? eventsMap() : {};
  const regionsToMap = regionsMap ? regionsMap() : {};

  const bindEvents = (fragment: DocumentFragment): void => {
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

  const mapRegions = (fragment: DocumentFragment): void => {
    Object.keys(regionsToMap).forEach((key) => {
      const selector = regionsToMap[key];
      const element = selector && fragment.querySelector(selector);
      if (element) {
        regions[key] = element;
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
    mapRegions(content);
    onRender && onRender(regions);
    parent.append(content);
  };

  const bindModel = (): void => {
    model.on('change', render);
  };

  bindModel();

  return { render, regions };
};
