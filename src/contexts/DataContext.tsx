import { createContext, useState, useContext, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Medico, Paciente, Consulta, Relatorio } from '../types';

interface DataContextType {
  medicos: Medico[];
  pacientes: Paciente[];
  consultas: Consulta[];
  relatorios: Relatorio[];
  fetchMedicos: () => Promise<void>;
  fetchPacientes: () => Promise<void>;
  fetchConsultas: () => Promise<void>;
  fetchRelatorios: () => Promise<void>;
  addMedico: (medico: Omit<Medico, 'id'>) => void;
  updateMedico: (medico: Medico) => void;
  deleteMedico: (id: string) => void;
  addPaciente: (paciente: Paciente) => void;
  updatePaciente: (paciente: Paciente) => void;
  deletePaciente: (id: string) => void;
  addConsulta: (consulta: Omit<Consulta, 'id'>) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

const API_URL = 'http://localhost:3002';

export const DataProvider = ({ children }: { children: ReactNode }) => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [pacientes, setPacientes] = useState<Paciente[]>([]);
  const [consultas, setConsultas] = useState<Consulta[]>([]);
  const [relatorios, setRelatorios] = useState<Relatorio[]>([]);

  const fetchMedicos = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/medicos`);
      const data = await response.json();
      setMedicos(data);
    } catch (error) {
      console.error('Erro ao buscar médicos:', error);
    }
  }, []);

  const fetchPacientes = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/users?type=paciente`);
      const data = await response.json();
      setPacientes(data);
    } catch (error) {
      console.error('Erro ao buscar pacientes:', error);
    }
  }, []);

  const fetchConsultas = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/consultas`);
      const data = await response.json();
      setConsultas(data);
    } catch (error) {
      console.error('Erro ao buscar consultas:', error);
    }
  }, []);

  const fetchRelatorios = useCallback(async () => {
    try {
      const response = await fetch(`${API_URL}/relatorios`);
      const data = await response.json();
      setRelatorios(data);
    } catch (error) {
      console.error('Erro ao buscar relatórios:', error);
    }
  }, []);

  useEffect(() => {
    fetchMedicos();
    fetchPacientes();
    fetchConsultas();
    fetchRelatorios();
  }, [fetchMedicos, fetchPacientes, fetchConsultas, fetchRelatorios]);

  const addMedico = useCallback(async (medico: Omit<Medico, 'id'>) => {
    try {
      const response = await fetch(`${API_URL}/medicos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...medico, id: new Date().toISOString() }),
      });
      const novoMedico = await response.json();
      setMedicos((prev) => [...prev, novoMedico]);
    } catch (error) {
      console.error('Erro ao adicionar médico:', error);
    }
  }, []);

  const updateMedico = useCallback(async (updatedMedico: Medico) => {
    try {
      const response = await fetch(`${API_URL}/medicos/${updatedMedico.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedMedico),
      });
      const data = await response.json();
      setMedicos((prev) => prev.map((m) => (m.id === data.id ? data : m)));
    } catch (error) {
      console.error('Erro ao atualizar médico:', error);
    }
  }, []);

  const deleteMedico = useCallback(async (id: string) => {
    try {
      await fetch(`${API_URL}/medicos/${id}`, { method: 'DELETE' });
      setMedicos((prev) => prev.filter((m) => m.id !== id));
    } catch (error) {
      console.error('Erro ao deletar médico:', error);
    }
  }, []);

  const addPaciente = useCallback((paciente: Paciente) => {
    setPacientes((prev) => [...prev, { ...paciente, id: String(prev.length + 1) }]);
  }, []);

  const updatePaciente = useCallback((updatedPaciente: Paciente) => {
    setPacientes((prev) => prev.map((p) => (p.id === updatedPaciente.id ? updatedPaciente : p)));
  }, []);

  const deletePaciente = useCallback((id: string) => {
    setPacientes((prev) => prev.filter((p) => p.id !== id));
  }, []);

  const addConsulta = useCallback(async (consulta: Omit<Consulta, 'id'>) => {
    try {
      const newConsulta: Consulta = { ...consulta, id: new Date().toISOString() };
      // Ensure default status if not provided
      if (!('status' in newConsulta)) {
        (newConsulta as any).status = 'agendada';
      }
      const response = await fetch(`${API_URL}/consultas`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newConsulta),
      });
      const saved = await response.json();
      setConsultas((prev) => [...prev, saved]);
    } catch (error) {
      console.error('Erro ao adicionar consulta:', error);
      throw error;
    }
  }, []);

  return (
    <DataContext.Provider value={{
      medicos,
      pacientes,
      consultas,
      relatorios,
      fetchMedicos,
      fetchPacientes,
      fetchConsultas,
      fetchRelatorios,
      addMedico,
      updateMedico,
      deleteMedico,
      addPaciente,
      updatePaciente,
      deletePaciente,
      addConsulta
    }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
