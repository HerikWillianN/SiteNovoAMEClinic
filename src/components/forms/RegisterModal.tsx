import { useState } from 'react';
import { useForm, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Modal from '../ui/Modal';
import { Button } from '../ui/Button';
import { AnimatePresence, motion } from 'framer-motion';
import RegisterStep1 from './RegisterStep1';
import RegisterStep2 from './RegisterStep2';
import RegisterStep3 from './RegisterStep3';
import RegisterStep4 from './RegisterStep4';

// Schemas for each step
const step1Schema = z.object({
  fullName: z.string().min(3, 'Nome completo é obrigatório'),
  cpf: z.string().refine((cpf) => /^\d{11}$/.test(cpf), 'CPF inválido'),
  birthDate: z.string().min(1, 'Data de nascimento é obrigatória'),
  phone: z.string().min(1, 'Telefone é obrigatório'),
  email: z.string().email('Email inválido'),
});

const step2Schema = z.object({
  cep: z.string().min(8, 'CEP é obrigatório'),
  street: z.string().min(1, 'Rua é obrigatória'),
  number: z.string().min(1, 'Número é obrigatório'),
  complement: z.string().optional(),
  city: z.string().min(1, 'Cidade é obrigatória'),
  state: z.string().min(1, 'Estado é obrigatório'),
});

const step3Schema = z.object({
  hasInsurance: z.enum(['yes', 'no']),
  insuranceName: z.string().optional(),
  insuranceId: z.string().optional(),
  emergencyContactName: z.string().min(1, 'Nome do contato de emergência é obrigatório'),
  emergencyContactPhone: z.string().min(1, 'Telefone do contato de emergência é obrigatório'),
  medicalNotes: z.string().optional(),
});

const step4Schema = z.object({
  password: z.string().min(6, 'A senha deve ter pelo menos 6 caracteres'),
  confirmPassword: z.string(),
  termsAccepted: z.boolean().refine((val) => val === true, 'Você deve aceitar os termos de uso'),
  privacyAccepted: z.boolean().refine((val) => val === true, 'Você deve aceitar a política de privacidade'),
}).refine((data) => data.password === data.confirmPassword, {
  message: "As senhas não coincidem",
  path: ["confirmPassword"],
});

const fullSchema = step1Schema.merge(step2Schema).merge(step3Schema).merge(step4Schema);

interface RegisterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToLogin: () => void;
}

const RegisterModal: React.FC<RegisterModalProps> = ({ isOpen, onClose, onSwitchToLogin }) => {
  const [step, setStep] = useState(1);
  const { register: authRegister, isLoading } = useAuth();
  const { showNotification } = useNotification();
  const methods = useForm({
    resolver: zodResolver(fullSchema),
    mode: 'onTouched',
  });

  const nextStep = async () => {
    const fieldsByStep = {
      1: Object.keys(step1Schema.shape),
      2: Object.keys(step2Schema.shape),
      3: Object.keys(step3Schema.shape),
    };
    // @ts-ignore
    const isValid = await methods.trigger(fieldsByStep[step]);
    if (isValid) setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const onSubmit = async (data: any) => {
    try {
      await authRegister(data);
      showNotification('Cadastro realizado com sucesso! Faça o login para continuar.', 'success');
      onClose(); // Fecha o modal de registro
      onSwitchToLogin(); // Abre o modal de login
    } catch (error: any) {
      showNotification(error.message || 'Erro ao realizar o cadastro.', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <h2 className="text-2xl font-bold mb-4">Cadastro</h2>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ x: 300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {step === 1 && <RegisterStep1 />}
              {step === 2 && <RegisterStep2 />}
              {step === 3 && <RegisterStep3 />}
              {step === 4 && <RegisterStep4 />}
            </motion.div>
          </AnimatePresence>
          <div className="mt-4 flex justify-between">
            {step > 1 && <Button type="button" onClick={prevStep}>Anterior</Button>}
            {step < 4 && <Button type="button" onClick={nextStep}>Próximo</Button>}
            {step === 4 && <Button type="submit" loading={isLoading}>Finalizar Cadastro</Button>}
          </div>
          <p className="mt-4 text-center text-sm">
            Já tem conta? <button onClick={onSwitchToLogin} className="text-primary hover:underline">Faça login</button>
          </p>
        </form>
      </FormProvider>
    </Modal>
  );
};

export default RegisterModal;
