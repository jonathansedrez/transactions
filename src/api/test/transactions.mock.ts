import { AgregatedTransaction, Transaction } from '../transactions.types';

export const mock: Transaction[] = [
  {
    id: '5f89f9f257fe42957bf6dbfd',
    title: 'Resgate',
    description: 'et labore proident aute nulla',
    status: 'processing',
    amount: 2078.66,
    date: '2020-07-01',
    from: 'Aposentadoria',
    to: 'Conta Warren',
  },
  {
    id: '5f89f9f271e4213092bd4e41',
    title: 'Depósito',
    description: 'excepteur veniam proident irure pariatur',
    status: 'created',
    amount: 148856.29,
    date: '2020-07-01',
    from: 'Trade',
    to: 'Conta Warren',
  },
  {
    id: '5f89f9f2f318e70ff298f528',
    title: 'Movimentação interna',
    description: 'eu officia laborum labore aute',
    status: 'processed',
    amount: 25092.8,
    date: '2020-05-25',
    from: 'Férias',
    to: 'Trade',
  },
];

export const resolvedValue: AgregatedTransaction[] = [
  {
    date: '2020-07-01',
    transactions: [
      {
        id: '5f89f9f257fe42957bf6dbfd',
        title: 'Resgate',
        description: 'et labore proident aute nulla',
        status: 'created',
        amount: 2078.66,
        date: '2020-07-01',
        from: 'Aposentadoria',
        to: 'Conta Warren',
      },
      {
        id: '5f89f9f271e4213092bd4e41',
        title: 'Depósito',
        description: 'excepteur veniam proident irure pariatur',
        status: 'created',
        amount: 148856.29,
        date: '2020-07-01',
        from: 'Trade',
        to: 'Conta Warren',
      },
    ],
  },
  {
    date: '2020-05-25',
    transactions: [
      {
        id: '5f89f9f2f318e70ff298f528',
        title: 'Movimentação interna',
        description: 'eu officia laborum labore aute',
        status: 'processed',
        amount: 25092.8,
        date: '2020-05-25',
        from: 'Férias',
        to: 'Trade',
      },
    ],
  },
];

export const resolvedValueWithTitleFilter: AgregatedTransaction[] = [
  {
    date: '2020-07-01',
    transactions: [
      {
        id: '5f89f9f257fe42957bf6dbfd',
        title: 'Resgate',
        description: 'et labore proident aute nulla',
        status: 'created',
        amount: 2078.66,
        date: '2020-07-01',
        from: 'Aposentadoria',
        to: 'Conta Warren',
      },
    ],
  },
];

export const resolvedValueWithStatusFilter: AgregatedTransaction[] = [
  {
    date: '2020-07-01',
    transactions: [
      {
        id: '5f89f9f257fe42957bf6dbfd',
        title: 'Resgate',
        description: 'et labore proident aute nulla',
        status: 'created',
        amount: 2078.66,
        date: '2020-07-01',
        from: 'Aposentadoria',
        to: 'Conta Warren',
      },
      {
        id: '5f89f9f271e4213092bd4e41',
        title: 'Depósito',
        description: 'excepteur veniam proident irure pariatur',
        status: 'created',
        amount: 148856.29,
        date: '2020-07-01',
        from: 'Trade',
        to: 'Conta Warren',
      },
    ],
  },
];
