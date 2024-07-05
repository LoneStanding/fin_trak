import { NextRequest, NextResponse } from 'next/server';
import { AddTransaction } from '~/server/queries';

export async function POST(request: NextRequest) {
  const { vendor, category, amount } = await request.json();

  try {
    await AddTransaction(vendor, category, Number(amount));
    return NextResponse.json({ message: 'Transaction added successfully!' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
