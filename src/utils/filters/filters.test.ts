import { filterTransaction } from './filters';

it('should return a true if text includes a value', () => {
  const text = 'a sample string';

  expect(filterTransaction(text, 'sample')).toBeTruthy();
  expect(filterTransaction(text, 'string')).toBeTruthy();
  expect(filterTransaction(text, 'a')).toBeTruthy();

  expect(filterTransaction(text, 'text')).toBeFalsy();
  expect(filterTransaction(text, 'foo')).toBeFalsy();
  expect(filterTransaction(text, 'bar')).toBeFalsy();
});
