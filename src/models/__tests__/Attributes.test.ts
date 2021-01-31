import { Attributes } from '../Attributes';

describe('Attributes', () => {
  test('it create a model', () => {
    const attrs = Attributes({ name: 'name', age: 20 });

    expect(attrs.get('name')).toBe('name');
    expect(attrs.get('age')).toBe(20);
  });

  test('it updates a model', () => {
    const attrs = Attributes({ name: 'name', age: 20 });

    attrs.set({ name: 'newName', age: 40 });
    expect(attrs.get('name')).toBe('newName');
    expect(attrs.get('age')).toBe(40);
  });
});
