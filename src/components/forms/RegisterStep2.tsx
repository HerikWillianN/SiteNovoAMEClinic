import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';

const RegisterStep2 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <Input label="CEP" {...register('cep')} error={errors.cep?.message as string} />
      <Input label="Rua" {...register('street')} error={errors.street?.message as string} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input label="Número" {...register('number')} error={errors.number?.message as string} />
        <Input label="Complemento" {...register('complement')} />
      </div>
      <Input label="Cidade" {...register('city')} error={errors.city?.message as string} />
      <Input label="Estado" {...register('state')} error={errors.state?.message as string} />
    </div>
  );
};

export default RegisterStep2;