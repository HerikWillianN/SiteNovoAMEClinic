import Modal from './Modal';
import type { Paciente } from '../../types';
import { Button } from './Button';
import { format } from 'date-fns';
import { formatCPF, formatPhone } from '../../utils/masks';

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Paciente | null;
}

export const PatientDetailsModal = ({ isOpen, onClose, patient }: PatientDetailsModalProps) => {
  if (!patient) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="space-y-6">
        {/* Informações Pessoais */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Informações Pessoais</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p><strong className="font-medium text-gray-600">Nome:</strong> {patient.fullName}</p>
            <p><strong className="font-medium text-gray-600">Email:</strong> {patient.email}</p>
            <p><strong className="font-medium text-gray-600">CPF:</strong> {formatCPF(patient.cpf)}</p>
            <p><strong className="font-medium text-gray-600">Telefone:</strong> {formatPhone(patient.telefone)}</p>
            <p><strong className="font-medium text-gray-600">Data de Nasc.:</strong> {format(new Date(patient.dataNascimento), 'dd/MM/yyyy')}</p>
          </div>
        </div>

        {/* Endereço */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Endereço</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p><strong className="font-medium text-gray-600">CEP:</strong> {patient.endereco.cep}</p>
            <p><strong className="font-medium text-gray-600">Rua:</strong> {patient.endereco.rua}, {patient.endereco.numero}</p>
            <p><strong className="font-medium text-gray-600">Complemento:</strong> {patient.endereco.complemento || 'N/A'}</p>
            <p><strong className="font-medium text-gray-600">Cidade/Estado:</strong> {patient.endereco.cidade} / {patient.endereco.estado}</p>
          </div>
        </div>

        {/* Informações Médicas e Contato de Emergência */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">Outras Informações</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4 gap-y-2 text-sm">
            <p><strong className="font-medium text-gray-600">Convênio:</strong> {patient.convenio?.nome || 'Não possui'}</p>
            <p><strong className="font-medium text-gray-600">Contato de Emergência:</strong> {patient.contatoEmergencia.nome}</p>
            <p><strong className="font-medium text-gray-600">Telefone de Emergência:</strong> {formatPhone(patient.contatoEmergencia.telefone)}</p>
            <p className="md:col-span-2"><strong className="font-medium text-gray-600">Observações Médicas:</strong> {patient.medicalNotes || 'Nenhuma'}</p>
          </div>
        </div>

        <div className="flex justify-end pt-4">
          <Button variant="secondary" onClick={onClose}>Fechar</Button>
        </div>
      </div>
    </Modal>
  );
};
