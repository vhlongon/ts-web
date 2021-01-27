import { Eventing } from './Eventing';

describe('Eventing', () => {
  test('it register and triggers events', () => {
    const events = Eventing();
    const onChange = jest.fn();
    const onClick = jest.fn();

    events.on('change', onChange);
    events.on('change', onChange);
    events.on('click', onClick);

    events.trigger('change');
    expect(onChange).toHaveBeenCalledTimes(2);
    events.trigger('click');
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
