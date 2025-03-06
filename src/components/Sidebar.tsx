import React from 'react';
import { Users, Lightbulb, Star, Briefcase } from 'lucide-react';

interface NavItemProps {
  icon: React.ReactNode;
  label: string;
  isActive?: boolean;
}

function NavItem({ icon, label, isActive }: NavItemProps) {
  return (
    <a 
      href="#" 
      className={`flex items-center space-x-3 px-4 py-2 rounded-lg transition-colors ${
        isActive ? 'bg-gray-800' : 'hover:bg-gray-800'
      }`}
    >
      {icon}
      <span>{label}</span>
    </a>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-gray-400 p-4 flex justify-between flex-col">
      <img src="/Logo.svg" alt="logo" />
      <nav className="space-y-1">
        <NavItem icon={<Users size={20} />} label="AI Сотрудники" isActive />
        <NavItem icon={<Lightbulb size={20} />} label="Готовые решения" />
        <NavItem icon={<Star size={20} />} label="Эксперты" />
        <NavItem icon={<Briefcase size={20} />} label="Услуги" />
      </nav>
      <div className="pt-4 border-t border-gray-800">
        <div className="space-y-2">
          <a href="#" className="block text-sm hover:text-white">Контакты</a>
          <a href="#" className="block text-sm hover:text-white">Центр помощи</a>
        </div>
        <div className="flex space-x-4 mt-4">
          <a href="#" className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z" />
            </svg>
          </a>
          <a href="#" className="text-gray-400 hover:text-white">
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
              <path d="M22.05 1.577c-.393-.016-.784.08-1.117.235-.484.186-4.92 1.902-9.41 3.64-2.26.873-4.518 1.746-6.256 2.415-1.737.67-3.045 1.168-3.114 1.192-.46.16-1.082.362-1.61.984-.133.155-.267.354-.335.628s-.038.622.095.895c.265.547.714.773 1.244.976 1.76.564 3.58 1.102 5.087 1.608.556 1.96 1.09 3.927 1.618 5.89.174.394.553.54.944.544l-.002.02s.307.03.606-.042c.3-.07.677-.244 1.02-.565.377-.354 1.4-1.36 1.98-1.928l4.37 3.226.035.02s.484.34 1.192.388c.354.024.82-.044 1.22-.337.403-.294.67-.767.795-1.307.374-1.63 2.853-13.427 3.276-15.38l-.012.046c.296-1.1.187-2.108-.496-2.705-.342-.297-.736-.427-1.13-.444zm-.118 1.874c.027.025.025.025.002.027-.007-.002.08.118-.09.755l-.007.024-.005.022c-.432 1.997-2.936 13.9-3.27 15.356-.046.196-.065.182-.054.17-.1-.015-.285-.094-.3-.1l-7.48-5.525c2.562-2.467 5.182-4.7 7.827-7.08.468-.235.39-.96-.17-.972-.594.14-1.095.567-1.64.84-3.132 1.858-6.332 3.492-9.43 5.406-1.59-.553-3.177-1.012-4.767-1.57.2-.075 1.353-.552 2.967-1.178 1.66-.65 3.743-1.465 5.872-2.294 4.42-1.715 8.828-3.42 9.28-3.594.106-.041.003-.045.002-.044z" />
            </svg>
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-4">Copyright © 2025 Dimpulse Tech Limited</p>
      </div>
    </aside>
  );
}