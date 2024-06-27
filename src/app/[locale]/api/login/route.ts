import { NextResponse } from 'next/server'
 
export async function POST(request: Request) {
  const { username, password } = await request.json();

  if (username === 'john' && password === 'john123') {
    return NextResponse.json({ status: 'login_ok', playerName: 'JohnnyBadName' })
  } else {
    return NextResponse.json({ status: 'login_failed' })
  }
}
