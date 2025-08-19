
import { motion } from 'framer-motion';

const MedicinaPreventivaPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Medicina Preventiva</h1>
      <p className="text-lg text-gray-700">
        Foco na prevenção de doenças e na promoção da saúde para uma vida mais longa e saudável.
      </p>
    </motion.div>
  );
};

export default MedicinaPreventivaPage;
