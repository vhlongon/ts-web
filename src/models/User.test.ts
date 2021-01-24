import { User } from './User';

describe('User modal', () => {
  test('it creates user with name and age', () => {
    const user = User({ name: 'name', age: 20 });

    expect(user.get('name')).toBe('name');
    expect(user.get('age')).toBe(20);
  });

  test('it updates a existing user', () => {
    const user = User({ name: 'name', age: 20 });

    user.set({ name: 'newName', age: 40 });

    expect(user.get('name')).toBe('newName');
    expect(user.get('age')).toBe(40);
  });
});
