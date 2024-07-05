import { NextRequest, NextResponse } from 'next/server';
import { SetBudget, UpdateBudget } from '~/server/queries';

export async function POST(request: NextRequest) {
  const { amount } = await request.json();

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
