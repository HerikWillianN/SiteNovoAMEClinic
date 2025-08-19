import { motion } from 'framer-motion';

const CareersPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container mx-auto px-4 py-16"
    >
      <h1 className="text-4xl font-bold text-center mb-8">Trabalhe Conosco</h1>
      <p className="text-lg text-center text-gray-700">Conteúdo da página Trabalhe Conosco.</p>
    </motion.div>
  );
};

export default CareersPage;