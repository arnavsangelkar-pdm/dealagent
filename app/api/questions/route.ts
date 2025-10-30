import { NextResponse } from 'next/server';
import { getAllQuestions } from '@/lib/qa';

export async function GET() {
  const questions = await getAllQuestions();
  return NextResponse.json(questions);
}
