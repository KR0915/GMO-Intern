import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
          <img src="https://manage.conoha.jp/Content/Images/ConoHa/Common/logo.png" alt="Logo" className="h-10 mr-3" />
          <nav className="flex space-x-4">
            <a href="#" className="text-gray-700 hover:text-blue-500 flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5zm2 0v10h12V5H4zm3 2h6v2H7V7zm0 4h6v2H7v-2z" />
              </svg>
              VPS
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 4h16v4H4V4zm0 6h16v4H4v-4zm0 6h16v4H4v-4z" />
                </svg>
                WING
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500 flex items-center">
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 8h-1.81A5.99 5.99 0 0012 2a5.99 5.99 0 00-7.19 6H3a3 3 0 00-3 3v4a3 3 0 003 3h1.5a3 3 0 003 3h9a3 3 0 003-3H21a3 3 0 003-3v-4a3 3 0 00-3-3zM7 15H5v-2h2v2zm4-4H9v-2h2v2zm6 4h-2v-2h2v2zm-4-4h-2v-2h2v2z" />
                </svg>
                GAME
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-500 flex items-center">
              <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
              </svg>
              AI
            </a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;