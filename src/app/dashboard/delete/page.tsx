import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import AllTransactions from "~/app/_components/AllTransactions";
import DeleteTransactions from "~/app/_components/DeleteTransactions";
import { CheckBudget, CheckUser } from "~/server/queries";


export default async function DeleteTransaction() {

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
      <DeleteTransactions/>
    </main>
    )
}