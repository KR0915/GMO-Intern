"use client";

import React from 'react';
import { supabase } from '@/utils/supabase';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function Account() {
    // const router = useRouter();

    // useEffect(() => {
    //     const checkUser = async () => {
    //         const { data: { session } } = await supabase.auth.getSession();
    //         if (!session) {
    //             router.push('/');
    //         }
    //     };

    // checkUser();

    // }, [router]);

    return (
        <div className="account">
            <h1>Account</h1>
        </div>
    );
}
