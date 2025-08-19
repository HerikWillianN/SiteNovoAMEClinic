
import { motion } from 'framer-motion';

const SaudeMulherPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Saúde da Mulher</h1>
      <p className="text-lg text-gray-700">
        Cuidado integral da saúde feminina, incluindo ginecologia, obstetrícia e prevenção de doenças.
      </p>
    </motion.div>
  );
};

export default SaudeMulherPage;
