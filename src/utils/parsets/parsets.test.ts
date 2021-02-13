import { parseAmount } from './parsers';

it.skip('should return a formated amount string in pt-br', () => {
  expect(parseAmount(2078.66)).toEqual('R$ 2.078,66');
});
