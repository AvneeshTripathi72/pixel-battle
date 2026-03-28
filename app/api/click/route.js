import { NextResponse } from 'next/server';
import { updateTile, getLeaderboard } from '../../../lib/game';
import { pusherServer } from '../../../lib/pusher';

export async function POST(req) {
  try {
    const { tileId, user } = await req.json();

    if (!user || isNaN(tileId)) {
      return NextResponse.json({ error: 'Missing tile information' }, { status: 400 });
    }

    const updatedTile = await updateTile(tileId, user);
    
    if (updatedTile) {
      const newLeaderboard = await getLeaderboard();
      
      // Trigger Pusher update
      await pusherServer.trigger('pixel-canvas', 'tileUpdate', {
        tile: updatedTile,
        leaderboard: newLeaderboard
      });

      return NextResponse.json({ success: true, tile: updatedTile });
    }

    return NextResponse.json({ error: 'Update failed' }, { status: 500 });
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
