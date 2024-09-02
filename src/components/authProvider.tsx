"use client"

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

const {createContext, useContext, useState} = require("react");
const AuthContext = createContext(null);


const LOGIN_REDIRECT_URL = "/";
const LOGOUT_REDIRECT_URL = "/login";
const LOGIN_REQUIRED_URL = "/login";

const LOCAL_STORAGE_KEY = "is-logged-in";


export function AuthProvider({children}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();


    useEffect(() => {
        const storedAutStatus = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedAutStatus) {
            const storedAutStatusInt = parseInt(storedAutStatus);
            setIsAuthenticated(storedAutStatusInt === 1)
        }
    }, []);

    const login = () => {
        setIsAuthenticated(true);
        localStorage.setItem(LOCAL_STORAGE_KEY, "1");

        const nextUrl = searchParams.get("next");
        const inwalidNextUrl = ['/login', '/logout'];
        const nextUrlValid = nextUrl && nextUrl.startsWith('/') && !inwalidNextUrl.includes(nextUrl);

        if (nextUrlValid) {
            router.replace(nextUrl);
            return
        } else {
            router.replace(LOGIN_REDIRECT_URL);
            return
        }        
    }

    const logout = () => {
        setIsAuthenticated(false)
        localStorage.setItem(LOCAL_STORAGE_KEY, "0");
        router.replace(LOGOUT_REDIRECT_URL);
    }

    const loginRequired = () => {
        setIsAuthenticated(false);
        localStorage.setItem(LOCAL_STORAGE_KEY, "0");
        let loginWithNextUrl = `${LOGIN_REQUIRED_URL}?next=${pathname}`;
        if (LOGIN_REQUIRED_URL === pathname) {
            loginWithNextUrl = `${LOGIN_REQUIRED_URL}`;
        }
        router.replace(loginWithNextUrl);
    }

    return (
        <AuthContext.Provider value={{isAuthenticated, login, logout, loginRequired}}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}