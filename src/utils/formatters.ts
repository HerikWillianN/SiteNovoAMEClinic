import { format } from 'date-fns';

export const formatDate = (date: Date | string, formatString = 'dd/MM/yyyy') => {
  return format(new Date(date), formatString);
};

export const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};
