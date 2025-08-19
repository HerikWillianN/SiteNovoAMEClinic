import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';

const RegisterStep4 = () => {
  const { register, formState: { errors } } = useFormContext();

  return (
    <div className="space-y-4">
      <Input label="Senha" type="password" {...register('password')} error={errors.password?.message as string} />
      <Input label="Confirmar Senha" type="password" {...register('confirmPassword')} error={errors.confirmPassword?.message as string} />
      <div className="space-y-2">
        <label className="flex items-center">
          <input type="checkbox" {...register('termsAccepted')} />
          <span className="ml-2">Aceito os termos de uso</span>
        </label>
        <label className="flex items-center">
          <input type="checkbox" {...register('privacyAccepted')} />
          <span className="ml-2">Aceito a política de privacidade</span>
        </label>
      </div>
    </div>
  );
};

export default RegisterStep4;
