import { User } from './User';
import axios from 'axios';

jest.mock('axios');

describe('User modal', () => {
  test('it register and triggers events', () => {
    const user = User({ name: 'name', age: 20 });
    const onChange = jest.fn();
    const onClick = jest.fn();

    user.on('change', onChange);
    user.on('change', onChange);
    user.on('click', onClick);

    user.trigger('change');
    expect(onChange).toHaveBeenCalledTimes(2);
    user.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  test('when successful request it returns fetched data', async () => {
    const data = { name: 'name', age: 20, id: 1 };
    const user = User(data);
    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data }));

    await expect(user.fetch()).resolves.toEqual(data);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users/1');
  });

  test('when not successful request it returns error', async () => {
    const data = { name: 'name', age: 20, id: 1 };
    const user = User(data);
    const errorMessage = 'oops';

    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(user.fetch()).rejects.toThrow(errorMessage);
    expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users/1');
  });

  test('when there is already a user and successful request it can update user data', async () => {
    const data = { name: 'name', age: 20, id: 1 };
    const user = User(data);
    axios.put = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data }));

    await expect(user.save()).resolves.toEqual(data);
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:3000/users/1',
      data
    );
  });

  test('when there is not a user and successful request it can create and save a new user', async () => {
    const data = { name: 'name', age: 20 };
    const user = User(data);
    axios.post = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data }));

    await expect(user.save()).resolves.toEqual(data);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/users',
      data
    );
  });

  test('when not successful request and trying to update a existing user it returns error', async () => {
    const data = { name: 'name', age: 20, id: 1 };
    const user = User(data);
    const errorMessage = 'oops';

    axios.put = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(user.save()).rejects.toThrow(errorMessage);
    expect(axios.put).toHaveBeenCalledWith(
      'http://localhost:3000/users/1',
      data
    );
  });

  test('when not successful request and trying to create a new user it returns error', async () => {
    const data = { name: 'name', age: 20 };
    const user = User(data);
    const errorMessage = 'oops';

    axios.post = jest
      .fn()
      .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

    await expect(user.save()).rejects.toThrow(errorMessage);
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:3000/users',
      data
    );
  });
});
