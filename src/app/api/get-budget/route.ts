import { auth } from '@clerk/nextjs/server';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { CheckBudget } from '~/server/queries'; // Adjust the import path as necessary

export async function GET(request: NextRequest) {
  const { userId } = auth();
  if (userId) {
    try {
      const transactions = await CheckBudget(userId);
      return NextResponse.json(transactions, { status: 200 });
    } catch (error: unknown) {
      if (error instanceof Error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
      } else {
        return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
      }
    }
  } else {
    return NextResponse.json({ error: 'User not authenticated' }, { status: 401 });
  }
}
