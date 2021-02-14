import { View } from './View';
import { UserInterface, UserData } from './../models/User';

export const UserForm = (
  parent: Element | null | undefined,
  model: UserInterface
) => {
  const template = (): string => `
  <div>
    <h1>User form</h1>
    
    <input placeholder="${model.data.name}" />
    <button class="set-name">Change name</button>
    <button class="set-age">Set random age</button>
    <button class="save-model">Save</button>
  </div>`;

  const onSetAgeClick = (): void => {
    model.setRandomAge();
  };

  const onSetNameClick = (): void => {
    const input = parent?.querySelector('input');
    model.set({ name: input?.value });
  };

  const onSaveClick = (): void => {
    model.save();
  };

  const eventsMap = (): { [key: string]: () => void } => ({
    'click:.set-age': onSetAgeClick,
    'click:.set-name': onSetNameClick,
    'click:.save-model': onSaveClick,
  });

  return View<UserInterface, UserData>(parent, model, template, {}, eventsMap);
};
