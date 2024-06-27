"use client";

import { MeetingForm } from "@/components/MeetingForm";
import { useInitData } from "@/lib/useInitData";
import UserData from "@/components/UserData";
import { retrieveLaunchParams } from "@tma.js/sdk";

let initDataRaw;
try {
  initDataRaw = JSON.stringify(retrieveLaunchParams());
  console.log(initDataRaw);
} catch (error) {
  console.error("Failed to retrieve launch parameters:", error);
}

const NewMeeting: React.FC = () => {
  const { userData, loading } = useInitData();

  const formatAuthDate = (auth_date: string | null | undefined): string => {
    if (auth_date) {
      const timestamp = Number(auth_date);
      if (!isNaN(timestamp)) {
        return new Date(timestamp * 1000).toLocaleString();
      }
    }
    return "Invalid date";
  };

  return (
    <main className="justify-top flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-blue-300 text-blue-800">
      <MeetingForm />
      <UserData
        userData={userData}
        loading={loading}
        formatAuthDate={formatAuthDate}
      />
    </main>
  );
};

export default NewMeeting;
