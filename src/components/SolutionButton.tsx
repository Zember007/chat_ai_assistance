import React from 'react';
import { User } from 'lucide-react';
import { sendMessage } from '../services/api';

export function SolutionButton() {
  const [isLoading, setIsLoading] = React.useState(false);

  const handleGetSolution = async () => {
    setIsLoading(true);
    try {
      await sendMessage('Получить решение');
    } catch (error) {
      console.error('Error getting solution:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button 
      className={`flex items-center mx-auto space-x-2 px-6 py-3 bg-white text-gray-900 rounded-lg hover:bg-gray-100 transition-colors ${
        isLoading ? 'opacity-50 cursor-not-allowed' : ''
      }`}
      onClick={handleGetSolution}
      disabled={isLoading}
    >
      <User size={20} />
      <span className="font-medium">Получить решения</span>
    </button>
  );
}