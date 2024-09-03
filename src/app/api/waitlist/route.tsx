import { getToken } from "@/lib/auth";
import { NextResponse } from "next/server";

const DJANGO_API_WAITLIST_URL = "http://127.0.0.1:8001/api/waitlist/"


export async function GET(request: Request) {
    const authToken = getToken();

    if (!authToken) {
        return NextResponse.json({}, {status: 401})
    }

    const options = {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/jsnon",
            "Authorization": `Bearer ${authToken}`
        },
    };

    const response = await fetch(DJANGO_API_WAITLIST_URL, options);
    const result = await response.json();
    let status = response.status

    return NextResponse.json({...result}, {status: status});
}


export async function POST(request: Request) {
    const requestData = await request.json();
    const jsonData = JSON.stringify(requestData);
    
    let headers: Record<string, string> = {
        "Content-Type": "application/json",
        "Accept": "application/json",
    };

    const authToken = getToken();
    if (authToken) {
        headers["Authorization"] = `Bearer ${authToken}`
    }
    
    const requestOptions = {
        method: "POST",
        headers: headers,
        body: jsonData
    };

    const response = await fetch(DJANGO_API_WAITLIST_URL, requestOptions);
    try {
        const responseData = await response.json();
        console.log(responseData);
    } catch (error) {
        return NextResponse.json({message: "Invalid request."}, {status: response.status});
    }


    if (response.ok) {
        return NextResponse.json({}, {status: 200});
    }
    return NextResponse.json({}, {status: 400});
}