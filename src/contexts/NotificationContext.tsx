import * as React from 'react';
import { createContext, useState, useContext, useCallback, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Info, AlertTriangle, X } from 'lucide-react';
import type { Notification } from '../types';
import Loading from '../components/ui/Loading';

interface NotificationContextType {
  showNotification: (message: string, type?: Notification['type'], duration?: number) => void;
  showLoading: () => void;
  hideLoading: () => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const showNotification = useCallback((message: string, type: Notification['type'] = 'info', duration: number = 3000) => {
    const id = Math.random().toString(36).substring(2, 9);
    const newNotification: Notification = { id, message, type };
    setNotifications((prev) => [...prev, newNotification]);

    if (duration > 0) {
      setTimeout(() => {
        setNotifications((prev) => prev.filter((n) => n.id !== id));
      }, duration);
    }
  }, []);

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const showLoading = useCallback(() => setIsLoading(true), []);
  const hideLoading = useCallback(() => setIsLoading(false), []);

  const getIcon = (type: Notification['type']) => {
    switch (type) {
      case 'success': return <CheckCircle className="text-green-500" />;
      case 'error': return <XCircle className="text-red-500" />;
      case 'warning': return <AlertTriangle className="text-yellow-500" />;
      case 'info': return <Info className="text-blue-500" />;
      default: return null;
    }
  };

  return (
    <NotificationContext.Provider value={{ showNotification, showLoading, hideLoading }}>
      {children}
      {isLoading && <Loading />}
      {createPortal(
        <div className="fixed top-4 right-4 z-50 space-y-2 w-full max-w-sm">
          <AnimatePresence>
            {notifications.map((notification) => (
              <motion.div
                key={notification.id}
                initial={{ opacity: 0, x: 300 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 300 }}
                className={`flex items-center p-4 rounded-md shadow-lg text-white
                  ${notification.type === 'success' ? 'bg-green-600' : ''}
                  ${notification.type === 'error' ? 'bg-red-600' : ''}
                  ${notification.type === 'warning' ? 'bg-yellow-600' : ''}
                  ${notification.type === 'info' ? 'bg-blue-600' : ''}
                `}
              >
                <div className="mr-3">{getIcon(notification.type)}</div>
                <div className="flex-1">{notification.message}</div>
                <button onClick={() => removeNotification(notification.id)} className="ml-3 text-white opacity-75 hover:opacity-100">
                  <X size={18} />
                </button>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>,
        document.body
      )}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

export { NotificationProvider };
