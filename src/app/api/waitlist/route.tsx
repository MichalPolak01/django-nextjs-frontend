import { NextResponse } from "next/server";
import ApiProxy from "../proxy";

const DJANGO_API_WAITLIST_URL = "http://127.0.0.1:8001/api/waitlist/"


export async function GET(request: Request) {
    const response = await ApiProxy.get(DJANGO_API_WAITLIST_URL, true);

    const result = await response.json();
    let status = response.status

    return NextResponse.json({...result}, {status: status});
}


export async function POST(request: Request) {
    const requestData = await request.json();

    const response = await ApiProxy.post(DJANGO_API_WAITLIST_URL, requestData, true);

    try {
        await response.json();
    } catch (error) {
        return NextResponse.json({message: "Invalid request."}, {status: response.status});
    }

    if (response.ok) {
        return NextResponse.json({}, {status: 200});
    }
    return NextResponse.json({}, {status: 400});
}