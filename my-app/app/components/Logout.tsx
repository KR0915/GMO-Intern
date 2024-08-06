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
            router.push("/404");
        } catch (error) {
            alert((error as any).message);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <button onClick={handleLogout} className="w-full px-4 py-2 bg-[#12B8D7] rounded-lg">Logout</button>
                </div>
            </div>
        </div>
    );
}