import { NextRequest, NextResponse } from 'next/server';
import { search } from '@/lib/googleDrive';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const q = searchParams.get('q') || '';

  const results = await search(q);
  return NextResponse.json(results);
}
