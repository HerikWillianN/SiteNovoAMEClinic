
import { motion } from 'framer-motion';

const CheckupExecutivoPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Check-up Executivo</h1>
      <p className="text-lg text-gray-700">
        Um programa completo para a avaliação da sua saúde, focado na prevenção e diagnóstico precoce de doenças. Ideal para quem tem uma rotina agitada e precisa de cuidados eficientes.
      </p>
    </motion.div>
  );
};

export default CheckupExecutivoPage;
