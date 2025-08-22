import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNotification } from '../contexts/NotificationContext';
import { Calendar } from '../components/ui/Calendar';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

// Interfaces
interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  diasDisponiveisMes: string[];
  horarioInicio: string;
  horarioFim: string;
}

interface TimeSlot {
  time: string;
  available: boolean;
}

const AgendamentoPage: React.FC = () => {
  const { user } = useAuth();
  const { showNotification } = useNotification();

  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [selectedMedico, setSelectedMedico] = useState<Medico | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<TimeSlot[]>([]);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch medicos on component mount
  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch('/api/medicos');
        const data = await response.json();
        setMedicos(data.filter((m: Medico) => m.ativo));
      } catch (error) {
        console.error('Error fetching medicos:', error);
        showNotification('Erro ao carregar médicos.', 'error');
      }
    };
    fetchMedicos();
  }, []);

  // Generate time slots when a date and doctor are selected
  useEffect(() => {
    if (selectedDate && selectedMedico) {
      const slots: TimeSlot[] = [];
      const [startHour, startMinute] = selectedMedico.horarioInicio.split(':').map(Number);
      const [endHour, endMinute] = selectedMedico.horarioFim.split(':').map(Number);
      
      let currentTime = new Date();
      currentTime.setHours(startHour, startMinute, 0, 0);

      const endTime = new Date();
      endTime.setHours(endHour, endMinute, 0, 0);

      while (currentTime < endTime) {
        slots.push({ 
          time: currentTime.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }),
          available: true // No futuro, verificar disponibilidade real
        });
        currentTime.setMinutes(currentTime.getMinutes() + 30); // Intervalo de 30 min
      }
      setTimeSlots(slots);
    }
  }, [selectedDate, selectedMedico]);

  const handleMedicoChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const medicoId = Number(e.target.value);
    const medico = medicos.find(m => m.id === medicoId) || null;
    setSelectedMedico(medico);
    setSelectedDate(null); // Reset date on doctor change
    setSelectedTime(null);
    setTimeSlots([]);
  };

  const handleAgendar = async () => {
    if (!user || !selectedMedico || !selectedDate || !selectedTime) {
      showNotification('Por favor, preencha todos os campos.', 'error');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/consultas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          pacienteId: user.id,
          medicoId: selectedMedico.id,
          data: selectedDate,
          hora: selectedTime,
          especialidade: selectedMedico.especialidade,
          observacoes: 'Agendado pelo portal.'
        })
      });

      if (!response.ok) {
        throw new Error('Falha ao agendar consulta.');
      }

      showNotification('Consulta agendada com sucesso!', 'success');
      // Reset form
      setSelectedMedico(null);
      setSelectedDate(null);
      setSelectedTime(null);
      setTimeSlots([]);

    } catch (error: any) {
      showNotification(error.message || 'Erro no agendamento.', 'error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-8">
      <Card className="max-w-4xl mx-auto">
        <CardHeader>
          <CardTitle className="text-3xl">Agendar Consulta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Step 1: Select Doctor */}
          <div>
            <label htmlFor="medico-select" className="block text-lg font-medium text-gray-700 mb-2">1. Selecione o Médico</label>
            <select
              id="medico-select"
              onChange={handleMedicoChange}
              value={selectedMedico?.id || ''}
              className="w-full p-3 border rounded-md bg-gray-50"
            >
              <option value="" disabled>Escolha um especialista</option>
              {medicos.map(m => (
                <option key={m.id} value={m.id}>{m.nome} - {m.especialidade}</option>
              ))}
            </select>
          </div>

          {/* Step 2: Select Date */}
          {selectedMedico && (
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">2. Selecione a Data</label>
              <Calendar 
                selectedDate={selectedDate}
                onDateChange={setSelectedDate}
                availableDates={selectedMedico.diasDisponiveisMes}
              />
            </div>
          )}

          {/* Step 3: Select Time */}
          {selectedDate && (
            <div>
              <label className="block text-lg font-medium text-gray-700 mb-2">3. Selecione o Horário</label>
              <div className="grid grid-cols-4 gap-2">
                {timeSlots.map(slot => (
                  <Button 
                    key={slot.time}
                    variant={selectedTime === slot.time ? 'default' : 'outline'}
                    onClick={() => setSelectedTime(slot.time)}
                    disabled={!slot.available}
                  >
                    {slot.time}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Confirmation */}
          {selectedTime && (
            <div className="pt-6 border-t">
              <h3 className="text-xl font-semibold">Resumo do Agendamento</h3>
              <p><strong>Médico(a):</strong> {selectedMedico?.nome}</p>
              <p><strong>Data:</strong> {selectedDate && new Date(selectedDate + 'T00:00:00').toLocaleDateString('pt-BR')}</p>
              <p><strong>Horário:</strong> {selectedTime}</p>
              <Button onClick={handleAgendar} loading={isLoading} className="mt-4 w-full text-lg">Confirmar Agendamento</Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AgendamentoPage;