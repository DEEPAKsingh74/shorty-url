"use client"

import { useUserStore } from "@/state/store/auth.store"
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const Logout = () => {

    const { logout } = useUserStore();
    const router = useRouter();
    useEffect(() => {
        logout();
        router.prefetch('/auth/login');
        router.replace('/auth/login');
    }, [logout, router]);
    return (
        <div></div>
    )
}

export default Logout