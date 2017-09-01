import * as util from './util';

describe('util functions', () => {
  describe('camelize', () => {
    it('should return empty string when empty string is inputed', () => {
      expect(util.camelize('')).toBe('');
    });

    it('should return empty string when only spaces is inputed', () => {
      expect(util.camelize('   ')).toBe('');
    });

    it('should return the same result when single word is inputed', () => {
      expect(util.camelize('foo')).toBe('foo');
    });

    it('should uppercase leading letter of other words and remove spaces', () => {
      expect(util.camelize('  foo bar  baz  ')).toBe('fooBarBaz');
    });

    it('should raise error when input is not a string', () => {
      const camelizeWithNull = util.camelize.bind(null);
      expect(camelizeWithNull).toThrowError('Argument must be a string');
    });
  });

  describe('pascalize', () => {
    it('should return empty string when inputed empty string', () => {
      expect(util.pascalize('')).toBe('');
    });

    it('should return empty string when only spaces is inputed', () => {
      expect(util.pascalize('   ')).toBe('');
    });

    it('should return capitalize result when single word is inputed', () => {
      expect(util.pascalize('foo')).toBe('Foo');
    });

    it('should uppercase leading letter of all input words and remove spaces', () => {
      expect(util.pascalize('  foo bar  baz  ')).toBe('FooBarBaz');
    });

    it('should raise error when input is not a string', () => {
      const pascalizeWithNull = util.pascalize.bind(null);
      expect(pascalizeWithNull).toThrowError('Argument must be a string');
    });
  });

  describe('array2object', () => {
    it('should return an empty object when inputed an empty array', () => {
      expect(util.array2object([], 'id')).toEqual({});
    });

    it('should normilize array to object by key value', () => {
      const inputArray = [{ 'id': 'foo', 'bar': 'baz' }],
        expectedObject = { 'foo': { 'id': 'foo', 'bar': 'baz' } };
      expect(util.array2object(inputArray, 'id')).toEqual(expectedObject);
    });
  });
});
