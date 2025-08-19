import { Outlet, useOutletContext } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useModal } from '../../hooks/useModal';
import LoginModal from '../forms/LoginModal';
import RegisterModal from '../forms/RegisterModal';
import AdminLoginModal from '../forms/AdminLoginModal';

type ModalContextType = {
  openLoginModal: () => void;
  openRegisterModal: () => void;
};

const MainLayout = () => {
  const { isOpen: isLoginOpen, open: openLogin, close: closeLogin } = useModal();
  const { isOpen: isRegisterOpen, open: openRegister, close: closeRegister } = useModal();
  const { isOpen: isAdminOpen, close: closeAdmin } = useModal();

  const switchToRegister = () => {
    closeLogin();
    openRegister();
  };

  const switchToLogin = () => {
    closeRegister();
    openLogin();
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header openLoginModal={openLogin} openRegisterModal={openRegister} />
      <main className="flex-grow">
        <Outlet context={{ openLoginModal: openLogin, openRegisterModal: openRegister }} />
      </main>
      <Footer />
      <LoginModal isOpen={isLoginOpen} onClose={closeLogin} onSwitchToRegister={switchToRegister} />
      <RegisterModal isOpen={isRegisterOpen} onClose={closeRegister} onSwitchToLogin={switchToLogin} />
      <AdminLoginModal isOpen={isAdminOpen} onClose={closeAdmin} />
    </div>
  );
};

export const useModalContext = () => useOutletContext<ModalContextType>();

export default MainLayout;
