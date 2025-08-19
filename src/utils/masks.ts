export const cpfMask = '999.999.999-99';
export const phoneMask = '(99) 99999-9999';
export const cepMask = '99999-999';

export const formatCPF = (cpf: string) => {
  if (!cpf) return '';
  const cleaned = cpf.replace(/\D/g, '');
  if (cleaned.length !== 11) return cpf; // Retorna o original se não for um CPF válido
  return cleaned.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
};

export const formatPhone = (phone: string) => {
  if (!phone) return '';
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length !== 11) return phone; // Retorna o original se não for um telefone válido
  return cleaned.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
};