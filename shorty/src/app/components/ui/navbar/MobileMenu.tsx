"use client"

import Link from "next/link";
import { useState } from "react";
import { FaChartLine, FaUserCircle } from "react-icons/fa";

const MobileMenu = () => {

    const [isClient] = useState(false);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            {isOpen && isClient && (
                <div className="md:hidden bg-white shadow-lg rounded-b-lg">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link
                            href="/features"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Features
                        </Link>
                        <Link
                            href="/dashboard"
                            className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center"
                            onClick={() => setIsOpen(false)}
                        >
                            <FaChartLine className="mr-2" /> Dashboard
                        </Link>
                        <Link
                            href="/pricing"
                            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
                            onClick={() => setIsOpen(false)}
                        >
                            Pricing
                        </Link>
                        <div className="pt-4 pb-2 border-t border-gray-200">
                            <Link
                                href="/login"
                                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center"
                                onClick={() => setIsOpen(false)}
                            >
                                <FaUserCircle className="mr-2" /> Log In
                            </Link>
                            <Link
                                href="/signup"
                                className="mt-2 block w-full px-3 py-2 rounded-md text-base font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700"
                                onClick={() => setIsOpen(false)}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default MobileMenu