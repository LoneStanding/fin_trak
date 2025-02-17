import { NextRequest, NextResponse } from 'next/server';
import { SetBudget, UpdateBudget } from '~/server/queries';

interface RequestData {
    amount: string;
    // Add other properties if there are more expected fields
  }

export async function POST(request: NextRequest) {
    const { amount }: RequestData = await request.json();// eslint-disable-line

  try {
    await SetBudget(Number(amount));
    return NextResponse.json({ message: 'Transaction added successfully!' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
        if(error.message.includes('duplicate key value violates unique constraint')){
            await UpdateBudget(Number(amount));
            return NextResponse.json({ message: 'Transaction added successfully!' }, { status: 200 });
        }else{
        return NextResponse.json({ error: error.message }, { status: 500 });}
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
