import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';

const playerFilePath = path.join(process.cwd(), 'data/playerData.json');
const badWordsFilePath = path.join(process.cwd(), 'data/badWords.json');

async function readBadWords() {
  const data = await fs.readFile(badWordsFilePath, 'utf8');
  const { badWords } = JSON.parse(data);
  return badWords;
}

let username = 'player_name'

export async function GET() {
  try {
    const data = await fs.readFile(playerFilePath, 'utf8');
    const { username, password } = JSON.parse(data);
    return NextResponse.json({ username, password });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read player data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { newName } = await req.json();

    if (!newName || typeof newName !== 'string') {
      return NextResponse.json({ status: 'name_change_failed', message: 'Invalid name.' }, { status: 400 });
    }

    const badWords = await readBadWords();

    if (badWords.some((word: string) => newName.toLowerCase().includes(word))) {
      return NextResponse.json({ status: 'name_change_failed', message: 'Inappropriate name.' }, { status: 400 });
    }

    const data = { username: newName };
    await fs.writeFile(playerFilePath, JSON.stringify(data, null, 2), 'utf8');

    return NextResponse.json({ status: 'name_change_ok', username: newName });
  } catch (error) {
    return NextResponse.json({ status: 'name_change_failed', message: 'Failed to change name.' }, { status: 500 });
  }
}