// types.ts
export interface User {
  id: string;
  telegramId: bigint;
  first_name: string;
  last_name?: string;
  username?: string;
}
export interface InitData {
  user?: User;
  chat_instance?: string;
  chat_type?: string;
  auth_date?: string;
  message?: string;
}

export interface Meeting {
  name: string;
  description?: string;
  user?: User;
}

export interface MeetingData {
  meeting: Meeting;
}

export interface CreateMeetingRequest {
  meetingName: string;
  meetingDescription: string;
  user?: {
    id: string;
    telegramId: bigint;
    first_name: string;
    last_name?: string;
    username?: string;
  };
  chat_instance?: string;
  chat_type?: string;
  auth_date?: string;
}

export interface DateRequest {
  dates: string[];
}

export interface ApiResponse {
  error?: string;
  meeting?: Meeting;
  meetingDates?: MeetingDate[];
}

export interface MeetingDate {
  date: string;
}