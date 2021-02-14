import { View } from './View';
import { UserData } from './../models/User';
import { UserInterface } from './../../src/models/User';

export const UserShow = (
  parent: Element | null | undefined,
  model: UserInterface
) => {
  const template = (): string => `
  <div>
    <h1>User details</h1>
    <div>USer name: ${model.data.name}</div>
    <div>USer age: ${model.data.age}</div>
  </div>
  `;

  return View<UserInterface, UserData>(parent, model, template, {});
};
