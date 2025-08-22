import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';
import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react';

// Interfaces
interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  crm: string;
  fotoUrl: string;
}

interface Consulta {
  id: number;
  data: string;
  hora: string;
  especialidade: string;
  status: string;
  medico_nome: string; // Nome do médico vindo do JOIN no backend
}

const PatientDashboard = () => {
  const { user } = useAuth();
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [loadingMedicos, setLoadingMedicos] = useState(true);
  const [loadingConsultas, setLoadingConsultas] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todos');

  // Fetch Médicos
  useEffect(() => {
    const fetchMedicos = async () => {
      setLoadingMedicos(true);
      try {
        const response = await fetch('/api/medicos');
        const data = await response.json();
        setMedicos(data);
      } catch (error) {
        console.error('Error fetching medicos:', error);
      } finally {
        setLoadingMedicos(false);
      }
    };
    fetchMedicos();
  }, []);

  // Fetch Consultas
  useEffect(() => {
    const fetchConsultas = async () => {
      if (user?.id) {
        setLoadingConsultas(true);
        try {
          const response = await fetch(`/api/consultas/paciente/${user.id}`);
          const data = await response.json();
          setConsultas(data);
        } catch (error) {
          console.error('Error fetching consultas:', error);
        } finally {
          setLoadingConsultas(false);
        }
      }
    };
    fetchConsultas();
  }, [user]);

  const filteredDoctors = medicos.filter(doctor => {
    const matchesSearch = doctor.nome.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'Todos' || doctor.especialidade === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  const specialties = ['Todos', ...new Set(medicos.map(d => d.especialidade))];

  return (
    <div>
      {/* Seção de Boas-vindas */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo(a) ao seu painel, {user?.name || 'Paciente'}!</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Aqui você pode gerenciar seus agendamentos, visualizar seu histórico e muito mais.</p>
            <div className="mt-4 space-x-4">
              <Button>Agendar Consulta</Button>
              <Button variant="outline">Meus Dados</Button>
              <Button variant="outline">Histórico</Button>
            </div>
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-2">Próximos Agendamentos</h3>
              {loadingConsultas ? (
                <div className="bg-gray-50 p-4 rounded-md text-center text-gray-600">Carregando agendamentos...</div>
              ) : consultas.length > 0 ? (
                <ul className="bg-gray-50 p-4 rounded-md space-y-3">
                  {consultas.filter(c => new Date(c.data) >= new Date()).map(c => (
                    <li key={c.id} className="p-3 border rounded-md bg-white shadow-sm">
                      <p className="font-bold">Dr(a). {c.medico_nome} <span className="font-normal text-gray-600">({c.especialidade})</span></p>
                      <p className="text-sm text-gray-800">Data: {new Date(c.data + 'T00:00:00').toLocaleDateString('pt-BR')} às {c.hora}</p>
                      <p className="text-sm text-gray-500">Status: <span className="font-semibold">{c.status}</span></p>
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600">Nenhum agendamento futuro encontrado.</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Grid de Médicos Disponíveis */}
      <section className="mb-8">
        <h2 className="text-2xl font-bold mb-4">Médicos Disponíveis</h2>
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <Input
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1"
          />
          <select
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
            className="p-2 border rounded-md"
          >
            {specialties.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {loadingMedicos ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => <div key={i} className="h-64 w-full bg-gray-200 rounded-lg animate-pulse"></div>)}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum médico encontrado com os filtros aplicados.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor) => (
              <Card key={doctor.id} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <img src={doctor.fotoUrl} alt={doctor.nome} className="rounded-full mx-auto w-24 h-24 object-cover" />
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle>{doctor.nome}</CardTitle>
                  <p className="text-primary font-semibold">{doctor.especialidade}</p>
                  <p className="text-sm text-gray-500">CRM {doctor.crm}</p>
                  <Button className="mt-4 w-full">Agendar Consulta</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default PatientDashboard;
