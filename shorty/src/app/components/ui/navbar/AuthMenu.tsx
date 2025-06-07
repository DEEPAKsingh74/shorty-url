"use client"

import { useUserStore } from '@/state/store/auth.store'
import Link from 'next/link'
import React from 'react'
import { FaUserCircle } from 'react-icons/fa'
import { FiExternalLink } from 'react-icons/fi'

const AuthMenu = () => {

    const { isLoggedIn, logout } = useUserStore();

    return (
        <div className="flex space-x-4 ml-4">
            {
                !isLoggedIn ? (
                    <>
                        <Link
                            href="/auth/login"
                            className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-medium transition-colors flex items-center"
                        >
                            <FaUserCircle className="mr-1" /> Log In
                        </Link>
                        <Link
                            href="/auth/signup"
                            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                        >
                            Sign Up <FiExternalLink className="ml-1" />
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={logout}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
                    >
                        Log Out <FiExternalLink className="ml-1" />
                    </button>

                )
            }
        </div>
    )
}

export default AuthMenu