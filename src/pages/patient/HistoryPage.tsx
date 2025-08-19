import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useAuth } from '../../contexts/AuthContext';
import { format, parseISO, isValid } from 'date-fns';
import type { Consulta } from '../../types';

const API_URL = 'http://localhost:3002';

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

const HistoryPage = () => {
  const { user } = useAuth();
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [medicos, setMedicos] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(true);

  const renderDate = (dateString: string) => {
    try {
      if (!dateString || !isValid(parseISO(dateString))) {
        return 'Data inválida';
      }
      return format(parseISO(dateString), 'dd/MM/yyyy');
    } catch (error) {
      return 'Erro na data';
    }
  };

  useEffect(() => {
    const fetchHistory = async () => {
      if (user && user.type === 'paciente') {
        setIsLoading(true);
        try {
          const consultasRes = await fetch(`${API_URL}/consultas?pacienteId=${user.id}`);
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
          console.error("Erro ao buscar histórico:", error);
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchHistory();
  }, [user]);

  if (isLoading) {
    return <div>Carregando histórico...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Histórico de Consultas</h2>

      {consultas.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {consultas.map((consulta) => (
            <Card key={consulta.id}>
              <CardHeader>
                <CardTitle className="text-lg">Consulta com {medicos[consulta.medicoId] || '...'}</CardTitle>
                <p className="text-sm text-gray-500">{renderDate(consulta.data)} às {consulta.hora}</p>
              </CardHeader>
              <CardContent className="space-y-3">
                <p><strong>Especialidade:</strong> {consulta.especialidade}</p>
                <div className="flex items-center gap-2">
                  <strong>Status:</strong>
                  <StatusBadge status={consulta.status} />
                </div>
                {consulta.observacoes && <p><strong>Observações:</strong> {consulta.observacoes}</p>}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">Nenhum histórico de consultas encontrado.</p>
      )}
    </div>
  );
};

export default HistoryPage;