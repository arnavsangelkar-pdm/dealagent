import { NextRequest, NextResponse } from 'next/server';
import { getRoot, getById } from '@/lib/googleDrive';

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const id = searchParams.get('id');

  if (id) {
    const node = await getById(id);
    if (!node) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    return NextResponse.json(node);
  }

  const root = await getRoot();
  return NextResponse.json(root);
}
