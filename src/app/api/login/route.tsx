"use server"

import { setRefreshToken, setToken } from '@/lib/auth';
import { NextResponse } from 'next/server'
import ApiProxy from '../proxy';

const DJANGO_API_LOGIN_URL = "http://127.0.0.1:8001/api/token/pair"


export async function POST(request: Request) {
    const requestData = await request.json();

    const response = await ApiProxy.post(DJANGO_API_LOGIN_URL, requestData, false);
    const responseData = await response.json();

    if (response.ok) {
        const {username, access, refresh} = responseData
        setToken(access);
        setRefreshToken(refresh);
        return NextResponse.json({"loggedIn": true, "username": username}, {status: 200});
    }
    
    return NextResponse.json({"loggedIn": false, ... responseData}, {status: 400});
}