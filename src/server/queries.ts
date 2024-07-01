import { auth, currentUser } from '@clerk/nextjs/server';
import 'server-only';
import { db } from "~/server/db";
import { logging, users } from './db/schema';

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