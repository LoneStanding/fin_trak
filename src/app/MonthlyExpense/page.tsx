import { auth } from "@clerk/nextjs/server";
import MyResponsiveBar from "../_components/BarChart";
import { CheckUser, MonthlyExpense } from "~/server/queries";

export default async function MonthlyExpensePage() {

  const { userId } = auth();
  let transactiondata: any;
  if (userId) {
    console.log(`User ${userId}`);
    await CheckUser(userId);
    transactiondata = await MonthlyExpense(userId)
  if(transactiondata){
    console.log(transactiondata);
  }else{
    console.log("NO DATA")
  }
  } else {
    auth().redirectToSignIn();
  }

// Create an array with entries for each day from 1 to 30
const daysOfMonth = Array.from({ length: 30 }, (_, index) => ({
  id: (index + 1).toString(), // Day of the month as string (1 to 30)
  expense: 0 // Default expense value
}));

// Merge daysOfMonth with transactiondata
const mergedData = [
  ...daysOfMonth,
  ...transactiondata.map((item: { id: { getDate: () => { (): any; new(): any; toString: { (): any; new(): any; }; }; }; value: any; }) => ({
    id: item.id.getDate().toString(), // Get day of the month as a string
    expense: Number(item.value)
  }))
];

// Use reduce to merge expenses for entries with the same id
const transformedData = mergedData.reduce((acc, curr) => {
  const existingItem = acc.find((item: { id: any; }) => item.id === curr.id);
  if (existingItem) {
    existingItem.expense += curr.expense; // Merge expenses for the same id
  } else {
    acc.push({ id: curr.id, expense: curr.expense });
  }
  return acc;
}, []);

console.log(transformedData);
    //Need to Add Socials
    return(
    <main className="flex flex-col justify-center items-center bg-rose_toupe w-full min-h-screen">
      <div className="border-t-4 border-black bg-platinum flex-grow w-percent95 rounded-2xl mt-3 flex flex-col justify-center">
        <div className="h-100 w-full">
        <MyResponsiveBar data={transformedData}/>
</div>
      </div>
    </main>
    )
}