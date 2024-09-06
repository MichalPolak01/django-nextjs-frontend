"use client"

import { FormEvent, useState } from "react";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"


const API_WAITLIS_API_URL = "/api/waitlist/";

interface FromError {
    message: string;
}

interface FromErrors {
    email?: FromError[];
}


export default function WaitlistForm() {
    const [message, setMessage] = useState('');
    const [errors, setErrors] = useState<FromErrors>({});
    const [error, setError] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setError("");
        setMessage("");
        setErrors({});

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

        if (response.status === 200 || response.status === 201) {
            setMessage("Thank you for joining!");
        } else {        
            const data = await response.json();
            setErrors(data.data);
            setError("There was an error with your request. Please try again later.");
        }
    }

  return (
    <form onSubmit={handleSubmit}>
        <div className="grid gap-4">
            {message &&
                <div className="bg-emerald-500 text-center font-semibold rounded-xl p-3"> 
                    {message}
                </div>
            }
            {error && 
            <div className="bg-destructive text-center font-semibold rounded-xl p-3">
                {error}
            </div>
            }
            <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <div className={errors?.email ? "rounded-lg p-3 border border-destructive space-y-2" : ""}>
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="Your email"
                        required
                    />
                    {errors && errors?.email && errors?.email.length > 0 &&
                        <div className="p-2 rounded-lg text-sm bg-destructive text-center text-white">
                            {errors?.email.map((err, idx) => {
                                return !err.message ? null : <p key={`err-${idx}`}>{err.message}</p>
                            })}
                        </div>
                    }
                </div>
            </div>
        <Button type="submit" className="w-full">
            Join waitlist
        </Button>
        </div>
    </form>
  )
}
