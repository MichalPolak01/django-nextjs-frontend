import { getToken } from "@/lib/auth";

export default class ApiProxy {

    static async getHeaders(requireAuth: boolean) {
        let headers: Record<string, string> = {
            "Content-Type": "application/json",
            "Accept": "application/json",
        };
    
        const authToken = getToken();
        if (authToken && requireAuth) {
            headers["Authorization"] = `Bearer ${authToken}`
        }
        return headers;
    }

    static async post(endpoint: string, object: any, requireAuth: boolean) {
        const jsonData = JSON.stringify(object);
        
        const headers = await ApiProxy.getHeaders(requireAuth);
        
        const requestOptions = {
            method: "POST",
            headers: headers,
            body: jsonData
        };
    
        return await fetch(endpoint, requestOptions);
    }

    static async get(endpoint: string, requireAuth: boolean) {
        const headers = await ApiProxy.getHeaders(requireAuth);
        
        const requestOptions = {
            method: "GET",
            headers: headers,
        };
    
        return await fetch(endpoint, requestOptions);
    }
}