"use client"

import WaitlistTable from './table'

// const fetcher = (...args: [input: RequestInfo, init?: RequestInit]) => fetch(...args).then(res => res.json());


export default function Page() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
{/* 
      <div>
        <WaitlistForm />
      </div> */}

      <WaitlistTable />

    </main>
  );
}
