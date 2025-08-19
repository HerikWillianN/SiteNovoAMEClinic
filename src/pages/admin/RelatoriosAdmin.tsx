import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { useData } from '../../contexts/DataContext';
import { ResponsiveContainer, BarChart, LineChart, PieChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend, Bar, Line, Pie, Cell } from 'recharts';

const RelatoriosAdmin = () => {
  const { consultas, pacientes } = useData();

  const consultasUltimoMes = consultas.filter(c => {
    const dataConsulta = new Date(c.data);
    const hoje = new Date();
    const ultimoMes = new Date(hoje.getFullYear(), hoje.getMonth() - 1, hoje.getDate());
    return dataConsulta >= ultimoMes;
  }).length;

  const novosPacientesEsteAno = pacientes.filter(p => {
    const dataCadastro = new Date(p.createdAt);
    const hoje = new Date();
    return dataCadastro.getFullYear() === hoje.getFullYear();
  }).length;

  const especialidadesMaisProcuradas = consultas.reduce((acc, c) => {
    acc[c.especialidade] = (acc[c.especialidade] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topEspecialidades = Object.entries(especialidadesMaisProcuradas)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const pacientesPorMes = pacientes.reduce((acc, p) => {
    const mes = new Date(p.createdAt).toLocaleString('default', { month: 'long' });
    acc[mes] = (acc[mes] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const dadosCrescimentoPacientes = Object.entries(pacientesPorMes).map(([name, novosPacientes]) => ({ name, novosPacientes }));

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold mb-6">Relatórios e Análises</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Relatório de Consultas</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{consultasUltimoMes}</p>
            <p className="text-xs text-muted-foreground">Consultas realizadas no último mês</p>
            <div className="mt-4 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={[{name: 'Consultas', total: consultasUltimoMes}]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [value, 'Consultas']} />
                  <Bar dataKey="total" fill="#8884d8" name="Consultas" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Crescimento de Pacientes</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">+{novosPacientesEsteAno}</p>
            <p className="text-xs text-muted-foreground">Novos pacientes este ano</p>
            <div className="mt-4 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={dadosCrescimentoPacientes}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip formatter={(value: number) => [value, 'Novos Pacientes']} />
                  <Line type="monotone" dataKey="novosPacientes" stroke="#82ca9d" name="Novos Pacientes" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Distribuição por Especialidade</CardTitle>
            <PieChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{topEspecialidades.length}</p>
            <p className="text-xs text-muted-foreground">Especialidades mais procuradas</p>
            <div className="mt-4 h-40">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={topEspecialidades.map(([name, consultas]) => ({ name, consultas }))} dataKey="consultas" nameKey="name" cx="50%" cy="50%" outerRadius={50} fill="#8884d8">
                    {topEspecialidades.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF'][index % 5]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => [value, 'Consultas']} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Relatórios Detalhados</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside space-y-2">
            <li>Relatório de Agendamentos por Período</li>
            <li>Relatório Financeiro Mensal</li>
            <li>Relatório de Desempenho de Médicos</li>
            <li>Relatório de Satisfação do Paciente</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default RelatoriosAdmin;