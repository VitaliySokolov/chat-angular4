import { Async2arrayPipe } from './async2array.pipe';

describe('Async2arrayPipe', () => {
  it('create an instance', () => {
    const pipe = new Async2arrayPipe();
    expect(pipe).toBeTruthy();
  });
});
