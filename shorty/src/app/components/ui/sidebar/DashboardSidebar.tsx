"use client";

import { useGetUrlsQuery } from "@/app/hooks/analytics/useGetUrls";
import { useUserStore } from "@/state/store/auth.store";
import { formatDistanceToNow } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaLink } from "react-icons/fa";

const DashboardSidebar = () => {
    const { isLoggedIn, hasHydrated } = useUserStore();
    const router = useRouter();

    useEffect(() => {
        if (!hasHydrated) return;
        if (isLoggedIn == false) {
            alert("dash board sidebar")
            router.push("/auth/login");
        }
    }, [isLoggedIn, router, hasHydrated]);

    const { data, isLoading, error } = useGetUrlsQuery({ enabled: isLoggedIn });

    const urls = data?.data ?? [];

    return (
        <aside className="w-80 bg-white shadow-md border-r border-gray-200 flex flex-col h-screen">
            {/* Header */}
            <div className="p-6 flex flex-col items-center border-b border-gray-200">
                <div className="w-16 h-16 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 font-bold text-xl">
                    <FaLink className="h-6 w-6 text-indigo-600" />
                </div>
            </div>

            {/* URL List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {isLoading ? (
                    <div className="text-sm text-gray-500">Loading links...</div>
                ) : error ? (
                    <div className="text-sm text-red-500">Failed to load links.</div>
                ) : urls.length === 0 ? (
                    <div className="text-sm text-gray-400">No links found.</div>
                ) : (

                    // @ts-ignore
                    urls.map((item: any) => (
                        <Link
                            key={item.id}
                            href={`/dashboard?id=${item.id}`}
                            className="flex gap-3 items-start p-3 rounded-lg hover:bg-gray-100 transition border border-gray-100"
                        >
                            <div className="w-10 h-10 bg-indigo-100 rounded-md flex-shrink-0" />
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">
                                    {item.originalUrl}
                                </p>
                                <p className="text-xs text-gray-500 truncate">
                                    {item.deviceType} •{" "}
                                    {formatDistanceToNow(new Date(item.createdAt), {
                                        addSuffix: true,
                                    })}
                                </p>
                            </div>
                        </Link>
                    ))
                )}
            </div>
        </aside>
    );
};

export default DashboardSidebar;
