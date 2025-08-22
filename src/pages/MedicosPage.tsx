import * as React from 'react';
import { useState, useEffect } from 'react';

interface Medico {
  id: number;
  nome: string;
  especialidade: string;
  crm: string;
}

const MedicosPage: React.FC = () => {
  const [medicos, setMedicos] = useState<Medico[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        // A requisição para /api/medicos será redirecionada pelo proxy do Vite
        const response = await fetch('/api/medicos');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
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

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Nossos Médicos</h1>
      {loading ? (
        <p className="text-center">Carregando médicos...</p>
      ) : medicos.length === 0 ? (
        <p className="text-center text-red-500">Não foi possível carregar os médicos. Verifique o console para mais detalhes.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {medicos.map((medico) => (
            <div key={medico.id} className="bg-white shadow-lg rounded-xl p-6 transform hover:scale-105 transition-transform duration-300">
              <h2 className="text-2xl font-bold text-gray-900">{medico.nome}</h2>
              <p className="text-lg text-blue-600 font-semibold mt-2">{medico.especialidade}</p>
              <p className="text-md text-gray-500 mt-4">CRM: {medico.crm}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MedicosPage;
