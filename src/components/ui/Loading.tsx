import * as React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-white bg-opacity-90 flex flex-col items-center justify-center z-50">
      <div className="animate-pulse">
        <img src="/AMEClinic.svg" alt="Logo da Clínica" className="w-32 h-32 mb-4" />
      </div>
      <p className="text-lg font-semibold text-gray-700">Carregando...</p>
    </div>
  );
};

export default Loading;