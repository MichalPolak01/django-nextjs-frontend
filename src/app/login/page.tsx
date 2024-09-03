"use client"

import Link from "next/link"
import { useAuth } from "@/components/authProvider";
import { FormEvent } from "react";

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


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

        interface LoginResponse {
            username?: string
        }
        let data: LoginResponse = {};

        try {
            data = await response.json();
        } catch (error) {
            
        }

        if (response.ok) {
            console.log("logged in");
            auth.login(data?.username);
        }
    }

  return (
    <div className="flex justify-center items-center min-h-[90vh]">
        <Card className="mx-auto max-w-sm">
        <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
                Enter your username and password below to login to your account
            </CardDescription>
        </CardHeader>
        <CardContent>
            <form onSubmit={handleSubmit}>
            <div className="grid gap-4">
            <div className="grid gap-2">
                <Label htmlFor="email">Username</Label>
                <Input
                id="username"
                name="username"
                type="text"
                required
                />
            </div>
            <div className="grid gap-2">
                <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="hidden ml-auto text-sm underline">
                    Forgot your password?
                </Link>
                </div>
                <Input id="password" name="password" type="password" required />
            </div>
            <Button type="submit" className="w-full">
                Login
            </Button>
            </div>
            </form>
            <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
                Sign up
            </Link>
            </div>
        </CardContent>
        </Card>
    </div>
  )
}
