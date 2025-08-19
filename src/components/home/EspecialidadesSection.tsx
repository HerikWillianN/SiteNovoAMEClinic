
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle } from '../ui/Card';
import { Brain, Heart, Bone } from 'lucide-react';

const especialidades = [
  {
    name: 'Cardiologia',
    icon: <Heart className="h-12 w-12 text-primary" />,
  },
  {
    name: 'Anestesiologia',
    icon: <Brain className="h-12 w-12 text-primary" />,
  },
  {
    name: 'Angiologia',
    icon: <Bone className="h-12 w-12 text-primary" />,
  },
];

const EspecialidadesSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-16 bg-white">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Especialidades em Destaque</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {especialidades.map((especialidade, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => navigate('/consultas')}
              className="cursor-pointer"
            >
              <Card className="text-center p-6 transition-all duration-300 hover:shadow-xl hover:border-primary">
                <CardContent className="flex flex-col items-center justify-center">
                  {especialidade.icon}
                  <CardTitle className="text-xl mt-4">{especialidade.name}</CardTitle>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EspecialidadesSection;
