import { Facebook, Instagram } from 'lucide-react';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronDown } from 'lucide-react';

const Footer = () => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="container max-w-7xl mx-auto py-12 px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-2xl font-bold mb-4">AMEClinic</h3>
          <p className="text-gray-400 leading-relaxed">Cuidando da sua saúde com excelência e tecnologia de ponta.</p>
        </div>
        <div>
          <div className="relative">
            <h3 className="text-lg font-semibold mb-4 cursor-pointer" onClick={() => toggleDropdown('principal')}>
              Navegação Principal <ChevronDown size={16} className="inline-block ml-1 transform transition-transform duration-200" style={{ transform: openDropdown === 'principal' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </h3>
            {openDropdown === 'principal' && (
              <ul className="space-y-2 mb-4">
                <li><NavLink to="/" className="hover:text-blue-400 transition-colors">Home</NavLink></li>
                <li><NavLink to="/sobre" className="hover:text-blue-400 transition-colors">Sobre</NavLink></li>
                <li><NavLink to="/contato" className="hover:text-blue-400 transition-colors">Contato</NavLink></li>
              </ul>
            )}
          </div>

          <div className="relative">
            <h3 className="text-lg font-semibold mb-4 cursor-pointer" onClick={() => toggleDropdown('servicos')}>
              Serviços <ChevronDown size={16} className="inline-block ml-1 transform transition-transform duration-200" style={{ transform: openDropdown === 'servicos' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </h3>
            {openDropdown === 'servicos' && (
              <ul className="space-y-2 mb-4">
                <li><NavLink to="/consultas" className="hover:text-blue-400 transition-colors">Consultas com Especialistas</NavLink></li>
                <li><NavLink to="/exames" className="hover:text-blue-400 transition-colors">Exames e Diagnósticos</NavLink></li>
                <li><NavLink to="/telemedicina" className="hover:text-blue-400 transition-colors">Telemedicina</NavLink></li>
              </ul>
            )}
          </div>

          <div className="relative">
            <h3 className="text-lg font-semibold mb-4 cursor-pointer" onClick={() => toggleDropdown('explore')}>
              Explore <ChevronDown size={16} className="inline-block ml-1 transform transition-transform duration-200" style={{ transform: openDropdown === 'explore' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </h3>
            {openDropdown === 'explore' && (
              <ul className="space-y-2 mb-4">
                <li><NavLink to="/empresas" className="hover:text-blue-400 transition-colors">Empresas</NavLink></li>
                <li><NavLink to="/eventos" className="hover:text-blue-400 transition-colors">Eventos</NavLink></li>
                <li><NavLink to="/novidades" className="hover:text-blue-400 transition-colors">Novidades</NavLink></li>
                <li><NavLink to="/produtos" className="hover:text-blue-400 transition-colors">Produtos</NavLink></li>
              </ul>
            )}
          </div>

          <div className="relative">
            <h3 className="text-lg font-semibold mb-4 cursor-pointer" onClick={() => toggleDropdown('programas')}>
              Programas <ChevronDown size={16} className="inline-block ml-1 transform transition-transform duration-200" style={{ transform: openDropdown === 'programas' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </h3>
            {openDropdown === 'programas' && (
              <ul className="space-y-2 mb-4">
                <li><NavLink to="/programas/check-up-executivo" className="hover:text-blue-400 transition-colors">Check-up Executivo</NavLink></li>
                <li><NavLink to="/programas/saude-do-homem" className="hover:text-blue-400 transition-colors">Saúde do Homem</NavLink></li>
                <li><NavLink to="/programas/saude-infantil" className="hover:text-blue-400 transition-colors">Saúde Infantil</NavLink></li>
                <li><NavLink to="/programas/saude-da-mulher" className="hover:text-blue-400 transition-colors">Saúde da Mulher</NavLink></li>
                <li><NavLink to="/programas/medicina-preventiva" className="hover:text-blue-400 transition-colors">Medicina Preventiva</NavLink></li>
                <li><NavLink to="/programas/doencas-raras" className="hover:text-blue-400 transition-colors">Doenças Raras</NavLink></li>
                <li><NavLink to="/programas/medicina-geriatrica" className="hover:text-blue-400 transition-colors">Medicina Geriátrica</NavLink></li>
                <li><NavLink to="/programas/medicina-esportiva" className="hover:text-blue-400 transition-colors">Medicina Esportiva</NavLink></li>
                <li><NavLink to="/programas/saude-ocupacional" className="hover:text-blue-400 transition-colors">Saúde Ocupacional</NavLink></li>
                <li><NavLink to="/programas/convenios-medicos" className="hover:text-blue-400 transition-colors">Convênios Médicos</NavLink></li>
              </ul>
            )}
          </div>

          <div className="relative">
            <h3 className="text-lg font-semibold mb-4 cursor-pointer" onClick={() => toggleDropdown('institucional')}>
              Institucional <ChevronDown size={16} className="inline-block ml-1 transform transition-transform duration-200" style={{ transform: openDropdown === 'institucional' ? 'rotate(180deg)' : 'rotate(0deg)' }} />
            </h3>
            {openDropdown === 'institucional' && (
              <ul className="space-y-2">
                <li><NavLink to="/trabalhe-conosco" className="hover:text-blue-400 transition-colors">Trabalhe Conosco</NavLink></li>
                <li><NavLink to="/responsabilidade-social" className="hover:text-blue-400 transition-colors">Responsabilidade Social</NavLink></li>
                <li><NavLink to="/governanca-corporativa" className="hover:text-blue-400 transition-colors">Governança Corporativa</NavLink></li>
                <li><NavLink to="/relacionamento-investidores" className="hover:text-blue-400 transition-colors">Relacionamento com Investidores</NavLink></li>
              </ul>
            )}
          </div>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Políticas</h3>
          <ul className="space-y-2">
            <li><NavLink to="/politica-privacidade" className="hover:text-blue-400 transition-colors">Política de Privacidade</NavLink></li>
            <li><NavLink to="/politica-cookies" className="hover:text-blue-400 transition-colors">Política de Cookies</NavLink></li>
            <li><NavLink to="/termos-uso" className="hover:text-blue-400 transition-colors">Termos e Condições de Uso</NavLink></li>
            <li><NavLink to="/notas-legais" className="hover:text-blue-400 transition-colors">Notas Legais</NavLink></li>
          </ul>
        </div>
        <div>
          <h3 className="text-lg font-semibold mb-4">Contato</h3>
          <p className="text-gray-400">Rua Fictícia, 123</p>
          <p className="text-gray-400">Cidade Imaginária, EP</p>
          <p className="text-gray-400 mt-2">contato@ameclinic.com</p>
          <p className="text-gray-400">(11) 1234-5678</p>
          <h3 className="text-lg font-semibold mb-4 mt-6">Siga-nos</h3>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Facebook /></a>
            <a href="#" className="text-gray-400 hover:text-blue-400 transition-colors"><Instagram /></a>
            <a href="https://wa.me/5511987654321" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-blue-400 transition-colors">{/* Insert WhatsApp SVG here */}</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-6 text-center">
        <p className="text-gray-500">&copy; 2025 AMEClinic. Todos os direitos reservados.</p>
      </div>
    </footer>
  );
};

export default Footer;
