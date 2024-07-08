/* eslint-disable */

import { auth } from "@clerk/nextjs/server";
import MyResponsiveBar from "../_components/BarChart";
import { CheckUser, MonthlyExpense } from "~/server/queries";
import MonthlyChart from "../_components/MonthlyChart";

export default async function MonthlyExpensePage() {

  const { userId } = auth();
  if (userId) {
    console.log(`User ${userId}`);
    await CheckUser(userId);
  } else {
    auth().redirectToSignIn();
  }


    //Need to Add Socials
    return(
    <main className="flex flex-col justify-center items-center bg-rose_toupe w-full min-h-screen">
      <MonthlyChart/>
    </main>
    )
}