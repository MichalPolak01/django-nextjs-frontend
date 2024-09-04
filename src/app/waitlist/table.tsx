"use client"

import { useAuth } from "@/components/authProvider"
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import useSWR from "swr"
  
const API_WAITLIS_API_URL = "/api/waitlist/"

const fetcher = async url => {
    const res = await fetch(url)
   
    // If the status code is not in the range 200-299,
    // we still try to parse and throw it.
    if (!res.ok) {
      const error = new Error('An error occurred while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
   
    return res.json()
}
  

export default function WaitlistTable() {
    const router = useRouter();
    const { data, error, isLoading } = useSWR(API_WAITLIS_API_URL, fetcher);
    const auth = useAuth();

    useEffect(() => {
        if (error?.status === 401) {
        auth.loginRequired();
        }
    }, [auth, error])

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>

    return (
        <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
                <TableRow>
                    <TableHead className="w-[100px]">Id</TableHead>
                    <TableHead>Email</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {data.map((item, idx) => (
                <TableRow key={`item-${idx}`} onClick={e => router.push(`/waitlist/${item.id}`)} className="hover:cursor-pointer">
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell className="font-medium">{item.email}</TableCell>
                </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}  