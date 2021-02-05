import { Status } from '../api/transactions.types';

export const filterTransaction = (
  text: string,
  filter?: string | Status
): boolean => {
  return filter ? text.includes(filter) : true;
};
