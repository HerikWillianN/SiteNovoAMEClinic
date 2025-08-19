import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Toggle } from '../../components/ui/Toggle';

const SettingsAdmin = () => {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Configurações do Sistema</h2>

      <Card>
        <CardHeader>
          <CardTitle>Configurações Gerais</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="clinicName" className="block text-sm font-medium text-gray-700">Nome da Clínica</label>
            <Input type="text" id="clinicName" defaultValue="AMEClinic" className="mt-1 block w-full" />
          </div>
          <div>
            <label htmlFor="emailContato" className="block text-sm font-medium text-gray-700">Email de Contato</label>
            <Input type="email" id="emailContato" defaultValue="contato@ameclinic.com" className="mt-1 block w-full" />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Permitir novos cadastros</span>
            <Toggle />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Segurança</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="passwordPolicy" className="block text-sm font-medium text-gray-700">Política de Senha</label>
            <p className="text-sm text-gray-500">Defina os requisitos mínimos para senhas de usuários.</p>
            <Button className="mt-2">Configurar Política</Button>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-gray-700">Autenticação de Dois Fatores (2FA)</span>
            <Toggle />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Integrações</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label htmlFor="apiKeys" className="block text-sm font-medium text-gray-700">Chaves de API</label>
            <p className="text-sm text-gray-500">Gerencie as chaves de API para integrações externas.</p>
            <Button className="mt-2">Gerenciar Chaves</Button>
          </div>
        </CardContent>
      </Card>

      <div className="flex justify-end">
        <Button>Salvar Configurações</Button>
      </div>
    </div>
  );
};

export default SettingsAdmin;