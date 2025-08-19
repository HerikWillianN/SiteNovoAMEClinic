import { Outlet, NavLink } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Button } from '../ui/Button';
import { useState } from 'react';
import { Menu, User, Settings, LogOut } from 'lucide-react';

const DashboardLayout = () => {
  const { user, logout } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar for Desktop */}
      <aside className="w-64 bg-gray-800 text-white p-4 hidden md:block">
        <div className="flex items-center space-x-2 bg-gray-700 p-4 rounded-lg justify-center mb-4">
          <img src="/AmeClinicLogo.svg" alt="AMEClinic Logo" className="h-12 w-auto" />
        </div>
        <nav className="flex flex-col space-y-2">
          <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'bg-primary p-2 rounded' : 'p-2 hover:bg-gray-700 rounded'}>Dashboard</NavLink>
          <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? 'bg-primary p-2 rounded' : 'p-2 hover:bg-gray-700 rounded'}>Meu Perfil</NavLink>
          <NavLink to="/dashboard/history" className={({ isActive }) => isActive ? 'bg-primary p-2 rounded' : 'p-2 hover:bg-gray-700 rounded'}>Histórico</NavLink>
          <NavLink to="/dashboard/payment-methods" className={({ isActive }) => isActive ? 'bg-primary p-2 rounded' : 'p-2 hover:bg-gray-700 rounded'}>Formas de Pagamento</NavLink>
          <NavLink to="/dashboard/invoices" className={({ isActive }) => isActive ? 'bg-primary p-2 rounded' : 'p-2 hover:bg-gray-700 rounded'}>Faturas Médicas</NavLink>
        </nav>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <button className="md:hidden" onClick={toggleMobileMenu}>
            <Menu />
          </button>
          <h1 className="text-xl">Olá, {user?.name}</h1>
          <div className="relative">
            <Button variant="ghost" onClick={toggleDropdown}>
              <User className="mr-2" /> {user?.name}
            </Button>
            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <NavLink to="/dashboard/profile" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleDropdown}><User className="inline-block mr-2 h-4 w-4" /> Perfil</NavLink>
                <NavLink to="/dashboard/settings" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" onClick={toggleDropdown}><Settings className="inline-block mr-2 h-4 w-4" /> Configurações</NavLink>
                <button onClick={() => { logout(); toggleDropdown(); }} className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"><LogOut className="inline-block mr-2 h-4 w-4" /> Sair</button>
              </div>
            )}
          </div>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-gray-800 text-white p-4">
            <nav className="flex flex-col space-y-2">
              <NavLink to="/dashboard" end className={({ isActive }) => isActive ? 'bg-primary p-2 rounded' : 'p-2 hover:bg-gray-700 rounded'} onClick={toggleMobileMenu}>Dashboard</NavLink>
              <NavLink to="/dashboard/profile" className={({ isActive }) => isActive ? 'bg-primary p-2 rounded' : 'p-2 hover:bg-gray-700 rounded'} onClick={toggleMobileMenu}>Meu Perfil</NavLink>
              <NavLink to="/dashboard/history" className={({ isActive }) => isActive ? 'bg-primary p-2 rounded' : 'p-2 hover:bg-gray-700 rounded'} onClick={toggleMobileMenu}>Histórico</NavLink>
              <NavLink to="/dashboard/payment-methods" className={({ isActive }) => isActive ? 'bg-primary p-2 rounded' : 'p-2 hover:bg-gray-700 rounded'} onClick={toggleMobileMenu}>Formas de Pagamento</NavLink>
              <NavLink to="/dashboard/invoices" className={({ isActive }) => isActive ? 'bg-primary p-2 rounded' : 'p-2 hover:bg-gray-700 rounded'} onClick={toggleMobileMenu}>Faturas Médicas</NavLink>
              <button onClick={() => { logout(); toggleMobileMenu(); }} className="w-full text-left p-2 hover:bg-gray-700 rounded">Sair</button>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="flex-grow p-8 bg-gray-100">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
