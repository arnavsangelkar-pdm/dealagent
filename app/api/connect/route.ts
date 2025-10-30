import { NextResponse } from 'next/server';
import { connect } from '@/lib/googleDrive';

export async function GET() {
  const result = await connect();
  return NextResponse.json(result);
}
