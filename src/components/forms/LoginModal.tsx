import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import { useNotification } from '../../contexts/NotificationContext';
import Modal from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const loginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(6, { message: 'A senha deve ter pelo menos 6 caracteres' }),
});

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSwitchToRegister: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onClose, onSwitchToRegister }) => {
  const { login, isLoading } = useAuth();
  const { showNotification } = useNotification();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: any) => {
    try {
      await login(data.email, data.password);
      onClose();
    } catch (error) {
      showNotification('Email ou senha incorretos. Tente novamente.', 'error');
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input label="Email" {...register('email')} error={errors.email?.message as string} />
        <Input label="Senha" type="password" {...register('password')} error={errors.password?.message as string} />
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input type="checkbox" id="remember-me" className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded" />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Lembrar-me</label>
          </div>
          <a href="#" className="text-sm text-primary hover:underline">Esqueci minha senha</a>
        </div>
        <Button type="submit" loading={isLoading} className="w-full">Entrar</Button>
      </form>
      <p className="mt-4 text-center text-sm">
        Não tem conta? <button onClick={onSwitchToRegister} className="text-primary hover:underline">Cadastre-se aqui</button>
      </p>
    </Modal>
  );
};

export default LoginModal;
