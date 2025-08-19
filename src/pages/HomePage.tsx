import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Award, Heart, Stethoscope, Users, Calendar, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useModalContext } from '../components/layout/MainLayout';
import { useData } from '../contexts/DataContext';
import { useState } from 'react';
import ServicosSection from '../components/home/ServicosSection';
import EspecialidadesSection from '../components/home/EspecialidadesSection';
import ProgramasSection from '../components/home/ProgramasSection';

const HomePage = () => {
  const { isAuthenticated } = useAuth();
  const { openLoginModal, openRegisterModal } = useModalContext();
  const navigate = useNavigate();
  const { medicos } = useData();
  const [mostrarTodosMedicos, setMostrarTodosMedicos] = useState(false);

  const handleAgendeClick = () => {
    if (isAuthenticated) {
      navigate('/dashboard');
    } else {
      openLoginModal();
    }
  };

  const medicosParaExibir = mostrarTodosMedicos ? medicos : medicos.slice(0, 3);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary text-white text-center py-24">
        <div className="container max-w-7xl mx-auto px-4">
          <motion.h1 
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            Cuidando da sua saúde com excelência e humanidade
          </motion.h1>
          <motion.p 
            className="text-xl md:text-2xl font-light mb-8"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Na AMEClinic, unimos tecnologia de ponta e atendimento humanizado para oferecer a melhor experiência em cuidados de saúde.
          </motion.p>
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button variant="accent" size="lg" onClick={handleAgendeClick}>Agende sua consulta</Button>
          </motion.div>
        </div>
      </section>

      {/* Seção de Serviços */}
      <ServicosSection />

      {/* Seção de Especialidades */}
      <EspecialidadesSection />

      {/* Seção de Programas */}
      <ProgramasSection />

      

      {/* Por Que Escolher a AMEClinic? - Novo Layout */}
      <section className="w-full py-16 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4 space-y-16">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Por que escolher a AMEClinic?</h2>

          {/* Bloco 1: Imagem Esquerda, Texto Direita */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Corpo Clínico Qualificado" className="rounded-lg shadow-lg w-full h-auto" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <Award className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Corpo Clínico Qualificado</h3>
              <p className="text-lg text-gray-700">Nossa equipe é composta por profissionais altamente qualificados e experientes, dedicados a oferecer o melhor cuidado e as soluções mais eficazes para a sua saúde.</p>
            </div>
          </div>

          {/* Bloco 2: Imagem Direita, Texto Esquerda */}
          <div className="flex flex-col md:flex-row-reverse items-center gap-8">
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Agendamento Fácil" className="rounded-lg shadow-lg w-full h-auto" />
            </div>
            <div className="md:w-1/2 text-center md:text-right">
              <Calendar className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Agendamento Fácil</h3>
              <p className="text-lg text-gray-700">Marque suas consultas de forma rápida e prática pelo nosso portal online, com total comodidade e segurança, a qualquer hora e em qualquer lugar.</p>
            </div>
          </div>

          {/* Bloco 3: Imagem Esquerda, Texto Direita */}
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Atendimento Humanizado" className="rounded-lg shadow-lg w-full h-auto" />
            </div>
            <div className="md:w-1/2 text-center md:text-left">
              <Heart className="h-16 w-16 text-primary mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-gray-900 mb-4 text-center">Atendimento Humanizado</h3>
              <p className="text-lg text-gray-700">Na AMEClinic, você é mais que um paciente. Oferecemos um cuidado individualizado, com empatia e respeito, para que você se sinta acolhido e seguro.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Seção de Médicos */}
      <section className="w-full py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Conheça nossos especialistas</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicosParaExibir.map((medico) => (
              <Card key={medico.id} className="text-center transition-all duration-300 hover:shadow-xl">
                <CardHeader>
                  <img src={medico.fotoUrl} alt={`Foto de ${medico.nome}`} className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-gray-200" />
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-lg">{medico.nome}</CardTitle>
                  <p className="text-primary font-medium">{medico.especialidade}</p>
                  <p className="text-sm text-gray-500 mt-1">CRM {medico.crm}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="text-center mt-12">
            <Button variant="secondary" onClick={() => setMostrarTodosMedicos(!mostrarTodosMedicos)}>
              {mostrarTodosMedicos ? 'Ver menos' : 'Ver todos os médicos'}
            </Button>
          </div>
        </div>
      </section>

      {/* Depoimentos */}
      <section className="w-full py-16 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">O que nossos pacientes dizem</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card className="p-6">
              <p className="text-gray-700 mb-4">"Fui muito bem atendido na AMEClinic. A equipe é muito atenciosa e os médicos são excelentes. Recomendo a todos!"</p>
              <p className="font-bold text-gray-900">- João Silva</p>
            </Card>
            <Card className="p-6">
              <p className="text-gray-700 mb-4">"A estrutura da clínica é ótima e o atendimento é de primeira. Me senti muito segura e bem cuidada durante todo o tratamento."</p>
              <p className="font-bold text-gray-900">- Maria Oliveira</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Call-to-Action Final */}
      <section className="w-full py-20 bg-primary text-white text-center">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold mb-4">Pronto para cuidar da sua saúde?</h2>
          <p className="mb-8 text-lg font-light">Agende sua consulta ou crie sua conta para ter acesso ao nosso portal do paciente.</p>
          <div className="space-x-4">
            <Button variant="secondary" onClick={openLoginModal}>Login</Button>
            <Button variant="accent" onClick={openRegisterModal}>Cadastrar-se</Button>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default HomePage;