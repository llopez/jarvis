import Link from "next/link";
import { getSession } from "./actions";
import { SignOutButton } from "@/app/SignOutButton";

export default function Home() {
  const session = getSession();

  return (
    <main className="h-full flex gap-2 justify-center items-center">
      {session ? (
        <SignOutButton />
      ) : (
        <Link
          href="/login"
          className="rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Sign In
        </Link>
      )}
    </main>
  );
}
