import React from 'react';
import Image from 'next/image';

interface MenuItem {
  icon: string;
  label: string;
}

export default function Header () {
  return (
    <header className="bg-white shadow-md">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <div className="flex items-center">
        <Image src="/images/conoHa.png" alt="Logo" width={125} height={38} className="h-10 mr-3" />
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
                <path d="M13 2a7 7 0 00-7 7v1H5a3 3 0 00-3 3v4a3 3 0 003 3h10a3 3 0 003-3v-4a3 3 0 00-3-3h-1V9a7 7 0 00-7-7zm-1 14H8v-2h4v2zm0-4H8v-2h4v2z" />
              </svg>
              AI
            </a>
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          <a href="#" className="text-gray-700 hover:text-blue-500 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M11 2a1 1 0 00-1 1v14a1 1 0 001 1h2a1 1 0 001-1V3a1 1 0 00-1-1h-2zM4 8a1 1 0 00-1 1v2a1 1 0 001 1h1v2a1 1 0 001 1h1v-8H6a1 1 0 00-1 1v2H4V9a1 1 0 00-1-1H4z" />
            </svg>
            お知らせ
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 4a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2H4a2 2 0 01-2-2V4zm2 0v.01L10 9l6-4.99V4H4zm0 2.01V16h12V6.01L10 11 4 6.01z" />
          </svg>
            お問い合わせ
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M8.5 2a6.5 6.5 0 00-6.5 6.5v1a6.5 6.5 0 0013 0v-1a6.5 6.5 0 00-6.5-6.5zm0 2a4.5 4.5 0 014.5 4.5v1a4.5 4.5 0 01-9 0v-1a4.5 4.5 0 014.5-4.5zm0 9a2.5 2.5 0 100-5 2.5 2.5 0 000 5z" />
            </svg>
            ヘルプ
          </a>
          <a href="#" className="text-gray-700 hover:text-blue-500 flex items-center">
            <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
            </svg>
            アカウント名
          </a>
        </div>
      </div>
    </header>
  );
};
