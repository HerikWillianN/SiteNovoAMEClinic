
import { motion } from 'framer-motion';

const MedicinaEsportivaPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Medicina Esportiva</h1>
      <p className="text-lg text-gray-700">
        Prevenção e tratamento de lesões, otimização do desempenho e acompanhamento da saúde de atletas.
      </p>
    </motion.div>
  );
};

export default MedicinaEsportivaPage;
