import axios from 'axios';
import { Collection } from './../Collection';
jest.mock('axios');

describe('Collection', () => {
  interface RecordData {
    a?: string;
    b?: number;
  }
  interface RecordInterface {}

  const Record = (data: RecordData = {}): RecordData => data;

  test('creates a collection of instances of provided interface', async () => {
    const data = [
      { a: 'one', b: 2 },
      { a: 'three', b: 4 },
    ];

    axios.get = jest
      .fn()
      .mockImplementationOnce(() => Promise.resolve({ data }));
    const baseUrl = 'baseUrl';
    const deserialize = (json: RecordData) => Record(json);
    const collection = Collection<RecordInterface, RecordData>(
      baseUrl,
      deserialize
    );
    const onChange = jest.fn();
    collection.on('change', onChange);

    await collection.fetch();

    const record1 = Record(data[0]);
    const record2 = Record(data[1]);

    expect(axios.get).toHaveBeenCalledWith('baseUrl');
    expect(JSON.stringify(collection.models)).toEqual(
      JSON.stringify([record1, record2])
    );
  });
});
