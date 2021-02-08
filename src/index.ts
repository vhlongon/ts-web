import { User } from './models/User';
import { UserForm } from './views/UserForm';
import 'regenerator-runtime/runtime';

const root = document.getElementById('root');
const user = User({ name: 'NAME', age: 20 });
const userForm = UserForm(root, user);

userForm.render();
