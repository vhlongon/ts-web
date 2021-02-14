import { UserShow } from './UserShow';
import { View } from './View';
import { UserData } from './../models/User';
import { UserInterface } from './../../src/models/User';
import { UserForm } from './UserForm';

export const UserEdit = (parent: Element | null, model: UserInterface) => {
  const template = (): string => `
  <div>
    <div class="user-show"></div>
    <div class="user-form"></div>
  </div>
  `;

  const regions = {};
  const eventsMap = () => ({});
  const regionsMap = (): { [key: string]: string } => ({
    userShow: '.user-show',
    userForm: '.user-form',
  });

  const onRender = (regions: { [key: string]: Element }) => {
    UserShow(regions.userShow, model).render();
    UserForm(regions.userForm, model).render();
  };

  const view = View<UserInterface, UserData>(
    parent,
    model,
    template,
    regions,
    eventsMap,
    regionsMap,
    onRender
  );

  return view;
};
