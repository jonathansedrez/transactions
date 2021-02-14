export const parseAmount = (value: number): string => {
  return value.toLocaleString('pt-br', {
    style: 'currency',
    currency: 'BRL',
  });
};

export const parseDate = (input: any) => {
  var datePart = input.match(/\d+/g),
    year = `20${datePart[0].substring(2)}`,
    month = datePart[1],
    day = datePart[2];

  return `${day}.${month}.${year}`;
};
