import { motion } from 'framer-motion';
import { Button } from '../../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/Card';
import { ShieldCheck, Building, ClipboardList } from 'lucide-react';

const WHATSAPP_LINK = 'https://wa.me/5511987654321'; // Link do WhatsApp da clínica

const SaudeOcupacionalPage = () => {

  const handleContactClick = () => {
    const message = 'Olá! Gostaria de saber mais sobre o PCMSO e os serviços de saúde ocupacional para minha empresa.';
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
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">Saúde Ocupacional</h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          Soluções completas em saúde e segurança para a sua empresa, visando o bem-estar dos colaboradores e o cumprimento das normas regulamentadoras.
        </p>
      </div>

      <Card className="mb-12 transition-all duration-300 hover:shadow-xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <ShieldCheck className="h-16 w-16 text-primary" />
          </div>
          <CardTitle className="text-3xl">Programa de Controle Médico de Saúde Ocupacional (PCMSO)</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-gray-700 mb-8">
            O PCMSO é um programa obrigatório para todas as empresas com funcionários registrados. Nosso objetivo é promover e preservar a saúde dos seus trabalhadores, através de exames médicos específicos para cada função, prevenindo doenças ocupacionais e garantindo um ambiente de trabalho mais seguro e produtivo.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Building className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-semibold">Exames Clínicos</h3>
              <p className="text-gray-600">Admissionais, periódicos, de retorno ao trabalho, de mudança de função e demissionais.</p>
            </div>
            <div className="flex flex-col items-center">
              <ClipboardList className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-semibold">Exames Complementares</h3>
              <p className="text-gray-600">Audiometria, espirometria, exames laboratoriais, avaliação psicossocial e outros, conforme o risco da função.</p>
            </div>
            <div className="flex flex-col items-center">
              <ShieldCheck className="h-10 w-10 text-primary mb-2" />
              <h3 className="text-xl font-semibold">Gestão e Relatórios</h3>
              <p className="text-gray-600">Emissão do ASO (Atestado de Saúde Ocupacional) e Relatório Anual, mantendo sua empresa em conformidade.</p>
            </div>
          </div>
          <div className="text-center mt-10">
            <Button onClick={handleContactClick} size="lg">
              Fale com um Especialista
            </Button>
          </div>
        </CardContent>
      </Card>

    </motion.div>
  );
};

export default SaudeOcupacionalPage;