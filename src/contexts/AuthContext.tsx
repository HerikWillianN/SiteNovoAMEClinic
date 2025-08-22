import * as React from 'react';
import { createContext, useState, useContext, useEffect, type ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import type { User, Paciente, Endereco, Convenio, ContatoEmergencia } from '../types/index.ts';
import { useNotification } from './NotificationContext';

interface AuthContextType {
  user: User | Paciente | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  userType: 'paciente' | 'admin' | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  register: (userData: any) => Promise<void>;
  updateProfile: (data: Partial<User | Paciente>) => Promise<void>;
  deleteAccount: () => Promise<void>;
  updatePassword: (userId: string, currentPass: string, newPass: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_URL = 'http://localhost:3002';

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | Paciente | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [userType, setUserType] = useState<'paciente' | 'admin' | null>(null);
  const navigate = useNavigate();
  const { showLoading, hideLoading } = useNotification();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    const storedUserType = localStorage.getItem('userType');
    if (storedUser && storedUserType) {
      setUser(JSON.parse(storedUser));
      setUserType(storedUserType as 'paciente' | 'admin');
    }
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    showLoading();
    
    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Credenciais inválidas');
      }

      const userData = await response.json();
      const userType = userData.type;

      // A API agora retorna todos os dados necessários.
      // A lógica de estruturar o objeto foi simplificada.
      setUser(userData);
      setUserType(userType);
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('userType', userType);

      if (userType === 'admin') {
        navigate('/admin');
      } else {
        navigate('/dashboard');
      }

    } catch (error) {
      console.error('Erro no login:', error);
      throw error;
    } finally {
      setIsLoading(false);
      hideLoading();
    }
  };

  const logout = () => {
    showLoading();
    setUser(null);
    setUserType(null);
    localStorage.removeItem('user');
    localStorage.removeItem('userType');
    navigate('/');
    hideLoading();
  };

  const register = async (userData: any) => {
    setIsLoading(true);
    showLoading();
    
    try {
      const response = await fetch('/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Erro ao cadastrar usuário');
      }
      
      const createdUser = await response.json();
      console.log('Usuário cadastrado com sucesso:', createdUser);
      
    } catch (error) {
      console.error('Erro no registro:', error);
      throw error;
    } finally {
      setIsLoading(false);
      hideLoading();
    }
  };

  const updateProfile = async (data: Partial<User | Paciente>) => {
    setIsLoading(true);
    showLoading();
    
    try {
      if (!user) {
        throw new Error('Usuário não está logado');
      }

      // Se for admin, apenas atualizar localmente (como estava antes)
      if (userType === 'admin') {
        const updatedUser = { ...user, ...data };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return;
      }

      // Se for paciente, atualizar no JSON Server
      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...user, ...data })
      });

      if (!response.ok) {
        throw new Error('Erro ao atualizar perfil');
      }

      const updatedUserData = await response.json();
      
      // Se for um Paciente, manter a estrutura correta
      if (userType === 'paciente' && 'nome' in user) {
        const updatedPaciente: Paciente = {
          ...user,
          ...data,
          id: updatedUserData.id.toString(),
          createdAt: updatedUserData.createdAt,
        };
        setUser(updatedPaciente);
        localStorage.setItem('user', JSON.stringify(updatedPaciente));
      } else {
        const updatedUser: User = {
          ...user,
          ...data,
          id: updatedUserData.id.toString(),
          createdAt: updatedUserData.createdAt,
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
      }

    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      throw error;
    } finally {
      setIsLoading(false);
      hideLoading();
    }
  };

  const deleteAccount = async () => {
    setIsLoading(true);
    showLoading();
    
    try {
      if (!user) {
        throw new Error('Usuário não está logado');
      }

      if (userType === 'admin') {
        throw new Error('A conta de administrador não pode ser excluída por aqui.');
      }

      const response = await fetch(`${API_URL}/users/${user.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Erro ao excluir a conta');
      }

      logout();
      
    } catch (error) {
      console.error('Erro ao excluir conta:', error);
      throw error;
    } finally {
      setIsLoading(false);
      hideLoading();
    }
  };

  const updatePassword = async (userId: string, currentPass: string, newPass: string) => {
    setIsLoading(true);
    showLoading();

    try {
      const response = await fetch(`${API_URL}/users/${userId}`);
      const user = await response.json();

      if (!response.ok || user.password !== currentPass) {
        throw new Error('Senha atual incorreta.');
      }

      const updateResponse = await fetch(`${API_URL}/users/${userId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ password: newPass }),
      });

      if (!updateResponse.ok) {
        throw new Error('Erro ao atualizar a senha.');
      }

      showNotification('Senha atualizada com sucesso!', 'success');

    } catch (error: any) {
      console.error('Erro ao atualizar senha:', error);
      throw error;
    } finally {
      setIsLoading(false);
      hideLoading();
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      isAuthenticated: !!user, 
      isLoading, 
      userType, 
      login, 
      logout, 
      register, 
      updateProfile, 
      deleteAccount, 
      updatePassword 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};