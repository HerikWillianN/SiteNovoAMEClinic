
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/Card';
import { Stethoscope, Heart, Activity } from 'lucide-react';

const servicos = [
  {
    title: 'Consultas com Especialistas',
    description: 'Atendimento com diversas especialidades médicas.',
    icon: <Stethoscope className="h-12 w-12 text-primary" />,
    link: '/consultas',
  },
  {
    title: 'Exames e Diagnósticos',
    description: 'Tecnologia de ponta para resultados precisos.',
    icon: <Activity className="h-12 w-12 text-primary" />,
    link: '/exames',
  },
  {
    title: 'Telemedicina',
    description: 'Cuidado médico de qualidade, onde você estiver.',
    icon: <Heart className="h-12 w-12 text-primary" />,
    link: '/telemedicina',
  },
];

const ServicosSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-16 bg-light-gray">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Nossos Serviços</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {servicos.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => navigate(service.link)}
              className="cursor-pointer"
            >
              <Card className="text-center h-full transition-all duration-300 hover:shadow-xl hover:border-primary">
                <CardHeader>
                  {service.icon}
                </CardHeader>
                <CardContent>
                  <CardTitle className="text-xl mb-2">{service.title}</CardTitle>
                  <p className="text-gray-600">{service.description}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicosSection;
