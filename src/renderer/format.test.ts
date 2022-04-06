import { toTitleCase } from './format';

describe('to title case', () => {
  it('should return Long Break when all lowercase', () => {
    expect(toTitleCase('long break')).toEqual('Long Break');
  });
  it('should return Long Break when all uppercase', () => {
    expect(toTitleCase('LONG BREAK')).toEqual('Long Break');
  });
  it('should return Long Break when mixed case words', () => {
    expect(toTitleCase('lOnG BreAK')).toEqual('Long Break');
  });
});
