import { ApiSync } from '../ApiSync';
import { Eventing } from '../Eventing';
import { Attributes } from '../Attributes';
import { Model } from '../Model';
import axios from 'axios';

jest.mock('axios');

describe('Model', () => {
  const baseUrl = 'baseUrl';
  type ModelData = { a: String; b: number; id?: number };
  const createModel = (data: ModelData) => {
    const attributes = Attributes<ModelData>(data);
    const events = Eventing();
    const sync = ApiSync<ModelData>(baseUrl);
    const model = Model<ModelData>(attributes, events, sync);
    return model;
  };
  describe('fetch', () => {
    test('when successful request it call on change with fetched data', async () => {
      const data = { a: 'name', b: 20, id: 1 };
      const model = createModel(data);
      axios.get = jest
        .fn()
        .mockImplementationOnce(() => Promise.resolve({ data }));
      const onChange = jest.fn();
      model.on('change', onChange);

      await model.fetch();
      expect(onChange).toHaveBeenCalledWith(data);
      expect(axios.get).toHaveBeenCalledWith('baseUrl/1');
    });

    test('when not successful request it calls on error with error', async () => {
      const data = { a: 'name', b: 20, id: 1 };
      const model = createModel(data);
      const error = new Error('oops');
      const onError = jest.fn();

      model.on('error', onError);

      axios.get = jest.fn().mockImplementationOnce(() => Promise.reject(error));

      await model.fetch();
      expect(onError).toHaveBeenCalledWith(error);
      expect(axios.get).toHaveBeenCalledWith('baseUrl/1');
    });
  });

  describe('save', () => {
    describe('when there is an existing object', () => {
      test('...and successful request it updates object data and calls on save with new data', async () => {
        const data = { a: 'name', b: 20, id: 1 };
        const model = createModel(data);
        axios.put = jest
          .fn()
          .mockImplementationOnce(() => Promise.resolve({ data }));
        const onSave = jest.fn();
        model.on('save', onSave);

        await model.save();
        expect(onSave).toHaveBeenCalledWith(data);
        expect(axios.put).toHaveBeenCalledWith('baseUrl/1', data);
      });

      test('...and not successful request it calls on error with error', async () => {
        const data = { a: 'name', b: 20, id: 1 };
        const model = createModel(data);
        const error = new Error('oops');
        const onError = jest.fn();

        model.on('error', onError);

        axios.put = jest
          .fn()
          .mockImplementationOnce(() => Promise.reject(error));

        await model.save();
        expect(onError).toHaveBeenCalledWith(error);
        expect(axios.put).toHaveBeenCalledWith('baseUrl/1', data);
      });
    });

    describe('when there is not an existing object', () => {
      test('...and successful request it creates and saves a new object, call on save with new data', async () => {
        const data = { a: 'name', b: 20 };
        const model = createModel(data);
        axios.post = jest
          .fn()
          .mockImplementationOnce(() => Promise.resolve({ data }));

        const onSave = jest.fn();
        model.on('save', onSave);

        await model.save();
        expect(onSave).toHaveBeenCalledWith(data);
        expect(axios.post).toHaveBeenCalledWith('baseUrl', data);
      });

      test('...and not successful request it calls on error with error', async () => {
        const data = { a: 'name', b: 20 };
        const model = createModel(data);
        const error = new Error('oops');
        const onError = jest.fn();

        model.on('error', onError);

        axios.post = jest
          .fn()
          .mockImplementationOnce(() => Promise.reject(error));

        await model.save();
        expect(onError).toHaveBeenCalledWith(error);
        expect(axios.post).toHaveBeenCalledWith('baseUrl', data);
      });
    });
  });
});
