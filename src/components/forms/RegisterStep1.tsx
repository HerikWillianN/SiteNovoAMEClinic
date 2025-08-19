import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';
import { useState, useEffect } from 'react';
import { formatCPF } from '../../utils/masks';

const RegisterStep1 = () => {
  const { register, formState: { errors }, setValue, watch } = useFormContext();
  const cpfValue = watch('cpf');
  const [displayCpf, setDisplayCpf] = useState('');

  useEffect(() => {
    if (cpfValue) {
      setDisplayCpf(formatCPF(cpfValue));
    }
  }, [cpfValue]);

  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/\D/g, ''); // Remove non-digits
    setDisplayCpf(formatCPF(rawValue)); // Update display with formatted value
    setValue('cpf', rawValue, { shouldValidate: true }); // Update form value with raw value
  };

  return (
    <div className="space-y-4">
      <Input 
        label="Nome Completo" 
        {...register('fullName')} 
        error={errors.fullName?.message as string} 
      />
      <Input 
        label="CPF" 
        value={displayCpf} // Use local state for display
        onChange={handleCpfChange} // Handle change manually
        error={errors.cpf?.message as string} 
      />
      <Input 
        label="Data de Nascimento" 
        type="date" 
        {...register('birthDate')} 
        error={errors.birthDate?.message as string} 
      />
      <Input 
        label="Telefone" 
        mask="(00) 00000-0000" 
        {...register('phone')} 
        error={errors.phone?.message as string} 
      />
      <Input 
        label="Email" 
        type="email" 
        {...register('email')} 
        error={errors.email?.message as string} 
      />
    </div>
  );
};

export default RegisterStep1;
