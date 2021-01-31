import { Collection, CollectionInterface } from './Collection';
import { Model, ModelInterface } from './Model';
import { Attributes } from './Attributes';
import { Eventing } from './Eventing';
import { ApiSync } from './ApiSync';

export interface UserData {
  id?: number;
  name?: string;
  age?: number;
}

export interface UserInterface extends ModelInterface<UserData> {
  buildCollection(): CollectionInterface<UserInterface>;
}

const baseURL = 'http://localhost:3000/users';

const deserialize = (json: UserData): UserInterface => User(json);

export const User = (initialData: UserData = {}): UserInterface => {
  const attributes = Attributes<UserData>(initialData);
  const events = Eventing();
  const sync = ApiSync<UserData>(baseURL);
  const model = Model<UserData>(attributes, events, sync);
  const buildCollection = () =>
    Collection<UserInterface, UserData>(baseURL, deserialize);

  return { ...model, buildCollection };
};
