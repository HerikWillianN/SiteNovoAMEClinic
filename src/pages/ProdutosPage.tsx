
import { motion } from 'framer-motion';

const ProdutosPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="container max-w-7xl mx-auto px-4 py-12"
    >
      <h1 className="text-4xl font-bold text-gray-900 mb-8">Nossos Produtos</h1>
      <p className="text-lg text-gray-700">
        Em breve, você encontrará aqui uma seleção de produtos para cuidar da sua saúde e bem-estar.
      </p>
    </motion.div>
  );
};

export default ProdutosPage;
