"use client";

import React from 'react';
import { useState } from 'react';

export default function DropdownMenu() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    }

    return (
        <div>
            <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50" id="menu-button" aria-expanded={isOpen} aria-haspopup="true" tabIndex={-1} onClick={toggleMenu}>
                <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v2h2v-2zm0-8H9v6h2V5z" />
                </svg>
                アカウント名
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">Profile</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Settings</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-2">Logout</a>
                </div>
                </div>
            )}
        </div>
    );
}
