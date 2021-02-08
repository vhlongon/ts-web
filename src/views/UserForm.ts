import { View } from './View';
import { UserInterface, UserData } from './../models/User';

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

  return View<UserInterface, UserData>(parent, model, template, eventsMap);
};
