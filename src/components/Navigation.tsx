import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sun, Moon, Info } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const getLinkClass = (route: string) => {
    const baseClass = "flex flex-col items-center justify-center py-2 px-4 text-sm";
    const activeClass = "text-emerald-600 dark:text-emerald-400 font-medium";
    const inactiveClass = "text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400";
    
    return `${baseClass} ${path === route ? activeClass : inactiveClass}`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-10">
      <div className="container mx-auto">
        <div className="flex justify-around items-center h-16">
          <Link to="/" className={getLinkClass('/')} aria-label="Home">
            <Home size={20} className="mb-1" />
            <span>Beranda</span>
          </Link>
          
          <Link to="/morning" className={getLinkClass('/morning')} aria-label="Morning Dhikr">
            <Sun size={20} className="mb-1" />
            <span>Pagi</span>
          </Link>
          
          <Link to="/evening" className={getLinkClass('/evening')} aria-label="Evening Dhikr">
            <Moon size={20} className="mb-1" />
            <span>Petang</span>
          </Link>
          
          <Link to="/about" className={getLinkClass('/about')} aria-label="About">
            <Info size={20} className="mb-1" />
            <span>Info</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
