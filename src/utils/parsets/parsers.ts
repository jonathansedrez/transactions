export const parseAmount = (value: number): string => {
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const parseDate = (value: string): string => {
  const date = new Date(value);
  const day = date.getDay().toFixed();
  const month = date.getMonth();
  const year = date.getFullYear();
  const parsedDate = `${day}/${month}/${year}`;

  return value;
};
