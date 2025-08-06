'use client';

import { AlertCircle, ArrowRight, RefreshCw } from 'lucide-react';
import { useEffect, useState } from 'react';

interface ErrorClientProps {
  statusCode?: number;
  message?: string;
}

const ErrorClient = ({ statusCode, message }: ErrorClientProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [isRotating, setIsRotating] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleReset = () => {
    setIsRotating(true);
    setTimeout(() => {
      window.location.reload();
      setIsRotating(false);
    }, 600);
  };
  const [currentTime, setCurrentTime] = useState<string>('');

  useEffect(() => {
    setCurrentTime(new Date().toLocaleString());
  }, []);

  return (
    <div
      className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-300 p-6 transition-opacity duration-700 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-8 flex justify-center">
          <div className="relative">
            <div className="absolute inset-0 bg-white opacity-20 rounded-full animate-ping"></div>
            <AlertCircle size={80} className="text-white relative z-10" />
          </div>
        </div>

        <div className="p-8 md:p-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2 text-center">
            Oops! Algo deu errado
          </h2>

          <div className="bg-red-100 border-l-4 border-red-500 p-4 my-4 rounded-lg">
            <p className="text-sm md:text-base text-red-600 font-medium">
              {message || 'Ocorreu um erro inesperado.'}
            </p>
          </div>

          <p className="text-gray-500 mb-8 text-center">
            Não se preocupe, o erro foi registrado e nossa equipe está trabalhando nisso.
          </p>

          <div className="flex flex-col md:flex-row gap-2 justify-center">
            <button
              onClick={handleReset}
              className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
            >
              <RefreshCw size={18} className={`${isRotating ? 'animate-spin' : ''}`} />
              Tentar novamente
            </button>

            <button
              onClick={() => (window.location.href = '/')}
              className="flex items-center justify-center gap-2 px-6 py-3 border border-gray-300 text-gray-800 font-medium rounded-lg hover:bg-gray-100 transition-colors"
            >
              Ir para Home
              <ArrowRight size={18} />
            </button>
          </div>
        </div>

        <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-t border-gray-200">
          <p className="text-sm text-gray-400">Código do erro: {statusCode || 500}</p>
          <p className="text-sm text-gray-400">{currentTime}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorClient;
