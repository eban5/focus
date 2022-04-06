import { toTitleCase } from './format';

describe('to title case', () => {
  it('should return Long Break', () => {
    expect(toTitleCase('long break')).toEqual('Long Break');
  });
  it('should return Long Break', () => {
    expect(toTitleCase('LONG BREAK')).toEqual('Long Break');
  });
  it('should return Long Break', () => {
    expect(toTitleCase('lOnG BreAK')).toEqual('Long Break');
  });
});
