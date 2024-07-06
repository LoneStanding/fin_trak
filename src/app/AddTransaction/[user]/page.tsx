 /* eslint-disable */

import { auth, currentUser} from "@clerk/nextjs/server";
import Link from "next/link";
import LogLogIn, { CategoryExpense, CheckUser } from "~/server/queries";
import Tabs from "../../_components/Tabs";
import RecentTransactions from "../../_components/RecentTransactions";
import { FormEvent } from "react";
import SetBudget from "~/app/_components/SetBudget";
import MyResponsivePie from "~/app/_components/Doughnut";
import AddTransactionForm from "~/app/_components/FormTransaction";

export default async function Dashboard() {

    const { userId } = auth();
  let transactiondata: any; /* eslint-disable-line */
  if (userId) {
    console.log(`User ${userId}`);
    await CheckUser(userId);
    transactiondata = await CategoryExpense(userId)
  if(transactiondata){
    console.log(transactiondata);
  }else{
    console.log("NO DATA")
  }
  } else {
    auth().redirectToSignIn();
  }
    // Get the Backend API User object when you need access to the user's information
    const user = await currentUser()

    //Need to Add Socials
    /* eslint-disable-line */ return(
    <main className="flex flex-col justify-start bg-rose_toupe min-h-screen items-center">
        <div className="mt-3 w-full bg-platinum p-4 rounded-2xl flex items-center">
          <h1 className="text-6xl">{`${user?.username}'s`} Dashboard</h1>
        </div>
        <div className="mt-5 bg-transparent h-99 w-full overflow-hidden rounded-2xl mr-2 ml-2 flex justify-center gap-8">
          <div className="w-1/2 h-full bg-platinum rounded-2xl flex flex-col justify-center items-center">
          <Link href={`/MonthlyExpense`}><h1 className="text-5xl mt-3">EXPENCES<span className="text-sm ml-1">click to see more...</span></h1></Link>
          <MyResponsivePie data={transactiondata}/> 
          </div>
          <div className="w-1/2 justify-start h-full bg-rose_toupe rounded-2xl overflow-hidden flex flex-col">
            <div className="flex bg-rose_toupe gap-3 justify-between items-center">
            <Link href={`/dashboard`} className="flex bg-platinum justify-center items-center w-1/3 p-2 rounded-xl">
                <Tabs id="folder.png"/>
              </Link>
              <Link href={`/dashboard/budget`} className="flex bg-platinum justify-center items-center w-1/3 p-2 rounded-xl">
                <Tabs id="budget.png"/>
              </Link>
              <Link href={`/dashboard/delete`} className="flex bg-platinum justify-center items-center w-1/3 p-2 rounded-xl">
                <Tabs id="delete.png"/>
              </Link>
            </div>
            <div className="border-t-4 border-black mt-1 bg-platinum flex-grow rounded-2xl">
              <div className="flex border-b-4 border-black justify-between pb-2">
                <div className="">
                  <h2 className="text-3xl ml-1 mt-1">Add Transaction</h2>
                </div>
              </div>
              <div className="h-3/4 flex flex-col justify-center items-center">
                <AddTransactionForm />
              </div>
            </div>
          </div>
        </div>
    </main>
    
    )
}