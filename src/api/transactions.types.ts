export type Status = 'created' | 'processed' | 'processing';

export interface Transaction {
  id: string;
  amount: number;
  date: string;
  description: string;
  from: string;
  status: Status;
  title: string;
  to: string;
}

export interface AgregatedTransaction {
  date: string;
  transactions: Transaction[];
}

export interface Filters {
  title?: string;
  status?: Status;
}
