"use client"

import { useAuth } from "@/components/authProvider";
import { FormEvent } from "react";

const LOGIN_URL = "/api/login/"


export default function Page() {
    const auth = useAuth();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(event, event.target);

        const form = event.target as HTMLFormElement
        const formData = new FormData(form);
        const objectFromForm = Object.fromEntries(formData);
        const jsonData = JSON.stringify(objectFromForm);
        
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: jsonData
        }
        const response = await fetch(LOGIN_URL, requestOptions);
        const rData = response.json();
        console.log(rData);

        if (response.ok) {
            console.log("logged in");
            auth.login();
        }
    }


    return (
        <div className="h-[95vh]">
            <div className="max-w-md mx-auto py-5 flex flex-col justify-center items-center">
                <h1>Login</h1>
                <form onSubmit={handleSubmit} className="flex flex-col w-10/12 m-5 gap-5">
                    <input type="text" name="username" placeholder="Your Username" required className="text-lime-500 bg-slate-500"/>
                    <input type="password" name="password" placeholder="Your Password" required className="text-lime-500 bg-slate-500"/>
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    )
}