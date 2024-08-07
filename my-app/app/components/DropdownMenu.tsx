"use client";

import React, { useEffect } from 'react';
import { useState } from 'react';
import { RiAccountCircleFill } from 'react-icons/ri';
import Logout from './Logout';
import { DropdownButton } from './icon/DropdownButton';

export default function DropdownMenu() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
      setIsOpen(!isOpen);
    }

    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
      const storedEmail = localStorage.getItem("userEmail");
      setEmail(storedEmail);
    }, []);

    return (
        <div>
            <button
                type="button"
                className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm"
                id="menu-button"
                aria-expanded={isOpen}
                aria-haspopup="true"
                tabIndex={-1}
                onClick={toggleMenu}
            >
                <RiAccountCircleFill className='mt-1' />
                {email && (
                    <p className="flex items-center">
                        <span>{email}</span> <DropdownButton />
                    </p>
                )}
            </button>

            {isOpen && (
                <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="menu-button">
                        <Logout />
                    </div>
                </div>
            )}
        </div>
    );
}
