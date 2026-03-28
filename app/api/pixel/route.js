import { NextResponse } from 'next/server';
import { getGrid, getLeaderboard } from '../../../lib/game';

export async function GET() {
  try {
    const grid = await getGrid();
    const leaderboard = await getLeaderboard();
    
    return NextResponse.json({ grid, leaderboard });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch grid' }, { status: 500 });
  }
}
