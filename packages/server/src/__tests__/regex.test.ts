import { escapeRegExp } from '../utils/regex';

describe('escapeRegExp', () => {
  it('should escape special regex characters', () => {
    expect(escapeRegExp('Hello.World')).toBe('Hello\\.World');
    expect(escapeRegExp('test?')).toBe('test\\?');
    expect(escapeRegExp('a*b+c')).toBe('a\\*b\\+c');
    expect(escapeRegExp('foo(bar)baz')).toBe('foo\\(bar\\)baz');
    expect(escapeRegExp('[test]')).toBe('\\[test\\]');
    expect(escapeRegExp('{test}')).toBe('\\{test\\}');
    expect(escapeRegExp('a|b')).toBe('a\\|b');
    expect(escapeRegExp('a^b$c')).toBe('a\\^b\\$c');
    expect(escapeRegExp('a\\b')).toBe('a\\\\b');
  });

  it('should not change strings without special characters', () => {
    expect(escapeRegExp('HelloWorld')).toBe('HelloWorld');
    expect(escapeRegExp('12345')).toBe('12345');
    expect(escapeRegExp('   ')).toBe('   ');
  });
});
