import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth } from '../../contexts/AuthContext';
import Modal from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useNavigate } from 'react-router-dom';

const adminLoginSchema = z.object({
  email: z.string().email({ message: 'Email inválido' }),
  password: z.string().min(1, { message: 'Senha é obrigatória' }),
});

interface AdminLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ isOpen, onClose }) => {
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(adminLoginSchema),
  });

  const onSubmit = async (data: any) => {
    await login(data.email, data.password);
    onClose();
    navigate('/admin');
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="bg-gray-800 p-8 rounded-lg">
        <h2 className="text-2xl font-bold mb-4 text-white">Acesso Restrito</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <Input label="Email" {...register('email')} error={errors.email?.message as string} />
          <Input label="Senha" type="password" {...register('password')} error={errors.password?.message as string} />
          <Button type="submit" loading={isLoading} className="w-full bg-primary hover:bg-primary/90">Entrar</Button>
        </form>
      </div>
    </Modal>
  );
};

export default AdminLoginModal;
