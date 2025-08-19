
import { motion } from 'framer-motion';

const ConveniosMedicosPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Convênios Médicos</h1>
      <p className="text-lg text-gray-700">
        Consulte a lista de convênios que atendemos e os planos disponíveis para você e sua família.
      </p>
    </motion.div>
  );
};

export default ConveniosMedicosPage;
