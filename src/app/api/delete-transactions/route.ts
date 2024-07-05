import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { DeleteTransaction } from '~/server/queries';

type DeleteRequestBody = {
  tNos: number[];
};

export async function POST(request: NextRequest) {
  let tNos: number[];

  try {
    const body: DeleteRequestBody = await request.json();
    tNos = body.tNos;
  } catch (error) {
    return NextResponse.json({ error: 'Invalid request body' }, { status: 400 });
  }

  try {
    for (const tNo of tNos) {
      await DeleteTransaction(tNo);
    }
    return NextResponse.json({ message: 'Transactions deleted successfully!' }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ error: 'An unexpected error occurred' }, { status: 500 });
    }
  }
}
