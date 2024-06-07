// pages/api/getMeeting/[identifier].ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req: NextRequest, res: NextResponse) {

    const url = new URL(req.url);
    const pathParts = url.pathname.split('/');
    const identifier = pathParts[pathParts.length - 1];

    try {
        const meeting = await prisma.meeting.findUnique({
            where: { urlIdentifier: String(identifier) },
            // include: { user: true },
        });

        if (!meeting) {
            return new NextResponse(
                JSON.stringify({ error: 'Meeting not found' }),
                {
                    status: 404,
                    headers: { 'Content-Type': 'application/json' },
                }
            );
        }

        return new NextResponse(
            JSON.stringify({ message: 'Meeting found', meeting }),
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
