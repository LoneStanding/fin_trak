import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { AddTransaction } from '~/server/queries';

type TransactionData = {
  vendor: string;
  category: string;
  amount: number;
};

export async function POST(request: NextRequest) {
  let transactionData: TransactionData;

  try {
    transactionData = await request.json();
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  const { vendor, category, amount } = transactionData;

  if (typeof vendor !== 'string' || typeof category !== 'string' || typeof amount !== 'number') {
    return NextResponse.json({ error: 'Invalid data types' }, { status: 400 });
  }

  try {
    await AddTransaction(vendor, category, amount);
    return NextResponse.json({ message: 'Transaction added successfully!' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
