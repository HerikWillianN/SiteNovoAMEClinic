import { useState, useEffect } from 'react';
import { Card } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { Badge } from '../components/ui/Badge';
import { Calendar, Clock, CalendarX2 } from 'lucide-react';

// Definindo a interface para o objeto Medico
interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  fotoUrl: string;
  horarioInicio: string;
  horarioFim: string;
  diasDisponiveisMes: string[];
  ativo: boolean;
}

const DashboardPage = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch('/api/medicos');
        const data = await response.json();
        setMedicos(data);
      } catch (error) {
        console.error('Error fetching medicos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMedicos();
  }, []);


  const handleAgendarConsulta = (medicoNome: string) => {
    const numeroClinica = '5538999361112'; // Substitua pelo número da sua clínica
    const mensagem = `Olá, gostaria de agendar uma consulta com ${medicoNome}.`;
    const url = `https://api.whatsapp.com/send?phone=${numeroClinica}&text=${encodeURIComponent(mensagem)}`;
    window.open(url, '_blank');
  };

  const getDatasDoMesFormatadas = (datas?: string[]) => {
    if (!datas || datas.length === 0) return [];
    
    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);

    return datas
      .map(d => new Date(d + 'T00:00:00'))
      .filter(d => d >= hoje)
      .sort((a, b) => a.getTime() - b.getTime())
      .map(d => d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' }));
  };

  return (
    <div className="container mx-auto p-4 md:p-6 lg:p-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Nossos Médicos</h1>
      <p className="text-lg text-gray-600 mb-8">Conheça nossa equipe de especialistas e agende sua consulta.</p>

      {loading ? (
        <div className="text-center text-gray-500">Carregando médicos...</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medicos.filter(m => m.ativo).map((medico) => {
            const datasDoMes = getDatasDoMesFormatadas(medico.diasDisponiveisMes);
            return (
              <Card key={medico.id} className="flex flex-col bg-white rounded-lg shadow-lg overflow-hidden transform hover:scale-105 transition-transform duration-300">
                <div className="p-6 flex-grow">
                  <div className="flex items-center mb-4">
                    <img src={medico.fotoUrl} alt={`Foto de ${medico.nome}`} className="w-20 h-20 rounded-full mr-4 object-cover border-2 border-teal-500" />
                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">{medico.nome}</h2>
                      <Badge variant="secondary" className="bg-teal-100 text-teal-800">{medico.especialidade}</Badge>
                    </div>
                  </div>

                  <div className="space-y-4 text-gray-600">
                    <div className="flex items-center">
                      <Clock className="w-5 h-5 mr-3 text-teal-500" />
                      <span>
                        <strong>Horário:</strong> {medico.horarioInicio} - {medico.horarioFim}
                      </span>
                    </div>
                    <div className="flex items-start">
                      <Calendar className="w-5 h-5 mr-3 mt-1 text-teal-500 flex-shrink-0" />
                      <div>
                        <strong>Próximas Datas:</strong>
                        {datasDoMes.length > 0 ? (
                          <div className="flex flex-wrap gap-2 mt-2">
                            {datasDoMes.map(data => (
                              <Badge key={data} variant="outline">{data}</Badge>
                            ))}
                          </div>
                        ) : (
                          <div className="flex items-center text-sm text-gray-500 mt-2">
                            <CalendarX2 className="w-4 h-4 mr-2" />
                            <span>Nenhuma data definida.</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="p-6 bg-gray-50 mt-auto">
                  <Button 
                    onClick={() => handleAgendarConsulta(medico.nome)} 
                    className="w-full bg-teal-500 hover:bg-teal-600 text-white font-bold transition-colors duration-300"
                    disabled={datasDoMes.length === 0}
                  >
                    {datasDoMes.length > 0 ? 'Agendar Consulta' : 'Indisponível'}
                  </Button>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  );
};

export default DashboardPage;