import { NavLink } from 'react-router-dom';
import { Button } from '../ui/Button';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm md:hidden" onClick={onClose}>
      <div className="fixed top-0 left-0 h-full w-64 bg-white p-6 shadow-lg" onClick={(e) => e.stopPropagation()}>
        <nav className="flex flex-col space-y-4">
          <NavLink to="/" onClick={onClose}>Home</NavLink>
          <NavLink to="/sobre" onClick={onClose}>Sobre</NavLink>
          <NavLink to="/contato" onClick={onClose}>Contato</NavLink>
          <Button variant="outline">Login</Button>
          <Button>Cadastrar-se</Button>
          <NavLink to="/admin" className="text-xs text-gray-500 hover:text-primary">Acesso Admin</NavLink>
        </nav>
      </div>
    </div>
  );
};

export default MobileMenu;
