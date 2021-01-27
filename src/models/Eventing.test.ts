import { Eventing } from './Eventing';

describe('Eventing', () => {
  test('it register and triggers events', () => {
    const user = Eventing();
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
});
