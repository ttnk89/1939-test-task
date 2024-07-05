import { NextResponse } from 'next/server'
import { promises as fs } from 'fs';
import path, { parse } from 'path';
 
export async function POST(request: Request) {
  const { username, password } = await request.json();
  //mock backend logic without a db etc.
  const playerFilePath = path.join(process.cwd(), 'data/playerData.json');

  const data = await fs.readFile(playerFilePath, 'utf8');
  const parsedData = JSON.parse(data);

  const foundPlayer = parsedData.players.find((player: { id: number, username: string, password: string }) => player.username === username);

  if (foundPlayer.username === username && foundPlayer.password === password) {
    return NextResponse.json({ status: 'login_ok', data: foundPlayer })
  } else if (!foundPlayer) {
    return NextResponse.json({ status: 'user_not_found' })
  } else if (foundPlayer.password !== parsedData.password) {
    return NextResponse.json({ status: 'password_mismatch' })
  } else {
    return NextResponse.json({ status: 'login_failed' })
  }
}
