"use client"

import { useAuth } from "@/components/authProvider";
import { MouseEvent } from "react";

const LOGOUT_URL = "/api/logout/"

export default function Page() {
    const auth = useAuth();

    const handleClick = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: ""
        }
        const response = await fetch(LOGOUT_URL, requestOptions);

        if (response.ok) {
            console.log("logged out");
            auth.logout();
        }
    }

    return (
        <div className="h-[95vh]">
            <div className="max-w-md mx-auto py-5 flex flex-col justify-center items-center">
                <h1>Are you sure you want logout?</h1>
                <button className="bg-red-500 px-3 py-2 text-white hover:bg-red-300" onClick={handleClick}>Yes, logout</button>
            </div>
        </div>
    )
}