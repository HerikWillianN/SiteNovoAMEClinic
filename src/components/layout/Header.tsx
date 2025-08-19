
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, X, ChevronDown } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useModalContext } from './MainLayout';

const NavItem = ({ children, to, hasSubmenu, onClick }) => (
  <NavLink
    to={to}
    onClick={onClick}
    className={({ isActive }) =>
      `flex items-center transition-colors ${isActive ? 'text-primary font-semibold' : 'text-gray-600 hover:text-primary'}`
    }
  >
    {children}
    {hasSubmenu && <ChevronDown size={16} className="ml-1" />}
  </NavLink>
);

const SubMenu = ({ items, closeMenu }) => (
  <div className="absolute top-full left-0 mt-2 w-56 bg-white shadow-lg rounded-md ring-1 ring-black ring-opacity-5">
    <div className="py-1">
      {items.map((item) => (
        item.path ? (
          <NavLink
            key={item.name}
            to={item.path}
            onClick={closeMenu}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
          >
            {item.name}
          </NavLink>
        ) : (
          <button
            key={item.name}
            onClick={() => { item.onClick(); closeMenu(); }}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary text-left w-full"
          >
            {item.name}
          </button>
        )
      ))
    }
    </div>
  </div>
);

const Header = ({ openLoginModal, openRegisterModal }) => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState(null);
  const { isAuthenticated } = useAuth();

  const handleSubmenu = (name) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const closeMenus = () => {
    setMobileMenuOpen(false);
    setOpenSubmenu(null);
  };

  const servicosSubmenu = [
    { name: 'Consultas com Especialistas', path: '/consultas' },
    { name: 'Exames e Diagnósticos', path: '/exames' },
    { name: 'Telemedicina', path: '/telemedicina' },
  ];

  const exploreSubmenu = [
    { name: 'Empresas', path: '/empresas' },
    { name: 'Eventos', path: '/eventos' },
    { name: 'Novidades', path: '/novidades' },
    { name: 'Produtos', path: '/produtos' },
  ];

  const programasSubmenu = [
    { name: 'Check-up Executivo', path: '/programas/check-up-executivo' },
    { name: 'Saúde do Homem', path: '/programas/saude-do-homem' },
    { name: 'Saúde Infantil', path: '/programas/saude-infantil' },
    { name: 'Saúde da Mulher', path: '/programas/saude-da-mulher' },
    { name: 'Medicina Preventiva', path: '/programas/medicina-preventiva' },
    { name: 'Doenças Raras', path: '/programas/doencas-raras' },
    { name: 'Medicina Geriátrica', path: '/programas/medicina-geriatrica' },
    { name: 'Medicina Esportiva', path: '/programas/medicina-esportiva' },
    { name: 'Saúde Ocupacional', path: '/programas/saude-ocupacional' },
    { name: 'Convênios Médicos', path: '/programas/convenios-medicos' },
  ];

  const institucionalSubmenu = [
    { name: 'Trabalhe Conosco', path: '/trabalhe-conosco' },
    { name: 'Responsabilidade Social', path: '/responsabilidade-social' },
    { name: 'Governança Corporativa', path: '/governanca-corporativa' },
    { name: 'Relacionamento com Investidores', path: '/relacionamento-investidores' },
    { name: 'Política de Privacidade', path: '/politica-privacidade' },
    { name: 'Política de Cookies', path: '/politica-cookies' },
    { name: 'Termos e Condições de Uso', path: '/termos-uso' },
    { name: 'Notas Legais', path: '/notas-legais' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container max-w-7xl mx-auto px-4 flex h-20 items-center justify-between">
        <NavLink to="/" className="flex items-center space-x-2 text-2xl font-bold text-primary">
          <img src="/AmeClinicLogo.svg" alt="AMEClinic Logo" className="h-12 w-auto" />
        </NavLink>
        
        {/* Desktop Menu */}
        <nav className="hidden md:flex items-center space-x-8">
          <NavItem to="/">Home</NavItem>
          <NavItem to="/sobre">Sobre</NavItem>
          
          <div className="relative" onMouseEnter={() => handleSubmenu('servicos')} onMouseLeave={() => handleSubmenu(null)}>
            <NavItem to="#" hasSubmenu>Serviços</NavItem>
            {openSubmenu === 'servicos' && <SubMenu items={servicosSubmenu} closeMenu={closeMenus} />}
          </div>

          <div className="relative" onMouseEnter={() => handleSubmenu('explore')} onMouseLeave={() => handleSubmenu(null)}>
            <NavItem to="#" hasSubmenu>Explore</NavItem>
            {openSubmenu === 'explore' && <SubMenu items={exploreSubmenu} closeMenu={closeMenus} />}
          </div>

          <div className="relative" onMouseEnter={() => handleSubmenu('programas')} onMouseLeave={() => handleSubmenu(null)}>
            <NavItem to="#" hasSubmenu>Programas</NavItem>
            {openSubmenu === 'programas' && <SubMenu items={programasSubmenu} closeMenu={closeMenus} />}
          </div>

          <div className="relative" onMouseEnter={() => handleSubmenu('institucional')} onMouseLeave={() => handleSubmenu(null)}>
            <NavItem to="#" hasSubmenu>Institucional</NavItem>
            {openSubmenu === 'institucional' && <SubMenu items={institucionalSubmenu} closeMenu={closeMenus} />}
          </div>

          <NavItem to="/contato">Contato</NavItem>
          {isAuthenticated ? (
            <NavItem to="/dashboard">Minha Conta</NavItem>
          ) : (
            <div className="relative" onMouseEnter={() => handleSubmenu('minhaConta')} onMouseLeave={() => handleSubmenu(null)}>
              <NavItem to="#" hasSubmenu>Minha Conta</NavItem>
              {openSubmenu === 'minhaConta' && (
                <SubMenu items={[
                  { name: 'Login', onClick: openLoginModal },
                  { name: 'Cadastre-se', onClick: openRegisterModal }
                ]} closeMenu={closeMenus} />
              )}
            </div>
          )}
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-600 hover:text-primary">
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <nav className="flex flex-col space-y-4 p-6">
            <NavLink to="/" onClick={closeMenus} className="text-gray-700 hover:text-primary">Home</NavLink>
            <NavLink to="/sobre" onClick={closeMenus} className="text-gray-700 hover:text-primary">Sobre</NavLink>
            
            {/* Serviços in Mobile */}
            <div className="text-gray-700">Serviços</div>
            <div className="flex flex-col space-y-2 pl-4">
              {servicosSubmenu.map(item => <NavLink key={item.name} to={item.path} onClick={closeMenus} className="text-gray-600 hover:text-primary">{item.name}</NavLink>)}
            </div>

            {/* Explore in Mobile */}
            <div className="text-gray-700">Explore</div>
            <div className="flex flex-col space-y-2 pl-4">
              {exploreSubmenu.map(item => <NavLink key={item.name} to={item.path} onClick={closeMenus} className="text-gray-600 hover:text-primary">{item.name}</NavLink>)}
            </div>

            {/* Programas in Mobile */}
            <div className="text-gray-700">Programas</div>
            <div className="flex flex-col space-y-2 pl-4">
              {programasSubmenu.map(item => <NavLink key={item.name} to={item.path} onClick={closeMenus} className="text-gray-600 hover:text-primary">{item.name}</NavLink>)}
            </div>

            {/* Institucional in Mobile */}
            <div className="text-gray-700">Institucional</div>
            <div className="flex flex-col space-y-2 pl-4">
              {institucionalSubmenu.map(item => <NavLink key={item.name} to={item.path} onClick={closeMenus} className="text-gray-600 hover:text-primary">{item.name}</NavLink>)}
            </div>

            <NavLink to="/contato" onClick={closeMenus} className="text-gray-700 hover:text-primary">Contato</NavLink>
            {isAuthenticated ? (
              <NavLink to="/dashboard" onClick={closeMenus} className="text-gray-700 hover:text-primary">Minha Conta</NavLink>
            ) : (
              <>
                <button onClick={() => { openLoginModal(); closeMenus(); }} className="text-gray-700 hover:text-primary text-left w-full p-2">Login</button>
                <button onClick={() => { openRegisterModal(); closeMenus(); }} className="text-gray-700 hover:text-primary text-left w-full p-2">Cadastre-se</button>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
