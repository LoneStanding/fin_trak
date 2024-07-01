import { auth, currentUser } from '@clerk/nextjs/server';
import 'server-only';
import { db } from "~/server/db";
import { logging, users } from './db/schema';
import { SQLWrapper } from 'drizzle-orm';
import { PgInteger } from 'drizzle-orm/pg-core';

export default async function LogLogIn(){
    const user =  auth();
    
    //if(!user.userId) throw new Error('UnAuthorized');

    await db.insert(logging).values({
        logId: String(user.userId),
      });
}

export async function NewUser(){

    const {userId} = auth();
    const user = await currentUser();
    
    await db.insert(users).values({
        uId: String(userId),
        username: String(user?.username),
    });
}

export async function CheckUser(userId: string) {
    const res = await db.query.users.findFirst({
        where: (model, {eq}) => eq(model.uId, userId)
    })
    if(res){
        //Do Nothing
        console.log(`This is res : ${res}`);
    }else{
        NewUser();
    }
}   