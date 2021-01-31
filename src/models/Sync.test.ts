import axios from 'axios';
import { ApiSync } from './ApiSync';

jest.mock('axios');

interface Record {
  age?: number;
  name?: string;
  id?: number;
}

describe('User modal', () => {
  describe('fetch', () => {
    test('when successful request it returns fetched data', async () => {
      const baseUrl = 'baseUrl';
      const sync = ApiSync<Record>(baseUrl);
      const data = { name: 'name', age: 20, id: 1 };
      const id = 1;
      axios.get = jest.fn().mockImplementationOnce(() => Promise.resolve(data));

      await expect(sync.fetch(id)).resolves.toEqual(data);
      expect(axios.get).toHaveBeenCalledWith('baseUrl/1');
    });

    test('when not successful request it returns error', async () => {
      const baseUrl = 'baseUrl';
      const sync = ApiSync<Record>(baseUrl);
      const errorMessage = 'oops';
      const id = 1;

      axios.get = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

      await expect(sync.fetch(id)).rejects.toThrow(errorMessage);
      expect(axios.get).toHaveBeenCalledWith('baseUrl/1');
    });
  });

  describe('save', () => {
    describe('when there is matching id record', () => {
      test('...and successful request it can update record', async () => {
        const baseUrl = 'baseUrl';
        const user = ApiSync<Record>(baseUrl);
        const data = { name: 'name', age: 20, id: 1 };
        axios.put = jest
          .fn()
          .mockImplementationOnce(() => Promise.resolve(data));

        await expect(user.save(data)).resolves.toEqual(data);
        expect(axios.put).toHaveBeenCalledWith('baseUrl/1', data);
      });

      test('...and not successful request it returns error', async () => {
        const baseUrl = 'baseUrl';
        const sync = ApiSync<Record>(baseUrl);
        const data = { name: 'name', age: 20, id: 1 };
        const errorMessage = 'oops';

        axios.put = jest
          .fn()
          .mockImplementationOnce(() =>
            Promise.reject(new Error(errorMessage))
          );

        await expect(sync.save(data)).rejects.toThrow(errorMessage);
        expect(axios.put).toHaveBeenCalledWith('baseUrl/1', data);
      });
    });
  });

  describe('when there is not matching id record', () => {
    test('...and successful request it can create and save a new record', async () => {
      const baseUrl = 'baseUrl';
      const sync = ApiSync<Record>(baseUrl);
      const data = { name: 'name', age: 20 };
      axios.post = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve(data));

      await expect(sync.save(data)).resolves.toEqual(data);
      expect(axios.post).toHaveBeenCalledWith('baseUrl', data);
    });

    test('...and not successful request it returns error', async () => {
      const baseUrl = 'baseUrl';
      const sync = ApiSync<Record>(baseUrl);
      const data = { name: 'name', age: 20 };
      const errorMessage = 'oops';

      axios.post = jest
        .fn()
        .mockImplementationOnce(() => Promise.reject(new Error(errorMessage)));

      await expect(sync.save(data)).rejects.toThrow(errorMessage);
      expect(axios.post).toHaveBeenCalledWith('baseUrl', data);
    });
  });
});
