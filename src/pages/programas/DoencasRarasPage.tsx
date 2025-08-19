
import { motion } from 'framer-motion';

const DoencasRarasPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Doenças Raras</h1>
      <p className="text-lg text-gray-700">
        Diagnóstico, tratamento e acompanhamento de doenças raras com equipe multidisciplinar especializada.
      </p>
    </motion.div>
  );
};

export default DoencasRarasPage;
