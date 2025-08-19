export interface Endereco {
  cep: string;
  rua: string;
  numero: string;
  complemento?: string;
  cidade: string;
  estado: string;
}

export interface Convenio {
  nome: string;
  numeroCarteirinha: string;
}

export interface ContatoEmergencia {
  nome: string;
  telefone: string;
}

export interface User {
  id: string;
  email: string;
  type: 'paciente' | 'admin';
  createdAt: string;
  name?: string;
}

export interface Paciente extends User {
  nome: string;
  fullName?: string;
  cpf: string;
  dataNascimento: string;
  telefone: string;
  endereco: Endereco;
  convenio?: Convenio;
  contatoEmergencia: ContatoEmergencia;
  medicalNotes?: string;
  termsAccepted?: boolean;
  privacyAccepted?: boolean;
}

export interface Medico {
  id: string;
  nome: string;
  crm: string;
  especialidade: string;
  telefone: string;
  email: string;
  biografia?: string;
  fotoUrl?: string;
  diasAtendimento?: string[];
  diasDisponiveisMes?: string[];
  horarioInicio?: string;
  horarioFim?: string;
  ativo: boolean;
}

export interface Notification {
  id: string;
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface Consulta {
  id: string;
  pacienteId: string;
  medicoId: string;
  data: string;
  hora: string;
  especialidade: string;
  status: 'agendada' | 'realizada' | 'cancelada';
  motivo?: string;
  observacoes?: string;
}

export interface HorarioDisponivel {
  id: string;
  medicoId: string;
  data: string;
  hora: string;
  disponivel: boolean;
}

export interface Relatorio {
  id: string;
  tipo: string;
  dataGeracao: string;
  conteudo: any;
}

export interface Configuracao {
  id: string;
  nome: string;
  valor: any;
}