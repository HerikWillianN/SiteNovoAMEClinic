import { motion } from 'framer-motion';
import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import { Card } from '../components/ui/Card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const ContactPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Hero Section */}
      <section className="w-full bg-gradient-to-r from-primary to-secondary text-white py-20 text-center">
        <div className="container max-w-7xl mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Fale Conosco</h1>
          <p className="text-lg md:text-xl font-light">Estamos prontos para te atender e tirar todas as suas dúvidas.</p>
        </div>
      </section>

      <div className="w-full py-16 bg-light-gray">
        <div className="container max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Formulário de Contato */}
          <Card className="p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Envie uma Mensagem</h2>
            <form className="space-y-6">
              <Input label="Nome" placeholder="Seu nome completo" />
              <Input label="Email" type="email" placeholder="seu@email.com" />
              <Input label="Telefone" placeholder="(XX) XXXXX-XXXX" />
              <textarea className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary" rows={5} placeholder="Sua mensagem"></textarea>
              <Button type="submit" variant="accent" size="lg">Enviar Mensagem</Button>
            </form>
          </Card>

          {/* Informações de Contato */}
          <div className="space-y-8">
            <Card className="p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Nossos Contatos</h2>
              <div className="space-y-4 text-gray-600">
                <p className="flex items-center"><MapPin className="mr-4 text-primary" size={24} /> Rua Fictícia, 123, Bairro dos Sonhos</p>
                <p className="flex items-center"><Phone className="mr-4 text-primary" size={24} /> <a href="tel:+551112345678" className="hover:underline">(11) 1234-5678</a></p>
                <p className="flex items-center"><Mail className="mr-4 text-primary" size={24} /> <a href="mailto:contato@ameclinic.com" className="hover:underline">contato@ameclinic.com</a></p>
                <p className="flex items-center"><Clock className="mr-4 text-primary" size={24} /> Seg a Sex: 8h-18h | Sáb: 8h-12h</p>
              </div>
            </Card>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-xl">
              <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3847.6464400917716!2d-42.624470699999996!3d-15.341437599999997!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x751d7ee94b17d2f%3A0x1d26fac0bffd1a88!2sAME%20Clinic%20Santo%20Ant%C3%B4nio%20do%20Retiro!5e0!3m2!1spt-BR!2sbr!4v1754367570905!5m2!1spt-BR!2sbr" width="100%" height="100%" style={{ border: 0 }} allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ContactPage;