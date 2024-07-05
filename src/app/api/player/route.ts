import { NextResponse } from 'next/server';
import { promises as fs } from 'fs';
import path from 'path';
import { getSession } from 'next-auth/react';
import { auth } from '@/auth';

const playerFilePath = path.join(process.cwd(), 'data/playerData.json');
const badWordsFilePath = path.join(process.cwd(), 'data/badWords.json');

async function readBadWords() {
  const data = await fs.readFile(badWordsFilePath, 'utf8');
  const { badWords } = JSON.parse(data);
  return badWords;
}

export async function GET() {
  try {
    const reqPlayer = {id: 1};
    const data = await fs.readFile(playerFilePath, 'utf8');
    const parsedData = JSON.parse(data);
    const foundPlayer = parsedData.players.find((player: { id: number, username: string, password: string }) => player.id === reqPlayer.id);
    return NextResponse.json({ foundPlayer });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to read player data' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    // const { newName, id } = await req.json();
    const reqData = await req.json();
    if (!reqData.username || typeof reqData.username !== 'string') {
      return NextResponse.json({ status: 'name_change_failed', message: 'Invalid name.' }, { status: 400 });
    }

    const badWords = await readBadWords();

    if (badWords.some((word: string) => reqData.username.toLowerCase().includes(word))) {
      return NextResponse.json({ status: 'name_change_failed', message: 'Inappropriate name.' }, { status: 400 });
    }

    // const data = { username: reqData.username, id: reqData.id };
    const parsedData = JSON.parse(await fs.readFile(playerFilePath, 'utf8'));
    const foundPlayerIndex = parsedData.players.findIndex((player: { id: number, username: string, password: string }) => player.id === reqData.id);
    parsedData.players[foundPlayerIndex].username = reqData.username;

    await fs.writeFile(playerFilePath, JSON.stringify(parsedData, null, 2), 'utf8');

    return NextResponse.json({ status: 'name_change_ok', username: reqData.username });
  } catch (error) {
    return NextResponse.json({ status: 'name_change_failed', message: 'Failed to change name.' }, { status: 500 });
  }
}