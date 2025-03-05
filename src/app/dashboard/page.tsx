"use client";

import { useSession } from "@/lib/auth-client";

export default function Page() {
  const { data } = useSession();
  const currentUser = data?.user;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <div className="w-full max-w-sm">
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h1 className="text-2xl font-bold text-center mb-4">Welcome {currentUser?.name}</h1>
          <p className="text-center">You are now logged in.</p>
        </div>
      </div>
    </div>
  );
}
