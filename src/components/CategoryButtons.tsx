import React from 'react';
import { FileText, Zap, LineChart, Settings } from 'lucide-react';

interface CategoryButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

function CategoryButton({ icon, label, onClick }: CategoryButtonProps) {
  return (
    <button
    onClick={onClick}
    className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors">
      {icon}
      <span>{label}</span>
    </button>
  );
}

export function CategoryButtons({action}: {action: (label: string) => void}) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      <CategoryButton
      onClick={() => action('Бизнес-план')}
      icon={<FileText size={20} />} label="Бизнес-план" />
      <CategoryButton
      onClick={() => action('Маркетинг')}
      icon={<Zap size={20} />} label="Маркетинг" />
      <CategoryButton
      onClick={() => action('Анализ рынка')}
      icon={<LineChart size={20} />} label="Анализ рынка" />
      <CategoryButton
      onClick={() => action('Автоматизация')}
      icon={<Settings size={20} />} label="Автоматизация" />
    </div>
  );
}