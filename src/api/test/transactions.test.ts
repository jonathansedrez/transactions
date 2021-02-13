import { groupDates } from '../transactions';
import { mock, resolvedValue } from './transactions.mock';

it('should group transactions by day', () => {
  expect(groupDates(mock)).toStrictEqual(resolvedValue);
});
