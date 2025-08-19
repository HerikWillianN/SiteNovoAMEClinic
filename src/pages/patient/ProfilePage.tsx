import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input as BaseInput } from '../../components/ui/Input'; // Renomeado para evitar conflito
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';
import { useNotification } from '../../contexts/NotificationContext';

// Helper para o Input com label
const Input = ({ label, ...props }: { label: string; [key: string]: any }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <BaseInput id={props.name} {...props} />
    </div>
);

const ProfilePage = () => {
  const { user, updateProfile, deleteAccount, updatePassword } = useAuth();
  const { showNotification } = useNotification();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<Partial<Paciente>>({});

  useEffect(() => {
    if (user && user.type === 'paciente') {
      setFormData(user as Paciente);
    }
  }, [user]);

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      endereco: {
        ...(prev.endereco || { cep: '', rua: '', numero: '', cidade: '', estado: '' }),
        [name]: value
      },
    }));
  };

  const handleInsuranceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      convenio: {
        ...(prev.convenio || { nome: '', numeroCarteirinha: '' }),
        [name]: value
      },
    }));
  };

  const handleEmergencyContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      contatoEmergencia: {
        ...(prev.contatoEmergencia || { nome: '', telefone: '' }),
        [name]: value
      },
    }));
  };
  
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswordData({ ...passwordData, [e.target.name]: e.target.value });
  };

  const handleSaveProfile = async () => {
    if (user) {
      await updateProfile(formData);
      setIsEditing(false);
    }
  };

  const handleSavePassword = async () => {
    if (!user) {
      showNotification('Usuário não logado.', 'error');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmNewPassword) {
      showNotification('A nova senha e a confirmação não coincidem.', 'error');
      return;
    }
    if (passwordData.newPassword.length < 6) {
      showNotification('A nova senha deve ter pelo menos 6 caracteres.', 'error');
      return;
    }

    try {
      await updatePassword(user.id, passwordData.currentPassword, passwordData.newPassword);
      showNotification('Senha alterada com sucesso!', 'success');
      setPasswordData({ currentPassword: '', newPassword: '', confirmNewPassword: '' });
    } catch (error: any) {
      showNotification(`Erro ao alterar senha: ${error.message}`, 'error');
    }
  };

  const handleDeleteAccount = async () => {
    const confirmation = window.confirm(
      'Você tem certeza que deseja excluir sua conta? Esta ação é irreversível.'
    );
    if (confirmation) {
      try {
        await deleteAccount();
        showNotification('Sua conta foi excluída com sucesso.', 'success');
        // O logout e redirecionamento são feitos no AuthContext
      } catch (error: any) {
        showNotification(`Erro ao excluir a conta: ${error.message}`, 'error');
      }
    }
  };

  if (!user || user.type !== 'paciente') {
    return <div>Carregando perfil...</div>;
  }

  const paciente = user as Paciente;

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Meu Perfil</h2>

      <Card>
        <CardHeader>
          <CardTitle>Informações Pessoais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="Nome Completo" name="nome" value={formData.nome || ''} onChange={handleChange} />
              <Input label="Email" name="email" type="email" value={formData.email || ''} onChange={handleChange} />
              <Input label="CPF" name="cpf" value={formData.cpf || ''} onChange={handleChange} />
              <Input label="Data de Nascimento" name="dataNascimento" type="date" value={formData.dataNascimento || ''} onChange={handleChange} />
              <Input label="Telefone" name="telefone" value={formData.telefone || ''} onChange={handleChange} />
            </div>
          ) : (
            <div className="space-y-2">
              <p><strong>Nome Completo:</strong> {paciente.nome}</p>
              <p><strong>Email:</strong> {paciente.email}</p>
              <p><strong>CPF:</strong> {paciente.cpf}</p>
              <p><strong>Data de Nascimento:</strong> {paciente.dataNascimento}</p>
              <p><strong>Telefone:</strong> {paciente.telefone}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Endereço</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isEditing ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input label="CEP" name="cep" value={formData.endereco?.cep || ''} onChange={handleAddressChange} />
              <Input label="Rua" name="rua" value={formData.endereco?.rua || ''} onChange={handleAddressChange} />
              <Input label="Número" name="numero" value={formData.endereco?.numero || ''} onChange={handleAddressChange} />
              <Input label="Complemento" name="complemento" value={formData.endereco?.complemento || ''} onChange={handleAddressChange} />
              <Input label="Cidade" name="cidade" value={formData.endereco?.cidade || ''} onChange={handleAddressChange} />
              <Input label="Estado" name="estado" value={formData.endereco?.estado || ''} onChange={handleAddressChange} />
            </div>
          ) : (
            <div className="space-y-2">
                <p><strong>CEP:</strong> {paciente.endereco?.cep}</p>
                <p><strong>Rua:</strong> {paciente.endereco?.rua}, {paciente.endereco?.numero}</p>
                {paciente.endereco?.complemento && <p><strong>Complemento:</strong> {paciente.endereco.complemento}</p>}
                <p><strong>Cidade/Estado:</strong> {paciente.endereco?.cidade}/{paciente.endereco?.estado}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
            <CardTitle>Convênio</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Nome do Convênio" name="nome" value={formData.convenio?.nome || ''} onChange={handleInsuranceChange} />
                    <Input label="Número da Carteirinha" name="numeroCarteirinha" value={formData.convenio?.numeroCarteirinha || ''} onChange={handleInsuranceChange} />
                </div>
            ) : (
                <div className="space-y-2">
                    <p><strong>Convênio:</strong> {paciente.convenio?.nome || 'Não informado'}</p>
                    <p><strong>Número da Carteirinha:</strong> {paciente.convenio?.numeroCarteirinha || 'Não informado'}</p>
                </div>
            )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
            <CardTitle>Contato de Emergência</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            {isEditing ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Input label="Nome" name="nome" value={formData.contatoEmergencia?.nome || ''} onChange={handleEmergencyContactChange} />
                    <Input label="Telefone" name="telefone" value={formData.contatoEmergencia?.telefone || ''} onChange={handleEmergencyContactChange} />
                </div>
            ) : (
                <div className="space-y-2">
                    <p><strong>Nome:</strong> {paciente.contatoEmergencia?.nome}</p>
                    <p><strong>Telefone:</strong> {paciente.contatoEmergencia?.telefone}</p>
                </div>
            )}
        </CardContent>
      </Card>

      <div className="flex justify-end space-x-2 mt-6">
        {isEditing ? (
          <>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>Cancelar</Button>
            <Button onClick={handleSaveProfile}>Salvar Alterações</Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)}>Editar Perfil</Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alterar Senha</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Input label="Senha Atual" name="currentPassword" type="password" value={passwordData.currentPassword} onChange={handlePasswordChange} />
          <Input label="Nova Senha" name="newPassword" type="password" value={passwordData.newPassword} onChange={handlePasswordChange} />
          <Input label="Confirmar Nova Senha" name="confirmNewPassword" type="password" value={passwordData.confirmNewPassword} onChange={handlePasswordChange} />
          <div className="flex justify-end">
            <Button onClick={handleSavePassword}>Salvar Nova Senha</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="border-red-500">
        <CardHeader>
          <CardTitle className="text-red-600">Zona de Perigo</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="mb-4 text-gray-700">
            A exclusão da sua conta é uma ação permanente e todos os seus dados serão perdidos. 
            Não será possível recuperar sua conta após a confirmação.
          </p>
          <div className="flex justify-end">
            <Button variant="destructive" onClick={handleDeleteAccount}>
              Excluir Minha Conta
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfilePage;
