import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import Modal from '../../components/ui/Modal';
import { PatientDetailsModal } from '../../components/ui/PatientDetailsModal';
import { format } from 'date-fns';
import { formatCPF, formatPhone } from '../../utils/masks';
import { Input } from '../../components/ui/Input';
import { Trash2, Eye, History, Search } from 'lucide-react';
import type { Paciente } from '../../types'; // Importação de tipo explícita

const PacientesAdmin = () => {
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [selectedPatient, setSelectedPatient] = useState<Paciente | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const fetchPacientes = async () => {
    try {
      const response = await fetch('http://localhost:3002/users?type=paciente');
      if (!response.ok) throw new Error('Erro ao buscar pacientes');
      const data = await response.json();
      setPacientes(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPacientes();
  }, []);

  const filteredPacientes = pacientes.filter(paciente =>
    paciente.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    paciente.cpf.replace(/\.|-/g, '').includes(searchTerm.replace(/\.|-/g, ''))
  );

  const handleOpenDetails = (patient: Paciente) => {
    setSelectedPatient(patient);
    setIsDetailsModalOpen(true);
  };

  const handleOpenDelete = (patient: Paciente) => {
    setSelectedPatient(patient);
    setIsDeleteModalOpen(true);
  };

  const handleEditHistory = (patientId: string) => {
    navigate(`/admin/pacientes/historico/${patientId}`);
  };

  const handleDeletePatient = async () => {
    if (!selectedPatient) return;

    try {
      const response = await fetch(`http://localhost:3002/users/${selectedPatient.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Falha ao deletar paciente');
      }

      setPacientes(pacientes.filter(p => p.id !== selectedPatient.id));
      setIsDeleteModalOpen(false);
      setSelectedPatient(null);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Gerenciar Pacientes</h2>
        <div className="relative w-1/3">
          <Input 
            placeholder="Buscar por nome ou CPF..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-max">
              <thead>
                <tr className="text-left border-b bg-gray-50">
                  <th className="p-4 font-semibold uppercase">Nome</th>
                  <th className="p-4 font-semibold uppercase">CPF</th>
                  <th className="p-4 font-semibold uppercase">Telefone</th>
                  <th className="p-4 font-semibold uppercase">Ações</th>
                </tr>
              </thead>
              <tbody>
                {filteredPacientes.length > 0 ? (
                  filteredPacientes.map((paciente) => (
                    <tr key={paciente.id} className="border-b hover:bg-gray-50">
                      <td className="p-4">{paciente.fullName}</td>
                      <td className="p-4">{formatCPF(paciente.cpf)}</td>
                      <td className="p-4">{formatPhone(paciente.telefone)}</td>
                      <td className="p-4 flex items-center space-x-2">
                        <Button variant="ghost" size="sm" onClick={() => handleOpenDetails(paciente)} title="Ver Detalhes">
                          <Eye className="h-5 w-5 text-blue-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleEditHistory(paciente.id)} title="Editar Histórico">
                          <History className="h-5 w-5 text-green-600" />
                        </Button>
                        <Button variant="ghost" size="sm" onClick={() => handleOpenDelete(paciente)} title="Excluir Paciente">
                          <Trash2 className="h-5 w-5 text-red-600" />
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="p-8 text-center text-gray-500">
                      Nenhum paciente encontrado.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
          <div className="md:hidden">
            {filteredPacientes.length > 0 ? (
              filteredPacientes.map((paciente) => (
                <div key={paciente.id} className="border-b border-gray-200 p-4">
                  <h3 className="font-semibold">{paciente.fullName}</h3>
                  <p className="text-sm text-gray-500">CPF: {formatCPF(paciente.cpf)}</p>
                  <p className="text-sm text-gray-500">Telefone: {formatPhone(paciente.telefone)}</p>
                  <div className="mt-2 flex justify-end space-x-2">
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDetails(paciente)} title="Ver Detalhes">
                      <Eye className="h-5 w-5 text-blue-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleEditHistory(paciente.id)} title="Editar Histórico">
                      <History className="h-5 w-5 text-green-600" />
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => handleOpenDelete(paciente)} title="Excluir Paciente">
                      <Trash2 className="h-5 w-5 text-red-600" />
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <p className="p-8 text-center text-gray-500">Nenhum paciente encontrado.</p>
            )}
          </div>
        </CardContent>
      </Card>

      <PatientDetailsModal 
        isOpen={isDetailsModalOpen} 
        onClose={() => setIsDetailsModalOpen(false)} 
        patient={selectedPatient} 
      />

      <Modal 
        isOpen={isDeleteModalOpen} 
        onClose={() => setIsDeleteModalOpen(false)} 
      >
        <div className="space-y-4">
          <p>Você tem certeza que deseja excluir o paciente <strong className="font-semibold">{selectedPatient?.fullName}</strong>?</p>
          <p className="text-sm text-red-600">Esta ação não pode ser desfeita.</p>
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="secondary" onClick={() => setIsDeleteModalOpen(false)}>Cancelar</Button>
            <Button variant="danger" onClick={handleDeletePatient}>Excluir</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default PacientesAdmin;