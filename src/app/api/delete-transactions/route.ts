import { auth } from '@clerk/nextjs/server';
import { NextRequest, NextResponse } from 'next/server';
import { AddTransaction, DeleteTransaction } from '~/server/queries';

export async function POST(request: NextRequest) {
  const { tNos } = await request.json();

  try {
    for (let i = 0; i < tNos.length; i++) {
    await DeleteTransaction(tNos[i]);
    return NextResponse.json({ message: 'Transaction deleted successfully!' }, { status: 200 });
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
