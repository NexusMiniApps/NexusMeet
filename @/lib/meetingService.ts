// lib/meetingService.ts
import { PrismaClient } from "@prisma/client";
import type { InitData, MeetingData } from "@/lib/types";

const prisma = new PrismaClient();

function generateIdentifier(length: number): string {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let result = "";
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

export async function createMeeting(
    userData: InitData | null,
    meetingData: MeetingData,
) {
    let identifier = "";
    let unique = false;

    while (!unique) {
        identifier = generateIdentifier(5);
        const existing = await prisma.meeting.findUnique({
            where: { urlIdentifier: identifier },
            select: { id: true },
        });
        if (!existing) {
            unique = true;
        }
    }

    const meetingDataToCreate = {
        name: meetingData.meeting.name,
        description: meetingData.meeting.description,
        urlIdentifier: identifier,
        userId: userData?.user?.id ?? undefined,
        chatInstanceId: userData?.chat_instance ?? undefined,
    };

    const newMeeting = await prisma.meeting.create({
        data: meetingDataToCreate,
    });

    return newMeeting;
}
