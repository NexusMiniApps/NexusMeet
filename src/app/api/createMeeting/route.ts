// pages/api/createMeeting.ts
import { NextRequest, NextResponse } from 'next/server';
import { createMeeting } from "@/lib/meetingService";
import type { InitData, MeetingData, CreateMeetingRequest } from "@/lib/types";

export async function POST(req: NextRequest, res: NextResponse) {
  if (req.method !== "POST") {
    return new NextResponse(
      JSON.stringify({ error: 'Method not allowed' }),
      {
        status: 405,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }

  const requestData = await req.json() as CreateMeetingRequest;
  const { meetingName, meetingDescription, user, chat_instance, chat_type, auth_date } = requestData;

  const userData: InitData = {
    user: user,
    chat_instance: chat_instance,
    chat_type: chat_type,
    auth_date: auth_date,
  };

  const meetingData: MeetingData = {
    meeting: {
      name: meetingName,
      description: meetingDescription,
    }
  };

  try {
    const newMeeting = await createMeeting(userData, meetingData);
    return new NextResponse(
      JSON.stringify({ message: 'New meeting created.', identifier: newMeeting.urlIdentifier }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}
