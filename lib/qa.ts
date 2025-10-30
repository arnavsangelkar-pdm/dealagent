import { promises as fs } from 'fs';
import path from 'path';

export type QA = {
  id: string;
  question: string;
  answer: string;
  citations: string[];
};

let qaData: QA[] | null = null;

async function loadQAData(): Promise<QA[]> {
  if (qaData) return qaData;
  
  const filePath = path.join(process.cwd(), 'data', 'hardcodedQA.json');
  const fileContents = await fs.readFile(filePath, 'utf8');
  qaData = JSON.parse(fileContents) as QA[];
  return qaData;
}

function tokenize(text: string): string[] {
  return text.toLowerCase().split(/\s+/).filter(t => t.length > 0);
}

function calculateOverlap(tokens1: string[], tokens2: string[]): number {
  const set1 = new Set(tokens1);
  const set2 = new Set(tokens2);
  let overlap = 0;
  for (const token of set1) {
    if (set2.has(token)) overlap++;
  }
  return overlap;
}

export async function findAnswer(userText: string): Promise<QA | null> {
  const qas = await loadQAData();
  if (!userText.trim()) return null;

  const userLower = userText.toLowerCase().trim();
  const userTokens = tokenize(userText);

  // First: exact match
  for (const qa of qas) {
    if (qa.question.toLowerCase().trim() === userLower) {
      return qa;
    }
  }

  // Second: includes match
  for (const qa of qas) {
    if (qa.question.toLowerCase().includes(userLower) || userLower.includes(qa.question.toLowerCase())) {
      return qa;
    }
  }

  // Third: token overlap
  let bestMatch: QA | null = null;
  let bestScore = 0;

  for (const qa of qas) {
    const qaTokens = tokenize(qa.question);
    const overlap = calculateOverlap(userTokens, qaTokens);
    if (overlap > bestScore && overlap >= Math.max(2, userTokens.length * 0.3)) {
      bestScore = overlap;
      bestMatch = qa;
    }
  }

  return bestMatch;
}

export async function getAllQuestions(): Promise<string[]> {
  const qas = await loadQAData();
  return qas.map(qa => qa.question);
}
