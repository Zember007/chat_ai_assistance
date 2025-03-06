

export function Header() {
  return (
    <header className="flex justify-end items-center px-6 py-3 bg-gray-900">
      <nav className="flex items-center space-x-6">
        <div className="flex items-center space-x-2">
          <select className="bg-transparent text-gray-400 hover:text-white cursor-pointer outline-none">
            <option value="ru">RU</option>
            <option value="en">EN</option>
          </select>
        </div>
        <button className="px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-700">
          Регистрация
        </button>
        <button className="px-4 py-2 rounded-lg bg-white text-gray-900 hover:bg-gray-100">
          Войти
        </button>
      </nav>
    </header>
  );
}