import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sun, Moon, HandHeart, Info } from 'lucide-react';

const Navigation: React.FC = () => {
  const location = useLocation();
  const path = location.pathname;
  
  const getLinkClass = (route: string) => {
    const baseClass = "flex flex-col items-center justify-center py-2 px-4 text-sm transition-all";
    const activeClass = "text-emerald-600 dark:text-emerald-400 font-semibold scale-105";
    const inactiveClass = "text-gray-500 dark:text-gray-400 hover:text-emerald-500 dark:hover:text-emerald-400 hover:scale-105";
    
    return `${baseClass} ${path === route ? activeClass : inactiveClass}`;
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-gradient-to-t from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 border-t-2 border-emerald-200 dark:border-gray-700 shadow-2xl z-10">
      <div className="container mx-auto">       <div className="flex justify-around items-center h-16">         <Link to="/" className={getLinkClass('/')} aria-label="Home">           <Home size={22} className="mb-1" />           <span className="text-xs">Beranda</span>         </Link>                  <Link to="/morning" className={getLinkClass('/morning')} aria-label="Morning Dhikr">           <Sun size={22} className="mb-1" />           <span className="text-xs">Pagi</span>         </Link>                  <Link to="/evening" className={getLinkClass('/evening')} aria-label="Evening Dhikr">           <Moon size={22} className="mb-1" />           <span className="text-xs">Petang</span>         </Link>                  <Link to="/after-prayer" className={getLinkClass('/after-prayer')} aria-label="After Prayer Dhikr">           <HandHeart size={22} className="mb-1" />           <span className="text-xs">Shalat</span>         </Link>                  <Link to="/about" className={getLinkClass('/about')} aria-label="About">           <Info size={22} className="mb-1" />           <span className="text-xs">Info</span>         </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
