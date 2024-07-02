import { NextResponse } from 'next/server'
import { promises as fs } from 'fs';
import path, { parse } from 'path';
 
export async function POST(request: Request) {
  const { username, password } = await request.json();
  const playerFilePath = path.join(process.cwd(), 'data/playerData.json');

  const data = await fs.readFile(playerFilePath, 'utf8');
  const parsedData = JSON.parse(data);

  if (username === parsedData.username && password === parsedData.password) {
    return NextResponse.json({ status: 'login_ok' })
  } else if (username !== parsedData.username) {
    return NextResponse.json({ status: 'user_not_found' })
  } else if (password !== parsedData.password) {
    return NextResponse.json({ status: 'password_mismatch' })
  } else {
    return NextResponse.json({ status: 'login_failed' })
  }
}
