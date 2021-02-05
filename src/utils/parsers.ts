export const parseAmount = (value: number): string => {
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const parseDate = (value: string): string => {
  const date = new Date(value);
  console.log(date);
  return '12/03/2021';
};
