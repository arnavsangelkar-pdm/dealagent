import { NextRequest, NextResponse } from 'next/server';
import { findAnswer } from '@/lib/qa';
import { getById } from '@/lib/googleDrive';
import type { DriveNode } from '@/lib/googleDrive';

export async function POST(req: NextRequest) {
  const { message } = await req.json();
  const qa = await findAnswer(message || '');

  if (!qa) {
    return NextResponse.json({
      chunks: [
        "I couldn't find that in the current workspace.",
        "Try one of the suggested questions on the right."
      ],
      citations: []
    });
  }

  // Split into 3–6 chunks for streaming
  const words = qa.answer.split(' ');
  const chunkSize = Math.ceil(words.length / 4);
  const chunks: string[] = [];

  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize).join(' '));
  }

  const citNodes = (await Promise.all(
    qa.citations.map(id => getById(id))
  )).filter((node): node is DriveNode => node !== undefined);

  return NextResponse.json({ chunks, citations: citNodes });
}
