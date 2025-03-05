"use client";

import { Button } from "@/components/ui/button";
import { useSession, signOut } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function NavBar() {
  const { data } = useSession();
  const currentUser = data?.user;
  const router = useRouter();

  return (
    <nav className="w-full bg-zinc-950 z-10 shadow-md sticky top-0">
      <div className="flex justify-between lg:justify-around items-center px p-4 text-center gap-2">
        <h1 className={`font-semibold text-xl text-white hover:text-gray-300`}>Forum Engine</h1>
        <div className="flex flex-center gap-2 items-center">
          {currentUser ? (
            <>
              <Link className="text-white hover:text-zinc-400" href="/dashboard">
                Dashboard
              </Link>
              <Button
                variant={"destructive"}
                onClick={async () =>
                  await signOut({
                    fetchOptions: {
                      onSuccess: () => {
                        router.push("/");
                      },
                    },
                  })
                }
              >
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="secondary">Login</Button>
              </Link>
              <Link href="/register">
                <Button variant="secondary">Register</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
