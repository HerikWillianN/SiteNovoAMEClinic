import { useState } from 'react';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { Input } from '../../components/ui/Input';

import { MapPin, Phone, Mail, Clock, Star } from 'lucide-react';

const mockDoctors = [
  {
    name: 'Dr. João Silva',
    crm: '123456',
    specialty: 'Cardiologia',
    available: true,
    days: ['Segunda', 'Quarta', 'Sexta'],
    hours: '08:00 - 17:00',
    rating: 4.8,
  },
  {
    name: 'Dra. Maria Santos',
    crm: '234567',
    specialty: 'Dermatologia',
    available: false,
    days: ['Terça', 'Quinta'],
    hours: '09:00 - 18:00',
    rating: 4.5,
  },
  {
    name: 'Dr. Pedro Costa',
    crm: '345678',
    specialty: 'Ortopedia',
    available: true,
    days: ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'],
    hours: '10:00 - 19:00',
    rating: 4.9,
  },
  {
    name: 'Dra. Ana Oliveira',
    crm: '456789',
    specialty: 'Ginecologia',
    available: true,
    days: ['Terça', 'Quarta', 'Sexta'],
    hours: '08:30 - 17:30',
    rating: 4.7,
  },
  {
    name: 'Dr. Carlos Lima',
    crm: '567890',
    specialty: 'Neurologia',
    available: false,
    days: ['Segunda', 'Quinta'],
    hours: '11:00 - 20:00',
    rating: 4.6,
  },
  {
    name: 'Dra. Fernanda Rocha',
    crm: '678901',
    specialty: 'Pediatria',
    available: true,
    days: ['Terça', 'Quarta', 'Quinta'],
    hours: '07:00 - 16:00',
    rating: 4.9,
  },
];

const PatientDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('Todos');
  const [selectedDay, setSelectedDay] = useState('Todos');

  // Simulate loading
  useState(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  });

  const filteredDoctors = mockDoctors.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'Todos' || doctor.specialty === selectedSpecialty;
    const matchesDay = selectedDay === 'Todos' || doctor.days.includes(selectedDay);
    return matchesSearch && matchesSpecialty && matchesDay;
  });

  const specialties = ['Todos', ...new Set(mockDoctors.map(d => d.specialty))];
  const daysOfWeek = ['Todos', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'];

  return (
    <div>
      {/* Seção de Boas-vindas */}
      <section className="mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Bem-vindo ao seu painel!</CardTitle>
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
              {loading ? (
                <div className="bg-gray-50 p-4 rounded-md text-center text-gray-600">Carregando...</div>
              ) : (
                <div className="bg-gray-50 p-4 rounded-md">
                  <p className="text-gray-600">Nenhum agendamento futuro.</p>
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
          <select
            value={selectedDay}
            onChange={(e) => setSelectedDay(e.target.value)}
            className="p-2 border rounded-md"
          >
            {daysOfWeek.map(d => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>

        {loading ? (
          <div className="grid md:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map(i => <div key={i} className="h-64 w-full bg-gray-200 rounded-lg animate-pulse"></div>)}
          </div>
        ) : filteredDoctors.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum médico encontrado com os filtros aplicados.</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {filteredDoctors.map((doctor, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                <CardHeader>
                  <img src={`https://i.pravatar.cc/150?img=${index + 10}`} alt={doctor.name} className="rounded-full mx-auto" />
                </CardHeader>
                <CardContent className="text-center">
                  <CardTitle>{doctor.name}</CardTitle>
                  <p className="text-primary font-semibold">{doctor.specialty}</p>
                  <p className="text-sm text-gray-500">CRM {doctor.crm}</p>
                  <div className="flex justify-center items-center my-2">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} fill={i < Math.floor(doctor.rating) ? 'gold' : 'none'} stroke={i < Math.floor(doctor.rating) ? 'gold' : 'gray'} />
                    ))}
                    <span className="ml-1 text-sm text-gray-600">({doctor.rating})</span>
                  </div>
                  <div className="flex flex-wrap justify-center gap-1 my-2">
                    {doctor.days.map(day => (
                      <span key={day} className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full">{day}</span>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">Horário: {doctor.hours}</p>
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${doctor.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {doctor.available ? 'Disponível' : 'Ocupado'}
                  </span>
                  <Button className="mt-4 w-full">Agendar Consulta</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Seção "Nossa Clínica" */}
      <section className="py-8 bg-gray-50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">Nossa Clínica</h2>
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <Card>
              <CardHeader><CardTitle>Nossa História</CardTitle></CardHeader>
              <CardContent><p>Fundada em 2010, a clínica tem sido um pilar de saúde na comunidade, crescendo e se adaptando às necessidades de nossos pacientes.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Missão e Valores</CardTitle></CardHeader>
              <CardContent><p>Nossa missão é oferecer atendimento médico de excelência com humanidade, ética e inovação, promovendo a saúde e o bem-estar.</p></CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Certificações</CardTitle></CardHeader>
              <CardContent><p>Possuímos as mais rigorosas certificações de qualidade e segurança, garantindo um ambiente de cuidado confiável.</p></CardContent>
            </Card>
          </div>
          <h3 className="text-2xl font-bold text-center mb-6">Galeria de Fotos</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {[1, 2, 3, 4].map(i => (
              <img key={i} src={`https://via.placeholder.com/300?text=Clínica+${i}`} alt="Clínica" className="rounded-lg shadow-md w-full h-auto" />
            ))}
          </div>
          <h3 className="text-2xl font-bold text-center mb-6">Depoimentos de Pacientes</h3>
          <div className="overflow-x-auto flex space-x-4 p-4">
            {[1, 2, 3].map(i => (
              <Card key={i} className="min-w-[300px]">
                <CardContent>
                  <p className="italic mb-2">"Excelente atendimento! Profissionais muito atenciosos e estrutura impecável."</p>
                  <p className="font-semibold">- Paciente {i}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Informações de Contato */}
      <section className="py-8">
        <div className="container">
          <h2 className="text-3xl font-bold text-center mb-8">Informações de Contato</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader><CardTitle>Nossos Contatos</CardTitle></CardHeader>
              <CardContent className="space-y-2">
                <p className="flex items-center"><MapPin className="mr-2" size={20} /> Rua Fictícia, 123, Bairro dos Sonhos, Cidade Imaginária, Estado dos Contos, CEP: 12345-678</p>
                <p className="flex items-center"><Phone className="mr-2" size={20} /> <a href="tel:+551112345678">(11) 1234-5678</a></p>
                <p className="flex items-center"><Phone className="mr-2" size={20} /> <a href="https://wa.me/5511987654321" target="_blank" rel="noopener noreferrer">(11) 98765-4321 (WhatsApp)</a></p>
                <p className="flex items-center"><Mail className="mr-2" size={20} /> <a href="mailto:contato@ameclinic.com">contato@ameclinic.com</a></p>
                <p className="flex items-center"><Clock className="mr-2" size={20} /> Seg a Sex: 8h-18h | Sáb: 8h-12h</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader><CardTitle>Localização</CardTitle></CardHeader>
              <CardContent>
                <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500">
                  Placeholder para Mapa
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PatientDashboard;