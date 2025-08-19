import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../components/ui/Card';
import { Award, Heart, Stethoscope } from 'lucide-react';
import { useData } from '../contexts/DataContext';

const AboutPage = () => {
  const { medicos } = useData();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary text-white py-20 text-center">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Nossa Missão: Cuidar de Você</h1>
          <p className="text-lg md:text-xl font-light">Dedicados a oferecer um atendimento médico de excelência, com foco na saúde integral e no bem-estar de cada paciente.</p>
        </div>
      </section>

      '''      {/* Nossa História */}
      <section className="w-full py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Nossa História</h2>
          <p className="text-lg text-center text-gray-700 max-w-3xl mx-auto">Fundada em 2010, a AMEClinic nasceu do sonho de criar um centro de saúde que aliasse tecnologia de ponta a um atendimento verdadeiramente humano. Ao longo dos anos, expandimos nossas especialidades e investimos constantemente em inovação para oferecer o melhor cuidado aos nossos pacientes. Hoje, somos referência em diversas áreas e continuamos comprometidos com a sua saúde e bem-estar.</p>
        </div>
      </section>

      {/* Linha do Tempo */}
      <section className="w-full py-16 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-20">Nossa Trajetória</h2>
          <div className="relative wrap overflow-hidden p-10 h-full">
            <div className="border-2-2 absolute border-opacity-20 border-primary h-full border" style={{left: '50%'}}></div>
            {/* right timeline */}
            <div className="mb-8 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">1</h1>
              </div>
              <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gray-800 text-xl">2010 - Fundação</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">A AMEClinic é fundada com a missão de oferecer um atendimento médico de qualidade e acessível.</p>
              </div>
            </div>

            {/* left timeline */}
            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">2</h1>
              </div>
              <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gray-800 text-xl">2014 - Expansão</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Expandimos nossas instalações e adicionamos novas especialidades para melhor atender nossos pacientes.</p>
              </div>
            </div>
            
            {/* right timeline */}
            <div className="mb-8 flex justify-between items-center w-full right-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto font-semibold text-lg text-white">3</h1>
              </div>
              <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gray-800 text-xl">2018 - Inovação</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Implementamos o prontuário eletrônico e investimos em tecnologia de ponta para diagnósticos mais precisos.</p>
              </div>
            </div>

            {/* left timeline */}
            <div className="mb-8 flex justify-between flex-row-reverse items-center w-full left-timeline">
              <div className="order-1 w-5/12"></div>
              <div className="z-20 flex items-center order-1 bg-primary shadow-xl w-8 h-8 rounded-full">
                <h1 className="mx-auto text-white font-semibold text-lg">4</h1>
              </div>
              <div className="order-1 bg-white rounded-lg shadow-xl w-5/12 px-6 py-4">
                <h3 className="mb-3 font-bold text-gray-800 text-xl">2022 - Reconhecimento</h3>
                <p className="text-sm leading-snug tracking-wide text-gray-900 text-opacity-100">Recebemos a certificação de excelência em atendimento, um marco em nossa história de compromisso com a saúde.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Corpo Clínico */}''
      <section className="w-full py-16 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Conheça Nosso Corpo Clínico</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {medicos.map((medico) => (
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
        </div>
      </section>

      {/* Valores e Diferenciais */}
      <section className="w-full py-16 bg-white">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Nossos Valores</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardHeader><Heart className="h-16 w-16 text-primary mx-auto mb-4" /></CardHeader>
              <CardContent>
                <CardTitle>Humanização</CardTitle>
                <CardDescription>Atendimento focado no paciente, com empatia e respeito.</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader><Award className="h-16 w-16 text-primary mx-auto mb-4" /></CardHeader>
              <CardContent>
                <CardTitle>Excelência</CardTitle>
                <CardDescription>Padrões de qualidade rigorosos em todos os nossos serviços.</CardDescription>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardHeader><Stethoscope className="h-16 w-16 text-primary mx-auto mb-4" /></CardHeader>
              <CardContent>
                <CardTitle>Inovação</CardTitle>
                <CardDescription>Tecnologia de ponta a serviço da sua saúde e bem-estar.</CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Nossa Estrutura */}
      <section className="w-full py-16 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Nossa Estrutura</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Recepção da clínica" className="rounded-lg shadow-lg" />
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Consultório médico" className="rounded-lg shadow-lg" />
            <img src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" alt="Equipamento médico" className="rounded-lg shadow-lg" />
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default AboutPage;