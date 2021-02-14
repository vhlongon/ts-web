import { User } from './models/User';
import { UserEdit } from './views/UserEdit';
import 'regenerator-runtime/runtime';

const root = document.getElementById('root');
const user = User({ name: 'NAME', age: 20 });
const userEdit = UserEdit(root, user);

userEdit.render();
