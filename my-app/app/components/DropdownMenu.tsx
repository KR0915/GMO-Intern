"use client";

import React from 'react';
import { useState } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';

export default function DropdownMenu() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    }

    return (
        <div>
            <button type="button" className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm " id="menu-button" aria-expanded={isOpen} aria-haspopup="true" tabIndex={-1} onClick={toggleMenu}>
                <RiAccountCircleFill></RiAccountCircleFill>
                アカウント名
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button" tabIndex={-1}>
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-0">Profile</div>
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-1">Settings</div>
                    <div className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100" role="menuitem" tabIndex={-1} id="menu-item-2">Logout</div>
                </div>
                </div>
            )}
        </div>
    );
}
