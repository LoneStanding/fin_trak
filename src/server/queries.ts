import { auth, currentUser } from '@clerk/nextjs/server';
import 'server-only';
import { db } from "~/server/db";
import { budget, logging, transactions, users } from './db/schema';
import { eq, sum } from 'drizzle-orm';

export default async function LogLogIn(){
    const {userId} =  auth();

    if (!userId) {
        throw new Error('Unauthorized');
    }
    
    //if(!user.userId) throw new Error('UnAuthorized');

    await db.insert(logging).values({
        logId: String(userId),
      });
}

export async function NewUser(){

    const {userId} = auth();

    if (!userId) {
        throw new Error('Unauthorized');
    }
    
    const user = await currentUser();
    const username = user?.username ?? "NULL";
    
    await db.insert(users).values({
        uId: String(userId),
        username: String(username),
    });
}

export async function CheckUser(userId: string) {
    const res = await db.query.users.findFirst({
        where: (model, {eq}) => eq(model.uId, userId)
    })
    if(res){
        //Do Nothing
        console.log(`This is res : ${res.createdAt.getDate()}`);
    }else{
        await NewUser();
    }
}   

export async function AddTransaction(vendor: string, category: string, amount: number){
    const {userId} =  auth();

    if (!userId) {
        throw new Error('Unauthorized');
    }
    
    await db.insert(transactions).values({
        userId: String(userId),
        vendor: String(vendor),
        amount: String(amount),
        category: String(category),
    });
}

export async function DeleteTransaction(tId: number) {
    const { userId } = auth();
  
    if (!userId) {
      throw new Error('Unauthorized');
    }
    try{
    console.log(tId);
    await db.delete(transactions).where(eq(transactions.tNo, tId));
    }catch(error){
        console.error('Error deleting transactions:', error);
        throw new Error('Could not DELETE');
    }}

export async function getRecentTransactions(userId:string) {
    try {
      const lastTransactions = await db.query.transactions.findMany({
        orderBy: (model, { desc }) => desc(model.createdAt),
        limit: 7, // Limit to the last 7 transactions
        where:(moode, {eq}) => eq(moode.userId, userId),
      });
  
      return lastTransactions;
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
      throw new Error('Could not fetch recent transactions');
    }
}

export async function getAllTransactions(userId: string) {
    try {
      const lastTransactions = await db.query.transactions.findMany({
        orderBy: (model, { desc }) => desc(model.createdAt),
        where:(moode, {eq}) => eq(moode.userId, userId),
        limit: 100,
      });
  
      return lastTransactions;
    } catch (error) {
      console.error('Error fetching recent transactions:', error);
      throw new Error('Could not fetch recent transactions');
    }
}

export async function SetBudget(amount: number){
    const { userId } = auth();

    if (!userId) {
        throw new Error('Unauthorized');
    }

    try {
        await db.insert(budget).values({
            budget: String(amount),
            BId: String(userId)
        })
      } catch (error: unknown) {
        if (error instanceof Error) {
            if(error.message.includes('duplicate key value violates unique constraint')){
                await UpdateBudget(Number(amount));
            }else{
                console.error('Error Seting Budget:', typeof(amount), error);
                throw new Error('Could not Set Budget');
        }
      }
    }
}

export async function UpdateBudget(amount: number){
    amount = Number(amount);
    const { userId } = auth();

    if (!userId) {
        throw new Error('Unauthorized');
    }

    try {
        await db.update(budget).set({
            budget: String(amount),
        }).where(eq(budget.BId, String(userId)))      
      } catch (error) {
        console.error('Error Updating Budget:', typeof(amount), error);
        throw new Error('Could not Update Budget');
      }
}

export async function CheckBudget(userId: string){
    const total = await db.select({ value: sum(transactions.amount) }).from(transactions);
    const limit = await db.select().from(budget).where(eq(budget.BId, userId));
    if(Number(total) < Number(limit)) {
        return false;
    }
    return true;
}

export async function CategoryExpense(userId: string){
    try{
        const expense = await db.select({id: transactions.category, value: sum(transactions.amount) })
                                .from(transactions)
                                .where(eq(transactions.userId, userId)).
                                groupBy(transactions.category);
        return expense;
    }catch (error) {
        console.error('Error getting PIE', error);
        throw new Error('Could not GET PIE');
      }
}

export async function MonthlyExpense(userId: string){
    try{
        const expense = await db.select({id: transactions.createdAt, value: sum(transactions.amount) })
                                .from(transactions)
                                .where(eq(transactions.userId, userId)).
                                groupBy(transactions.createdAt);
        return expense;
    }catch (error) {
        console.error('Error getting BAR', error);
        throw new Error('Could not GET BAR');
      }
}