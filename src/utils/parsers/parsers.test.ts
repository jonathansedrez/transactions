import { parseDate } from './parsers';

describe('[UTILS] Parse amount', () => {
  it('Should receive a YYYY-DD-MM date and return DD.MM.YYYY', () => {
    expect(parseDate('2020-01-01')).toEqual('01.01.2020');
    expect(parseDate('2020-12-01')).toEqual('01.12.2020');
    expect(parseDate('2020-12-10')).toEqual('10.12.2020');
  });
});
