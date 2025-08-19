import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input as BaseInput } from '../../components/ui/Input';
import { format, parseISO, isValid } from 'date-fns';
import { Edit } from 'lucide-react';
import type { Consulta, Paciente, Medico } from '../../types';

const API_URL = 'http://localhost:3002';

const Input = ({ label, ...props }: { label: string; [key: string]: any }) => (
    <div>
        <label htmlFor={props.name} className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        <BaseInput id={props.name} {...props} />
    </div>
);

const StatusBadge = ({ status }: { status: string }) => {
  const statusStyles: { [key: string]: string } = {
    Concluída: 'bg-green-100 text-green-800',
    Agendada: 'bg-blue-100 text-blue-800',
    Cancelada: 'bg-red-100 text-red-800',
    Adiada: 'bg-yellow-100 text-yellow-800',
  };

  return (
    <span className={`px-2 py-1 inline-flex text-sm leading-5 font-semibold rounded-full ${statusStyles[status] || 'bg-gray-100 text-gray-800'}`}>
      {status}
    </span>
  );
};

const EditHistoryPage = () => {
  const { pacienteId } = useParams<{ pacienteId: string }>();
  const navigate = useNavigate();
  
  const [paciente, setPaciente] = useState<Paciente | null>(null);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [medicos, setMedicos] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newConsulta, setNewConsulta] = useState({ medicoId: '', especialidade: '', data: '', hora: '', status: 'Agendada', observacoes: '' });
  const [allMedicos, setAllMedicos] = useState<Medico[]>([]);
  const [editingStatusId, setEditingStatusId] = useState<string | null>(null);
  const [newStatus, setNewStatus] = useState('');

  const renderDate = (dateString: string) => {
    try {
      if (!dateString || !isValid(parseISO(dateString))) {
        console.warn('Data inválida ou ausente para a consulta:', dateString);
        return 'Data inválida';
      }
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch (error) {
      console.error('Erro ao formatar data:', error);
      return 'Erro na data';
    }
  };

  useEffect(() => {
    const fetchAllMedicos = async () => {
      try {
        const response = await fetch(`${API_URL}/medicos`);
        const data = await response.json();
        setAllMedicos(data);
      } catch (error) {
        console.error("Erro ao buscar médicos:", error);
      }
    };
    fetchAllMedicos();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!pacienteId) return;
      setIsLoading(true);
      try {
        const pacienteRes = await fetch(`${API_URL}/users/${pacienteId}`);
        const pacienteData = await pacienteRes.json();
        setPaciente(pacienteData);

        const consultasRes = await fetch(`${API_URL}/consultas?pacienteId=${pacienteId}`);
        const consultasData = await consultasRes.json();
        setConsultas(consultasData);

        if (consultasData.length > 0) {
          const medicosIds = [...new Set(consultasData.map((c: Consulta) => c.medicoId))];
          const medicosRes = await Promise.all(medicosIds.map(id => fetch(`${API_URL}/medicos/${id}`)));
          const medicosData = await Promise.all(medicosRes.map(res => res.json()));
          const medicosMap = medicosData.reduce((acc, medico) => {
            acc[medico.id] = medico.nome;
            return acc;
          }, {});
          setMedicos(medicosMap);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [pacienteId]);

  const handleAddConsulta = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!pacienteId || !newConsulta.medicoId) {
        alert("Por favor, selecione um médico.");
        return;
    }

    const selectedMedico = allMedicos.find(m => m.id === newConsulta.medicoId);

    const consultaToSave = {
      ...newConsulta,
      pacienteId,
      especialidade: selectedMedico?.especialidade || newConsulta.especialidade,
      id: Date.now().toString(),
    };

    try {
      const response = await fetch(`${API_URL}/consultas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(consultaToSave),
      });
      const savedConsulta = await response.json();
      setConsultas(prev => [...prev, savedConsulta]);
      if (selectedMedico) {
        setMedicos(prev => ({...prev, [selectedMedico.id]: selectedMedico.nome}));
      }
      setIsAdding(false);
      setNewConsulta({ medicoId: '', especialidade: '', data: '', hora: '', status: 'Agendada', observacoes: '' });
    } catch (error) {
      console.error("Erro ao adicionar consulta:", error);
    }
  };

  const handleUpdateStatus = async (consultaId: string) => {
    const consulta = consultas.find(c => c.id === consultaId);
    if (!consulta) return;

    const updatedConsulta = { ...consulta, status: newStatus };

    try {
      const response = await fetch(`${API_URL}/consultas/${consultaId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedConsulta),
      });
      const data = await response.json();
      setConsultas(prev => prev.map(c => c.id === consultaId ? data : c));
      setEditingStatusId(null);
    } catch (error) {
      console.error("Erro ao atualizar status:", error);
    }
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <Button onClick={() => navigate(-1)}>&larr; Voltar</Button>
      <h2 className="text-3xl font-bold mb-6">Histórico de {paciente?.fullName || 'Paciente'}</h2>

      {!isAdding && (
        <Button onClick={() => setIsAdding(true)}>Adicionar Nova Consulta</Button>
      )}

      {isAdding && (
        <Card>
          <CardHeader>
            <CardTitle>Adicionar Nova Consulta</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleAddConsulta} className="space-y-4">
                <div>
                    <label htmlFor="medicoId" className="block text-sm font-medium text-gray-700 mb-1">Médico</label>
                    <select 
                        id="medicoId" 
                        name="medicoId" 
                        value={newConsulta.medicoId} 
                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewConsulta({...newConsulta, medicoId: e.target.value})} 
                        className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        required
                    >
                        <option value="">Selecione um médico</option>
                        {allMedicos.map(medico => (
                            <option key={medico.id} value={medico.id}>{medico.nome} - {medico.especialidade}</option>
                        ))}
                    </select>
                </div>
              <Input label="Data da Consulta" name="data" type="date" value={newConsulta.data} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewConsulta({...newConsulta, data: e.target.value})} required />
              <Input label="Hora da Consulta" name="hora" type="time" value={newConsulta.hora} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setNewConsulta({...newConsulta, hora: e.target.value})} required />
              <Input label="Observações" name="observacoes" value={newConsulta.observacoes} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setNewConsulta({...newConsulta, observacoes: e.target.value})} />
              <div className="flex justify-end space-x-2">
                <Button type="button" variant="secondary" onClick={() => setIsAdding(false)}>Cancelar</Button>
                <Button type="submit">Salvar Consulta</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      <div className="space-y-4">
        {consultas.length > 0 ? (
          consultas.map((consulta) => (
            <Card key={consulta.id}>
              <CardHeader>
                <CardTitle className="text-lg">Consulta com {medicos[consulta.medicoId] || 'Médico não encontrado'}</CardTitle>
                <p className="text-sm text-gray-500">{renderDate(consulta.data)} às {consulta.hora}</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <p><strong>Especialidade:</strong> {consulta.especialidade}</p>
                
                {editingStatusId === consulta.id ? (
                  <div className="space-y-3 p-3 bg-gray-50 rounded-md">
                    <label className="block text-sm font-bold text-gray-700">Alterar Status</label>
                    <div className="flex items-center gap-2">
                      <select value={newStatus} onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setNewStatus(e.target.value)} className="flex-grow mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm">
                        <option>Agendada</option>
                        <option>Concluída</option>
                        <option>Cancelada</option>
                        <option>Adiada</option>
                      </select>
                      <Button onClick={() => handleUpdateStatus(consulta.id)}>Salvar</Button>
                      <Button variant="secondary" onClick={() => setEditingStatusId(null)}>Cancelar</Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <strong>Status:</strong>
                      <StatusBadge status={consulta.status} />
                    </div>
                    <Button variant="outline" onClick={() => { setEditingStatusId(consulta.id); setNewStatus(consulta.status); }}>
                      <Edit className="mr-2 h-4 w-4" />
                      Alterar Status
                    </Button>
                  </div>
                )}

                {consulta.observacoes && <p className="pt-2"><strong>Observações:</strong> {consulta.observacoes}</p>}
              </CardContent>
            </Card>
          ))
        ) : (
          <p>Nenhum histórico de consulta encontrado para este paciente.</p>
        )}
      </div>
    </div>
  );
};

export default EditHistoryPage;