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

function sanitizeInput(input: string): string {
  const cleanInput = input.replace(/<\/?[^>]+(>|$)/g, "");
  return cleanInput;
}

export async function GET() {
  try {
    const reqPlayer = {id: 1};
    const data = await fs.readFile(playerFilePath, 'utf8');
    const parsedData = JSON.parse(data);
    const foundPlayer = parsedData.players.find((player: { id: number, username: string, password: string }) => player.id === reqPlayer.id);
    return NextResponse.json({ foundPlayer });
  } catch (error) {
    return NextResponse.json({ error: 'playerNotFound' }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const reqData = await req.json();
    let { username, id } = reqData;

    if (!username || typeof username !== 'string') {
      return NextResponse.json({ status: 'name_change_failed', message: 'invalidName' }, { status: 400 });
    }

    username = sanitizeInput(username);

    const badWords = await readBadWords();

    //check username length
    if (username.length < 3 || username.length > 20) {
      return NextResponse.json({ status: 'name_change_failed', message: 'nameTooLong' }, { status: 400 });
    }

    //allow only alphanumeric
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      return NextResponse.json({ status: 'name_change_failed', message: 'invalidCharacters' }, { status: 400 });
    }

    // check for bad words
    if (badWords.some((word: string) => username.toLowerCase().includes(word))) {
      return NextResponse.json({ status: 'name_change_failed', message: 'inappropriateName' }, { status: 400 });
    }

    const parsedData = JSON.parse(await fs.readFile(playerFilePath, 'utf8'));

    // check if the new username already exists
    const existingPlayer = parsedData.players.find((player: { username: string }) => player.username.toLowerCase() === username.toLowerCase());
    if (existingPlayer) {
      return NextResponse.json({ status: 'name_change_failed', message: 'userExists' }, { status: 400 });
    }

    const foundPlayerIndex = parsedData.players.findIndex((player: { id: number, username: string, password: string }) => player.id === id);
    parsedData.players[foundPlayerIndex].username = username;

    await fs.writeFile(playerFilePath, JSON.stringify(parsedData, null, 2), 'utf8');

    return NextResponse.json({ status: 'name_change_ok', username: username });
  } catch (error) {
    return NextResponse.json({ status: 'name_change_failed', message: 'nameChangeFailed' }, { status: 500 });
  }
}