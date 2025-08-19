
import { motion } from 'framer-motion';

const SaudeInfantilPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Saúde Infantil</h1>
      <p className="text-lg text-gray-700">
        Acompanhamento completo do desenvolvimento e da saúde das crianças, da neonatologia à adolescência.
      </p>
    </motion.div>
  );
};

export default SaudeInfantilPage;
