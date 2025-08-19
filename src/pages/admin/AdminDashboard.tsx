import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useData } from '../../contexts/DataContext';
import { Users, UserCheck, Calendar, Activity, FileText } from 'lucide-react';
import { ResponsiveContainer, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Bar } from 'recharts';
import { Button } from '../../components/ui/Button';

const AdminDashboard = () => {
  const { pacientes, medicos, consultas, relatorios } = useData();

  const totalPacientes = pacientes.length;
  const medicosAtivos = medicos.filter(m => m.ativo).length;
  const relatoriosGerados = relatorios.length;
  const consultasAgendadas = consultas.filter(c => c.status === 'agendada' || c.status === 'realizada').length;
  const consultasPorEspecialidade = consultas.reduce((acc, c) => {
    acc[c.especialidade] = (acc[c.especialidade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dadosGraficoConsultas = Object.entries(consultasPorEspecialidade).map(([name, total]) => ({ name, total }));

  const [mostrarTodasAtividades, setMostrarTodasAtividades] = useState(false);

  const atividadesRecentes = [
    ...pacientes.map(p => ({ 
      id: p.id,
      data: p.createdAt, 
      descricao: `Novo paciente cadastrado: ${p.fullName}` 
    })),
    ...consultas.map(c => {
      const paciente = pacientes.find(p => p.id === c.pacienteId);
      return {
        id: c.id,
        data: `${c.data}T00:00:00Z`,
        descricao: `Consulta ${c.status.toLowerCase()} para ${paciente?.fullName || 'Paciente não encontrado'}: ${c.especialidade}`
      }
    })
  ]
    .sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

  const atividadesFiltradas = mostrarTodasAtividades
    ? atividadesRecentes.filter(a => new Date(a.data) >= new Date(new Date().setDate(new Date().getDate() - 7)))
    : atividadesRecentes.slice(0, 5);
  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold">Dashboard Administrativo</h2>

      {/* Métricas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total de Pacientes</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPacientes}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Médicos Ativos</CardTitle>
            <UserCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{medicosAtivos}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatórios Gerados</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{relatoriosGerados}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Consultas do Mês</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{consultasAgendadas}</div>
            <p className="text-xs text-muted-foreground"></p>
          </CardContent>
        </Card>
      </div>

      {/* Gráficos e Atividades Recentes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader><CardTitle>Visão Geral de Consultas</CardTitle></CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dadosGraficoConsultas} margin={{ top: 5, right: 20, left: 10, bottom: 60 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" interval={0} angle={-45} textAnchor="end" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [value, 'Consultas']} />
                  <Bar dataKey="total" fill="#8884d8" name="Consultas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Atividades Recentes</CardTitle></CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {atividadesFiltradas.map(atividade => (
                <li key={atividade.id} className="flex items-center justify-between text-sm">
                  <span>{atividade.descricao}</span>
                  <span className="text-gray-500">
                    {new Date(atividade.data).toLocaleDateString('pt-BR', { timeZone: 'UTC' })}
                  </span>
                </li>
              ))}
            </ul>
            {atividadesRecentes.length > 5 && (
              <Button onClick={() => setMostrarTodasAtividades(!mostrarTodasAtividades)} className="mt-4 w-full">
                {mostrarTodasAtividades ? 'Ver menos' : 'Ver mais'}
              </Button>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Atalhos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <Button className="h-24">Adicionar Novo Médico</Button>
        <Button className="h-24">Ver Relatórios</Button>
        <Button className="h-24">Gerenciar Usuários</Button>
      </div>
    </div>
  );
};

export default AdminDashboard;