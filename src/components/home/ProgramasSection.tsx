
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardTitle } from '../ui/Card';
import { Heart, User, Baby, ShieldCheck } from 'lucide-react';

const programas = [
  {
    name: 'Saúde da Mulher',
    icon: <Heart className="h-12 w-12 text-primary" />,
    link: '/programas/saude-da-mulher',
  },
  {
    name: 'Saúde do Homem',
    icon: <User className="h-12 w-12 text-primary" />,
    link: '/programas/saude-do-homem',
  },
  {
    name: 'Saúde Infantil',
    icon: <Baby className="h-12 w-12 text-primary" />,
    link: '/programas/saude-infantil',
  },
  {
    name: 'Check-up Executivo',
    icon: <ShieldCheck className="h-12 w-12 text-primary" />,
    link: '/programas/check-up-executivo',
  },
];

const ProgramasSection = () => {
  const navigate = useNavigate();

  return (
    <section className="w-full py-16 bg-light-gray">
      <div className="container max-w-7xl mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">Nossos Programas de Cuidado</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {programas.map((programa, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              onClick={() => navigate(programa.link)}
              className="cursor-pointer"
            >
              <Card className="text-center p-6 h-full transition-all duration-300 hover:shadow-xl hover:border-primary">
                <CardContent className="flex flex-col items-center justify-center">
                  {programa.icon}
                  <CardTitle className="text-xl mt-4">{programa.name}</CardTitle>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProgramasSection;
