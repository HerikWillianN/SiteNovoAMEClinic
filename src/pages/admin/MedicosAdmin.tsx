import { useState } from 'react';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { PlusCircle, Edit, Trash2, Search } from 'lucide-react';
import { useData } from '../../contexts/DataContext';
import AddEditMedicoModal from '../../components/forms/AddEditMedicoModal';
import Modal from '../../components/ui/Modal';
import type { Medico } from '../../types';

const MedicosAdmin = () => {
  const { medicos, addMedico, updateMedico, deleteMedico } = useData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedMedico, setSelectedMedico] = useState<Medico | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredMedicos = medicos.filter(medico =>
    medico.nome.toLowerCase().includes(searchTerm.toLowerCase()) ||
    medico.crm.includes(searchTerm)
  );

  const handleOpenModal = (medico?: Medico) => {
    setSelectedMedico(medico);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedMedico(undefined);
    setIsModalOpen(false);
  };

  const handleSaveMedico = (data: Medico) => {
    if (selectedMedico) {
      updateMedico({ ...selectedMedico, ...data });
    } else {
      addMedico(data);
    }
    handleCloseModal();
  };

  const handleOpenDeleteModal = (medico: Medico) => {
    setSelectedMedico(medico);
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setSelectedMedico(undefined);
    setIsDeleteModalOpen(false);
  };

  const handleDeleteMedico = () => {
    if (selectedMedico) {
      deleteMedico(selectedMedico.id);
      handleCloseDeleteModal();
    }
  };

  return (
    <>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Gerenciar Médicos</h2>
        <div className="flex items-center space-x-4">
          <div className="relative w-64">
            <Input 
              placeholder="Buscar por nome ou CRM..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          </div>
          <Button onClick={() => handleOpenModal()}>
            <PlusCircle className="mr-2" /> Adicionar Médico
          </Button>
        </div>
      </div>
      <Card>
        <CardContent className="p-0">
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-medium text-black uppercase tracking-wider">
                  <th className="p-4">Nome</th>
                  <th className="p-4">Especialidade</th>
                  <th className="p-4">CRM</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Ações</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredMedicos.map((medico) => (
                  <tr key={medico.id}>
                    <td className="p-4 whitespace-nowrap">{medico.nome}</td>
                    <td className="p-4 whitespace-nowrap">{medico.especialidade}</td>
                    <td className="p-4 whitespace-nowrap">{medico.crm}</td>
                    <td className="p-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${medico.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                        {medico.ativo ? 'Ativo' : 'Inativo'}
                      </span>
                    </td>
                    <td className="p-4 whitespace-nowrap text-sm font-medium">
                      <Button variant="ghost" size="sm" onClick={() => handleOpenModal(medico)} className="mr-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => handleOpenDeleteModal(medico)} className="text-red-600 hover:text-red-800">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="md:hidden">
            {filteredMedicos.map((medico) => (
              <div key={medico.id} className="border-b border-gray-200 p-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold">{medico.nome}</h3>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${medico.ativo ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {medico.ativo ? 'Ativo' : 'Inativo'}
                  </span>
                </div>
                <p className="text-sm text-gray-500">{medico.especialidade}</p>
                <p className="text-sm text-gray-500">CRM: {medico.crm}</p>
                <div className="mt-2 flex justify-end space-x-2">
                  <Button variant="ghost" size="sm" onClick={() => handleOpenModal(medico)}>
                    <Edit className="h-4 w-4 mr-1" /> Editar
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleOpenDeleteModal(medico)} className="text-red-600 hover:text-red-800">
                    <Trash2 className="h-4 w-4 mr-1" /> Excluir
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      {isModalOpen && (
        <AddEditMedicoModal 
          isOpen={isModalOpen} 
          onClose={handleCloseModal} 
          onSave={handleSaveMedico} 
          medico={selectedMedico} 
        />
      )}
      <Modal
        isOpen={isDeleteModalOpen}
        onClose={handleCloseDeleteModal}
      >
        <div className="space-y-4">
          <h3 className="text-lg font-semibold">Confirmar Exclusão</h3>
          <p>Você tem certeza que deseja excluir o médico <strong className="font-semibold">{selectedMedico?.nome}</strong>?</p>
          <p className="text-sm text-red-600">Esta ação não pode ser desfeita.</p>
          <div className="flex justify-end space-x-4 pt-4">
            <Button variant="secondary" onClick={handleCloseDeleteModal}>Cancelar</Button>
            <Button variant="danger" onClick={handleDeleteMedico}>Excluir</Button>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default MedicosAdmin;