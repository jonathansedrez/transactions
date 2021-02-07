import { parseAmount } from './parsers';

it('should return a formated amount string in pt-br', () => {
  console.log(parseAmount(2078.66), 'R$ 2.078,66');
  expect(parseAmount(2078.66)).toEqual('R$ 2.078,66');
});
