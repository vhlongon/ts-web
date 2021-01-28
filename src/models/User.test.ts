import { User } from './User';
import axios from 'axios';

jest.mock('axios');

describe('User modal', () => {
  describe('fetch', () => {
    test('when successful request it call on change with fetched data', async () => {
      const data = { name: 'name', age: 20, id: 1 };
      const user = User(data);
      axios.get = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({ data }));
      const onChange = jest.fn();
      user.on('change', onChange);

      await user.fetch();
      expect(onChange).toHaveBeenCalledWith(data);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users/1');
    });

    test('when not successful request it calls on error with error', async () => {
      const data = { name: 'name', age: 20, id: 1 };
      const user = User(data);
      const error = new Error('oops');
      const onError = jest.fn();

      user.on('error', onError);

      axios.get = jest.fn().mockImplementationOnce(() => Promise.reject(error));

      await user.fetch();
      expect(onError).toHaveBeenCalledWith(error);
      expect(axios.get).toHaveBeenCalledWith('http://localhost:3000/users/1');
    });
  });

  describe('save', () => {
    describe('when there is an existing user', () => {
      test('...and successful request it updates user data and calls on save with new data', async () => {
        const data = { name: 'name', age: 20, id: 1 };
        const user = User(data);
        axios.put = jest
          .fn()
          .mockImplementationOnce(() => Promise.resolve({ data }));
        const onSave = jest.fn();
        user.on('save', onSave);

        await user.save();
        expect(onSave).toHaveBeenCalledWith(data);
        expect(axios.put).toHaveBeenCalledWith(
          'http://localhost:3000/users/1',
          data
        );
      });

      test('...and not successful request it calls on error with error', async () => {
        const data = { name: 'name', age: 20, id: 1 };
        const user = User(data);
        const error = new Error('oops');
        const onError = jest.fn();

        user.on('error', onError);

        axios.put = jest
          .fn()
          .mockImplementationOnce(() => Promise.reject(error));

        await user.save();
        expect(onError).toHaveBeenCalledWith(error);
        expect(axios.put).toHaveBeenCalledWith(
          'http://localhost:3000/users/1',
          data
        );
      });
    });

    describe('when there is not an existing user', () => {
      test('...and successful request it creates and saves a new user, call on save with new data', async () => {
        const data = { name: 'name', age: 20 };
        const user = User(data);
        axios.post = jest
          .fn()
          .mockImplementationOnce(() => Promise.resolve({ data }));

        const onSave = jest.fn();
        user.on('save', onSave);

        await user.save();
        expect(onSave).toHaveBeenCalledWith(data);
        expect(axios.post).toHaveBeenCalledWith(
          'http://localhost:3000/users',
          data
        );
      });

      test('...and not successful request it calls on error with error', async () => {
        const data = { name: 'name', age: 20 };
        const user = User(data);
        const error = new Error('oops');
        const onError = jest.fn();

        user.on('error', onError);

        axios.post = jest
          .fn()
          .mockImplementationOnce(() => Promise.reject(error));

        await user.save();
        expect(onError).toHaveBeenCalledWith(error);
        expect(axios.post).toHaveBeenCalledWith(
          'http://localhost:3000/users',
          data
        );
      });
    });
  });
});
