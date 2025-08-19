import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { HeartPulse, Activity, FileText } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/5511987654321'; // Link do WhatsApp da clínica

const exames = [
  {
    id: 'mapa',
    title: 'MAPA 24 horas',
    description: 'A Monitorização Ambulatorial da Pressão Arterial (MAPA) é um exame que mede a pressão arterial a cada 15-30 minutos, durante 24 horas, para avaliar o comportamento da pressão durante as atividades diárias e o sono.',
    icon: <HeartPulse className="h-12 w-12 text-primary" />,
  },
  {
    id: 'holter',
    title: 'Holter 24 horas',
    description: 'O Holter é um monitor portátil que registra continuamente a atividade elétrica do coração por 24 horas ou mais. É essencial para diagnosticar arritmias e outras irregularidades cardíacas que não aparecem em um eletrocardiograma de rotina.',
    icon: <Activity className="h-12 w-12 text-primary" />,
  },
];

const ExamesEDiagnosticosPage = () => {

  const handleAgendarClick = (nomeExame: string) => {
    const message = `Olá! Gostaria de agendar o exame de ${nomeExame}.`;
    const url = `${WHATSAPP_LINK}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto px-4 py-12"
    >
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Exames e Diagnósticos</h1>
        <p className="text-lg text-gray-600 mt-4">
          Oferecemos uma gama completa de exames para um diagnóstico preciso e confiável.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {exames.map((exame, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.2 }}
          >
            <Card className="text-center h-full flex flex-col justify-between transition-all duration-300 hover:shadow-xl hover:border-primary">
              <CardHeader>
                <div className="flex justify-center mb-4">
                  {exame.icon}
                </div>
                <CardTitle className="text-2xl">{exame.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p className="text-gray-700">{exame.description}</p>
              </CardContent>
              <div className="p-6 pt-0">
                <Button onClick={() => handleAgendarClick(exame.title)} className="w-full">
                  Agendar Exame
                </Button>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 bg-gray-50 p-8 rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Outros Exames Disponíveis</h2>
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-4 text-gray-700">
          <li className="flex items-center"><FileText className="mr-2 text-primary" />Eletrocardiograma</li>
          <li className="flex items-center"><FileText className="mr-2 text-primary" />Teste Ergométrico</li>
          <li className="flex items-center"><FileText className="mr-2 text-primary" />Ecocardiograma</li>
          <li className="flex items-center"><FileText className="mr-2 text-primary" />Ultrassonografia</li>
          <li className="flex items-center"><FileText className="mr-2 text-primary" />Raio-X</li>
          <li className="flex items-center"><FileText className="mr-2 text-primary" />Exames Laboratoriais</li>
        </ul>
      </div>
    </motion.div>
  );
};

export default ExamesEDiagnosticosPage;