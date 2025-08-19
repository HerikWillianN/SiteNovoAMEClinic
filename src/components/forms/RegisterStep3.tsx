import { useFormContext } from 'react-hook-form';
import { Input } from '../ui/Input';

const RegisterStep3 = () => {
  const { register, watch } = useFormContext();
  const hasInsurance = watch('hasInsurance');

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Possui convênio?</label>
        <div className="flex items-center space-x-4">
          <label><input type="radio" {...register('hasInsurance')} value="yes" /> Sim</label>
          <label><input type="radio" {...register('hasInsurance')} value="no" /> Não</label>
        </div>
      </div>
      {hasInsurance === 'yes' && (
        <>
          <Input label="Nome do Convênio" {...register('insuranceName')} />
          <Input label="Número da Carteirinha" {...register('insuranceId')} />
        </>
      )}
      <Input label="Nome do Contato de Emergência" {...register('emergencyContactName')} />
      <Input label="Telefone do Contato de Emergência" {...register('emergencyContactPhone')} />
      <textarea className="w-full px-3 py-2 border border-gray-300 rounded-md" {...register('medicalNotes')} placeholder="Observações médicas"></textarea>
    </div>
  );
};

export default RegisterStep3;