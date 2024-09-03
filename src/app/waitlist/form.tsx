"use client"

import Link from "next/link"
import { useAuth } from "@/components/authProvider";
import { FormEvent, useState } from "react";

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


const API_WAITLIS_API_URL = "/api/waitlist/";


export default function WaitlistForm() {
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

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
        const response = await fetch(API_WAITLIS_API_URL, requestOptions);
        const rData = response.json();
        console.log(rData);

        if (response.ok) {
            setMessage("Thank you for joining!");
            setError("");
        } else {
            setError("There was an error with your request. Please try again later.");
            setMessage("");
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
            <div>{message && message}</div>
            <div>{error && error}</div>
        <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
            id="email"
            name="email"
            type="email"
            placeholder="Your email"
            required
            />
        </div>
        <Button type="submit" className="w-full">
            Join waitlist
        </Button>
        </div>
    </form>
  )
}
