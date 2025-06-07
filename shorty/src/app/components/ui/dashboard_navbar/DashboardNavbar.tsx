"use client"

import { useUserStore } from "@/state/store/auth.store";
import { useRouter } from "next/navigation";
import { useEffect } from "react";


const DashboardNavbar = () => {

    const { user, isLoggedIn, hasHydrated } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        if (!hasHydrated) return;
        if (isLoggedIn == false) {
            alert("dashboard navbar")
            router.replace("/auth/login");
        }
    }, [isLoggedIn, router, hasHydrated]);

    return (
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-200 bg-white">
            <div></div>
            <div className="flex items-center space-x-4">
                <button className="p-2 rounded-full text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none">
                    <svg
                        className="w-6 h-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                        />
                    </svg>
                </button>
                <div className="relative">
                    <button className="flex items-center space-x-2 focus:outline-none">
                        <div className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center text-white font-bold">
                            JD
                        </div>
                        <span className="hidden md:inline text-sm font-medium text-gray-700">
                            {
                                isLoggedIn ? `${user?.name}` : null
                            }
                        </span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DashboardNavbar