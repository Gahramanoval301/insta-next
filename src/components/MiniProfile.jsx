"use client"
import { useSession, signIn, signOut } from "next-auth/react"
import React from 'react'

export default function MiniProfile() {
    const { data: session } = useSession()
    return (
        <div className="flex items-center justify-between mt-14 ml-0 xl:ml-10 w-80 xl:w-full ">
            <img src={session?.user?.image || '/800px-Instagram_logo_2016.webp'}
                className="w-16 h-16 rounded-full p-[2px]"
                alt="user profile pic or insta logo" />
            <div className="flex-1 ml-4">
                <h2 className="font-bold">{session?.user?.username}</h2>
                <h3 className="text-sm text-gray-400">Welcome to Instagram</h3>
            </div>
            {session ? (
                <button onClick={signOut}
                    className="text-blue-500 text-sm font-semibold"
                >
                    Sign Out
                </button>
            ) : (
                <button onClick={signIn}
                    className="text-blue-500 text-sm font-semibold"
                >
                    Sign In
                </button>)
            }

        </div>
    )
}
