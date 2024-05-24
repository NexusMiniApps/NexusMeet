// pages/api/initUser.ts
import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import crypto from 'crypto';

type User = {
  id: number;
  first_name: string;
  last_name: string | null;
  username: string | null;
  language_code?: string;
  allows_write_to_pm?: boolean;
};

type ParsedInitData = {
  user: User;
  chat_instance: string | null;
  chat_type: string | null;
  auth_date: string | null;
};

interface InitUserRequestBody {
  initData: string;
}

const prisma = new PrismaClient();
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN!;

function validateInitData(initData: string, telegramBotToken: string): boolean {
  const params = new URLSearchParams(initData);
  const hash = params.get('hash');
  params.delete('hash');

  const dataCheckString = Array.from(params.entries())
    .map(([key, value]) => `${key}=${value}`)
    .sort()
    .join('\n');

  const secretKey = crypto
    .createHmac('sha256', 'WebAppData')
    .update(telegramBotToken)
    .digest();

  const calculatedHash = crypto
    .createHmac('sha256', secretKey)
    .update(dataCheckString)
    .digest('hex');

  return calculatedHash === hash;
}

function parseInitData(initData: string): ParsedInitData {
  const params = new URLSearchParams(initData);
  const userParam = params.get('user');
  const user: User = JSON.parse(decodeURIComponent(userParam!)) as User;

  return {
    user,
    chat_instance: params.get('chat_instance'),
    chat_type: params.get('chat_type'),
    auth_date: params.get('auth_date'),
  };
}

export async function POST(req: NextRequest) {
  try {
    const body: InitUserRequestBody = await req.json() as InitUserRequestBody
    const initData: string = body.initData;
    console.log("Raw initData:", initData);

    if (!initData) {
      return new NextResponse(
        JSON.stringify({ error: 'Init data is required.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    if (!validateInitData(initData, TELEGRAM_BOT_TOKEN)) {
      return new NextResponse(
        JSON.stringify({ error: 'Invalid init data.' }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const { user, chat_instance, chat_type, auth_date } = parseInitData(initData);

    console.log("Parsed user:", user);
    console.log("Chat instance:", chat_instance);
    console.log("Chat type:", chat_type);
    console.log("Auth date:", auth_date);

    const { id, first_name, last_name, username } = user;

    const existingUser = await prisma.user.findUnique({
      where: { telegramId: id },
    });

    if (existingUser) {
      return new NextResponse(
        JSON.stringify({ message: 'User already exists.', user, chat_instance, chat_type, auth_date }),
        {
          status: 200,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const newUser = await prisma.user.create({
      data: {
        telegramId: id,
        firstName: first_name,
        lastName: last_name ?? null,
        username: username ?? null,
      },
    });

    return new NextResponse(
      JSON.stringify({ message: 'New user created.', user, chat_instance, chat_type, auth_date }),
      {
        status: 201,
        headers: { 'Content-Type': 'application/json' },
      }
    );

  } catch (error) {
    console.error("Error in POST handler:", error);
    return new NextResponse(
      JSON.stringify({ error: 'Internal server error.' }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' },
      }
    );
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 204,
    headers: {
      'Allow': 'POST, OPTIONS',
    },
  });
}