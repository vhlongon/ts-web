import { Model, ModelInterface } from './Model';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';

interface UserData {
  id?: number;
  name?: string;
  age?: number;
}

interface UserInterface extends ModelInterface<UserData> {}

const baseURL = 'http://localhost:3000/users';
export const User = (initialData: UserData): UserInterface => {
  const attributes = Attributes<UserData>(initialData);
  const events = Eventing();
  const sync = ApiSync<UserData>(baseURL);
  const model = Model<UserData>(attributes, events, sync);

  return model;
};
