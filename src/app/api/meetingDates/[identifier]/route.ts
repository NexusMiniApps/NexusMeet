// pages/api/meetingDates.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { DateRequest } from '@/lib/types';

const prisma = new PrismaClient();

export async function POST(req: NextRequest, res: NextResponse) {
    const identifier = req.nextUrl.pathname.split('/').pop();
    const { dates } = await req.json() as DateRequest

    if (!identifier || !Array.isArray(dates)) {
        return new NextResponse(
            JSON.stringify({ error: 'Invalid request payload' }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    try {
        const meetingDates = dates.map(date => ({
            date: new Date(date),
            meetingId: String(identifier),
        }));

        await prisma.meetingDate.createMany({
            data: meetingDates,
        });

        return new NextResponse(
            JSON.stringify({ message: 'Dates saved successfully', identifier }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );

    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'Internal server error', }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}

export async function GET(req: NextRequest, res: NextResponse) {
    const identifier = req.nextUrl.pathname.split('/').pop(); // Updated to use identifier from the path

    if (!identifier) {
        return new NextResponse(
            JSON.stringify({ error: 'Meeting ID is required' }),
            {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }

    try {
        const meetingDates = await prisma.meetingDate.findMany({
            where: {
                meetingId: String(identifier),
            },
        });

        return new NextResponse(
            JSON.stringify({ meetingDates }),
            {
                status: 200,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    } catch (error) {
        return new NextResponse(
            JSON.stringify({ error: 'Internal server error' }),
            {
                status: 500,
                headers: { 'Content-Type': 'application/json' },
            }
        );
    }
}