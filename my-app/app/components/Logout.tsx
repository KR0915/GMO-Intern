"use client";

import React from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Logout() {
    const router = useRouter();

    const handleLogout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            router.push("/");
        } catch (error) {
            alert((error as any).message);
        }
    };

    return (
            <button onClick={handleLogout} className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-center" role="menuitem" id="menu-item-2">Logout</button>
    );
}