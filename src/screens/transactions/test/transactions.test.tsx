import { render, fireEvent, act, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

import { BASE_URL } from '../../../api/transactions';
import { Transactions } from '../transactions';
import {
  mockWithAgregatedDates,
  mockWithoutAgregatedDates,
} from './transactions.mock';

const server = setupServer(
  rest.get(`${BASE_URL}/transactions`, (req, res, ctx) => {
    return res(ctx.json(mockWithoutAgregatedDates));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('[SCREEN] Transaction', () => {
  it('should list the dates separately', async () => {
    const { getByRole, findAllByRole } = render(<Transactions />);
    expect(getByRole('progressbar')).toBeInTheDocument();

    expect(await findAllByRole('listitem')).toHaveLength(2);
  });

  it('should call service when type in filter input', async () => {
    const { findByText, findAllByRole, getByTestId } = render(<Transactions />);

    expect(await findAllByRole('listitem')).toHaveLength(2);

    const input = getByTestId('filter-input');
    await act(async () => {
      fireEvent.change(input, { target: { value: 'res' } });
    });

    await waitFor(async () => {
      expect(await findAllByRole('listitem')).toHaveLength(1);
      expect(await findByText('Resgate')).toBeInTheDocument();
    });
  });

  it('should list the dates by equal days', async () => {
    const { getByRole, findAllByRole } = render(<Transactions />);
    expect(getByRole('progressbar')).toBeInTheDocument();

    server.use(
      rest.get(`${BASE_URL}/transactions`, (req, res, ctx) => {
        return res(ctx.json(mockWithAgregatedDates));
      })
    );

    expect(await findAllByRole('listitem')).toHaveLength(1);
  });

  it('should render a modal when service got an error', async () => {
    const { findByText } = render(<Transactions />);

    server.use(
      rest.get(`${BASE_URL}/transactions`, (req, res, ctx) => {
        return res(ctx.status(500));
      })
    );

    expect(
      await findByText(
        'Erro ao efetuar requisição. Tente novamente mais tarde.'
      )
    ).toBeInTheDocument();
  });
});
