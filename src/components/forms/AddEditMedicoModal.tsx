import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Modal from '../../components/ui/Modal';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import Calendar from '../ui/Calendar';
import type { Medico } from '../../types';
import { useEffect } from 'react';

// Validação atualizada: diasAtendimento e diasDisponiveisMes são opcionais
const medicoSchema = z.object({
  id: z.string().optional(),
  nome: z.string().min(3, 'Nome é obrigatório'),
  crm: z.string().regex(/^\d{6}$/, 'CRM inválido (deve ter 6 dígitos)'),
  especialidade: z.string().min(1, 'Especialidade é obrigatória'),
  telefone: z.string().min(10, 'Telefone inválido'),
  email: z.string().email('Email inválido'),
  biografia: z.string().optional(),
  diasAtendimento: z.array(z.string()).optional(), // Campo agora é opcional
  diasDisponiveisMes: z.array(z.string()).optional(),
  horarioInicio: z.string().optional(),
  horarioFim: z.string().optional(),
  ativo: z.boolean(),
});

type MedicoFormData = z.infer<typeof medicoSchema>;

interface AddEditMedicoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: Medico) => void;
  medico?: Medico;
}

const AddEditMedicoModal: React.FC<AddEditMedicoModalProps> = ({ isOpen, onClose, onSave, medico }) => {
  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<MedicoFormData>({
    resolver: zodResolver(medicoSchema),
  });

  useEffect(() => {
    const defaultValues = {
      nome: '',
      crm: '',
      especialidade: '',
      telefone: '',
      email: '',
      biografia: '',
      diasAtendimento: [],
      diasDisponiveisMes: [],
      horarioInicio: '',
      horarioFim: '',
      ativo: true,
    };
    reset(medico ? { ...defaultValues, ...medico } : defaultValues);
  }, [medico, reset]);

  const onSubmit = (data: MedicoFormData) => {
    onSave(data as Medico);
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-6">{medico ? 'Editar Médico' : 'Adicionar Médico'}</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Nome Completo" {...register('nome')} error={errors.nome?.message} />
        <Input label="CRM" {...register('crm')} error={errors.crm?.message} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Especialidade</label>
          <select {...register('especialidade')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary">
            <option value="">Selecione</option>
            <option value="Cardiologia">Cardiologia</option>
            <option value="Dermatologia">Dermatologia</option>
            <option value="Ortopedia">Ortopedia</option>
            <option value="Ginecologia">Ginecologia</option>
            <option value="Neurologia">Neurologia</option>
            <option value="Pediatria">Pediatria</option>
          </select>
          {errors.especialidade && <p className="text-sm text-red-500 mt-1">{errors.especialidade.message}</p>}
        </div>
        <Input label="Telefone" {...register('telefone')} error={errors.telefone?.message} />
        <Input label="Email" {...register('email')} error={errors.email?.message} />
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Biografia</label>
          <textarea {...register('biografia')} className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary" rows={3}></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Datas de Atendimento Específicas</label>
          <p className="text-sm text-gray-500 mb-2">Selecione no calendário os dias em que o médico atenderá. Este campo não é obrigatório.</p>
          <Controller
            name="diasDisponiveisMes"
            control={control}
            render={({ field }) => (
              <Calendar 
                selectedDates={field.value || []} 
                onDateChange={field.onChange} 
              />
            )}
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Input label="Horário Início" type="time" {...register('horarioInicio')} error={errors.horarioInicio?.message} />
          <Input label="Horário Término" type="time" {...register('horarioFim')} error={errors.horarioFim?.message} />
        </div>

        <div className="flex items-center">
          <Controller
            name="ativo"
            control={control}
            render={({ field }) => (
              <input type="checkbox" checked={field.value} onChange={field.onChange} className="rounded text-primary focus:ring-primary" />
            )}
          />
          <label className="ml-2 block text-sm text-gray-900">Ativo</label>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button type="button" variant="outline" onClick={onClose}>Cancelar</Button>
          <Button type="submit">Salvar Alterações</Button>
        </div>
      </form>
    </Modal>
  );
};

export default AddEditMedicoModal;
