import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { Theme } from '@/models/theme';

export async function GET() {
  try {
    await connectToDatabase();
    const themes = await Theme.find({}).exec();
    return NextResponse.json(themes);
  } catch (err) {
    return NextResponse.error(new Error(err instanceof Error ? err.message : String(err)));
  }
}