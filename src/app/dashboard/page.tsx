import { auth, currentUser } from "@clerk/nextjs/server";
import Link from "next/link";
import { CategoryExpense, CheckUser } from "~/server/queries";
import RecentTransactions from "../_components/RecentTransactions";
import Tabs from "../_components/Tabs";
import DoughnutChart from "../_components/Doughnut";
import MyResponsivePie from "../_components/Doughnut";

export default async function Dashboard() {
  const { userId } = auth();
  let transactiondata: any;
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

  //const piedata = 

  const user = await currentUser();

  return (
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
            <Link href="/dashboard" className="flex bg-platinum justify-center items-center w-1/3 p-2 rounded-xl">
              <Tabs id="folder.png" />
            </Link>
            <Link href="/dashboard/budget" className="flex bg-platinum justify-center items-center w-1/3 p-2 rounded-xl">
              <Tabs id="budget.png" />
            </Link>
            <Link href="/dashboard/delete" className="flex bg-platinum justify-center items-center w-1/3 p-2 rounded-xl">
              <Tabs id="delete.png" />
            </Link>
          </div>
          <div className=" border-t-4 border-black mt-1 bg-platinum flex-grow rounded-2xl">
            <div className="flex border-b-4 border-black justify-between pb-2">
              <div className="">
                <h2 className="text-3xl ml-1 mt-1">Recent Transactions</h2>
              </div>
              <Link href={`/AddTransaction/${user?.username}`}>
                <img src="/plus.png" alt="Add" className="mt-1 mr-1 w-10" />
              </Link>
            </div>
            <div className="h-3/4 border-b-2 border-black">
              <RecentTransactions />
            </div>
            <Link href={`/dashboard/${user?.username}/all-transactions`}>
              <h2 className="text-center mt-2">See More...</h2>
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
