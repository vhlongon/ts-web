import { User } from './models/User';
import 'regenerator-runtime/runtime';

const collection = User().buildCollection();
collection.fetch();

collection.on('change', () => {
  console.log(collection);
});
