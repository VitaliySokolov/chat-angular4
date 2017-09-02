import { Async2arrayPipe } from './async2array.pipe';

describe('Async2arrayPipe', () => {
  it('create an instance', () => {
    const pipe = new Async2arrayPipe();
    expect(pipe).toBeTruthy();
  });

  it('should convert an empty object to null ', () => {
    const pipe = new Async2arrayPipe();
    expect(pipe.transform({})).toBeNull();
  });

  it('should convert to null when object w/o `items` property', () => {
    const pipe = new Async2arrayPipe();
    expect(pipe.transform({ foo: 'bar' })).toBeNull();
  });

  it('should convert to null when `items` property is null', () => {
    const pipe = new Async2arrayPipe();
    expect(pipe.transform({ items: null })).toBeNull();
  });

  it('should convert to null if inputed `items` is not object', () => {
    const pipe = new Async2arrayPipe();
    expect(pipe.transform({ items: 'bar' })).toBeNull();
  });

  it('should convert the values of `items` to array', () => {
    const pipe = new Async2arrayPipe();
    expect(pipe.transform({
      items: {
        id1: 'foo',
        id2: 'bar'
      }
    })).toEqual(['foo', 'bar']);
  });
});
