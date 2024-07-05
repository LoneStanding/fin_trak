import { SignedIn, SignedOut, SignInButton, SignOutButton, SignUpButton } from "@clerk/nextjs";
import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import Image from 'next/image'
import { usePathname } from "next/navigation";
import LogLogIn from "~/server/queries";

export default async function HomePage() {

  const { userId } = auth();
  if (userId) {
    // Query DB for user specific information or display assets only to signed in users
    console.log(`User ${userId}`);
    await LogLogIn();
  }

  // Get the Backend API User object when you need access to the user's information
  const user = await currentUser()

  return (
    <main className="flex justify-center items-center bg-rose_toupe w-full min-h-screen">
      <div className="container flex justify-between gap-6 ml-5 mr-5 bg-transparent min-h-100 rounded-2xl overflow-hidden">
        <div className="w-1/2 bg-plaster_white flex flex-col justify-center pl-20 rounded-2xl">
          <h1 className="text-6xl">Track Expenses<br />Effectively ! {user?.username}</h1>
          <p className="text-2xl">Check where your money went and where<span className="text-xs mt-1"><br />*Manual Entry not needed</span></p>
          <div className="flex gap-5 mt-5">
            <SignedOut>
            <button className="bg-shamock_green text-2xl rounded-xl p-2">
              <SignInButton/>
            </button>
            <button className="bg-platinum text-2xl rounded-xl p-2">
              <SignUpButton/>
            </button>
            </SignedOut>
            <SignedIn>
            <button className="bg-shamock_green text-2xl rounded-xl p-2">
            <Link href="/dashboard">Dashboard</Link>
            </button>
            <button className="bg-platinum text-2xl rounded-xl p-2">
              <SignOutButton/>
            </button>
            </SignedIn>
          </div>
        </div>
        <div className="w-1/2 bg-plaster_white rounded-2xl overflow-hidden flex justify-center items-center">
          <Image src={'/img001.jpg'} alt="Money Image" width={2000} height={2000}></Image>
        </div>
      </div>
    </main>
  );
}
