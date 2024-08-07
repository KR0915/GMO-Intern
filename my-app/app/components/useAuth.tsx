// hooks/useAuth.ts
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/utils/supabase";

const LOGIN_PAGE_URL = '/login';

export const useAuth = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                router.push(LOGIN_PAGE_URL);
            } else {
                setIsAuthenticated(true);
            }
        };
        checkUser();
    }, [router]);

    return isAuthenticated;
};