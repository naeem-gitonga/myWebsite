import { render, screen, fireEvent } from '@testing-library/react';
import SlotMachine from '../SlotMachine';

type Item = { id: string };

const twoItems: Item[] = [{ id: 'alpha' }, { id: 'beta' }];

const renderItem = (item: Item, i: number) => (
  <div key={i} data-testid="slot-item">
    {item.id}
  </div>
);

describe('SlotMachine', () => {
  beforeEach(() => {
    jest.spyOn(window, 'requestAnimationFrame').mockImplementation((cb) => {
      cb(0);
      return 0;
    });
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('renders 3 copies of items for infinite scroll loop', () => {
    render(<SlotMachine items={twoItems} renderItem={renderItem} />);
    expect(screen.getAllByTestId('slot-item')).toHaveLength(6);
  });

  it('renders each item using the renderItem callback', () => {
    render(<SlotMachine items={[{ id: 'unique' }]} renderItem={renderItem} />);
    expect(screen.getAllByText('unique')).toHaveLength(3);
  });

  it('calls requestAnimationFrame on mount to set initial scroll position', () => {
    render(<SlotMachine items={twoItems} renderItem={renderItem} />);
    expect(window.requestAnimationFrame).toHaveBeenCalledTimes(1);
  });

  it('resets scrollTop up by one third when scrolled above lower boundary', () => {
    render(<SlotMachine items={twoItems} renderItem={renderItem} />);
    const scrollEl = screen.getByTestId('slot-scroll');
    const setter = jest.fn();

    Object.defineProperty(scrollEl, 'scrollHeight', { value: 900, configurable: true });
    let _scrollTop = 50; // below adjustedThird (100)
    Object.defineProperty(scrollEl, 'scrollTop', {
      get: () => _scrollTop,
      set: (val) => { _scrollTop = val; setter(val); },
      configurable: true,
    });

    fireEvent.scroll(scrollEl);
    expect(setter).toHaveBeenCalledWith(50 + 300); // 350
  });

  it('resets scrollTop down by one third when scrolled past upper boundary', () => {
    render(<SlotMachine items={twoItems} renderItem={renderItem} />);
    const scrollEl = screen.getByTestId('slot-scroll');
    const setter = jest.fn();

    Object.defineProperty(scrollEl, 'scrollHeight', { value: 900, configurable: true });
    let _scrollTop = 700; // above 2 * third (600)
    Object.defineProperty(scrollEl, 'scrollTop', {
      get: () => _scrollTop,
      set: (val) => { _scrollTop = val; setter(val); },
      configurable: true,
    });

    fireEvent.scroll(scrollEl);
    expect(setter).toHaveBeenCalledWith(700 - 300); // 400
  });

  it('does not reset scrollTop when within the middle third', () => {
    render(<SlotMachine items={twoItems} renderItem={renderItem} />);
    const scrollEl = screen.getByTestId('slot-scroll');
    const setter = jest.fn();

    Object.defineProperty(scrollEl, 'scrollHeight', { value: 900, configurable: true });
    let _scrollTop = 250; // within middle third (100–400)
    Object.defineProperty(scrollEl, 'scrollTop', {
      get: () => _scrollTop,
      set: (val) => { _scrollTop = val; setter(val); },
      configurable: true,
    });

    fireEvent.scroll(scrollEl);
    expect(setter).not.toHaveBeenCalled();
  });
});
