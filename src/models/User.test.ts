import { User } from './User';
import axios from 'axios';

jest.mock('axios');

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

  test('it register and triggers events', () => {
    const user = User({ name: 'name', age: 20 });
    const onChange = jest.fn();
    const onClick = jest.fn();

    user.on('change', onChange);
    user.on('change', onChange);
    user.on('click', onClick);

    expect(user.events).toEqual({
      change: [onChange, onChange],
      click: [onClick],
    });

    user.trigger('change');
    expect(onChange).toHaveBeenCalledTimes(2);
    user.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('when successful requrest it returns fetched data', async () => {
    const data = { name: 'name', age: 20, id: 1 };
    const user = User(data);
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data }));

    await expect(user.fetch()).resolves.toEqual(data);
  });

  test('when not successful requrest it returns error', async () => {
    const data = { name: 'name', age: 20, id: 1 };
    const user = User(data);
    const errorMessage = 'oops';

    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(user.fetch()).rejects.toThrow(errorMessage);
  });
});
