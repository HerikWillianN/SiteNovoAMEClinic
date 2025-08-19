import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { BarChart3, Users, UserCheck, FileText, Settings, Bell, UserCircle, Menu } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useState, useEffect } from 'react';

const API_URL = 'http://localhost:3002';

const AdminLayout = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [patientName, setPatientName] = useState('');

  useEffect(() => {
    const pathnames = location.pathname.split('/').filter(x => x);
    const isPatientHistoryPage = pathnames[1] === 'pacientes' && pathnames[2] === 'historico' && pathnames[3];

    if (isPatientHistoryPage) {
      const patientId = pathnames[3];
      fetch(`${API_URL}/users/${patientId}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.fullName) {
            setPatientName(data.fullName);
          }
        })
        .catch(() => setPatientName('Paciente não encontrado'));
    } else {
      setPatientName('');
    }
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const getBreadcrumbs = () => {
    const pathnames = location.pathname.split('/').filter(x => x);
    return pathnames.map((name, index) => {
      const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
      const isLast = index === pathnames.length - 1;
      let displayName = name;

      if (name === 'historico' && patientName) {
        displayName = 'Histórico';
      } else if (index === 3 && pathnames[2] === 'historico' && patientName) {
        displayName = patientName;
      } else if (name === 'admin') {
        displayName = 'Admin';
      }

      return isLast ? (
        <span key={name} className="text-gray-500 capitalize">{displayName}</span>
      ) : (
        <NavLink key={name} to={routeTo} className="text-primary hover:underline capitalize">{displayName}</NavLink>
      );
    }).reduce((prev, curr, index) => [
      prev, index === 0 ? null : <span key={`separator-${index}`} className="mx-2">/</span>, curr
    ], [] as React.ReactNode[]);
  };

  return (
    <div className="min-h-screen flex bg-gray-100">
      {isSidebarOpen && <div className="fixed inset-0 bg-black opacity-50 z-20 md:hidden" onClick={() => setIsSidebarOpen(false)}></div>}
      {/* Sidebar */}
      <aside className={`bg-gray-800 text-white w-64 p-4 flex-shrink-0 fixed inset-y-0 left-0 z-30 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:relative md:translate-x-0 transition-transform duration-300 ease-in-out`}>
        <div className="flex flex-col items-center space-y-2 bg-gray-700 p-4 rounded-lg justify-center mb-4">
          <img src="/AmeClinicLogo.svg" alt="AMEClinic Logo" className="h-12 w-auto" />
          <h2 className="text-2xl font-bold my-0 text-white">Admin</h2>
        </div>
        <nav className="space-y-2">
          <NavLink to="/admin" end className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-primary' : 'hover:bg-gray-700'}`}>
            <BarChart3 className="mr-2" size={20} /> Dashboard
          </NavLink>
          <NavLink to="/admin/medicos" className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-primary' : 'hover:bg-gray-700'}`}>
            <Users className="mr-2" size={20} /> Médicos
          </NavLink>
          <NavLink to="/admin/pacientes" className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-primary' : 'hover:bg-gray-700'}`}>
            <UserCheck className="mr-2" size={20} /> Pacientes
          </NavLink>
          <NavLink to="/admin/relatorios" className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-primary' : 'hover:bg-gray-700'}`}>
            <FileText className="mr-2" size={20} /> Relatórios
          </NavLink>
          <NavLink to="/admin/settings" className={({ isActive }) => `flex items-center p-2 rounded ${isActive ? 'bg-primary' : 'hover:bg-gray-700'}`}>
            <Settings className="mr-2" size={20} /> Configurações
          </NavLink>
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white shadow p-4 flex justify-between items-center">
          <div className="flex items-center">
            <button className="md:hidden mr-4" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
              <Menu />
            </button>
            <nav className="text-sm font-semibold">
              {getBreadcrumbs()}
            </nav>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm"><Bell size={20} /></Button>
            <div className="flex items-center space-x-2">
              <UserCircle size={24} />
              <span>{user?.name || 'Admin'}</span>
              <Button variant="ghost" size="sm" onClick={handleLogout}>Sair</Button>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
