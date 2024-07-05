import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import AllTransactions from "~/app/_components/AllTransactions";
import RecentTransactions from "~/app/_components/RecentTransactions";
import { CheckBudget, CheckUser } from "~/server/queries";


export default async function AllTransaction() {

    const { userId } = auth();
    if (userId) {
    // Query DB for user specific information or display assets only to signed in users
        console.log(`User ${userId}`);
        await CheckUser(userId);
        if(! await CheckBudget(userId)){
          alert("You have exceeded your budget")
        }
    }else{
        auth().redirectToSignIn();
    }

    // Get the Backend API User object when you need access to the user's information
    const user = await currentUser()

    //Need to Add Socials
    return(
    <main className="flex flex-col justify-center items-center bg-rose_toupe w-full min-h-screen">
      <div className=" border-t-4 border-black bg-platinum flex-grow w-percent95 rounded-2xl mt-3">
              <div className="flex border-b-4 border-black justify-between pb-2">
                <div className="">
                  <h2 className="text-6xl ml-1 mt-1 align-middle">All Transactions</h2>
                </div>
                <Link href={`/AddTransaction/${user?.username}`} >
                  <img src="/plus.png" alt="Add" className=" mt-1 mr-1 w-14"/>
                </Link>
              </div>
              <div className="h-3/4 border-b-2 border-black">
                <AllTransactions/>
              </div>
        </div>
    </main>
    )
}