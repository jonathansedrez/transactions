import { groupDates } from '../transactions';
import {
  mock,
  resolvedValue,
  resolvedValueWithTitleFilter,
  resolvedValueWithStatusFilter,
} from './transactions.mock';

describe('[API] transactions', () => {
  it('should group transactions by day', () => {
    expect(groupDates(mock)).toStrictEqual(resolvedValue);
  });

  it('should group transactions by day and add title filter', () => {
    expect(groupDates(mock, { title: 'res' })).toStrictEqual(
      resolvedValueWithTitleFilter
    );
  });

  it('should group transactions by day and add status filter', () => {
    expect(groupDates(mock, { status: 'created' })).toStrictEqual(
      resolvedValueWithStatusFilter
    );
  });
});
