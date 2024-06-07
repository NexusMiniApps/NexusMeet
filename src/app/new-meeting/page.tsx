"use client";

import { MeetingForm } from "@/components/MeetingForm";
import { Spinner } from "@/components/ui/spinner";
import { useInitData } from "@/lib/useInitData";

const NewMeeting = () => {
  const { userData, loading } = useInitData();

  const formatAuthDate = (auth_date: string | null | undefined) => {
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

      <div>For development purposes only:</div>
      <div className="mt-4 rounded border p-4 shadow">
        <h2 className="text-md mb-4 font-bold">User Information</h2>
        {loading ? (
          <Spinner />
        ) : userData ? (
          <>
            <p>
              <strong>ID:</strong> {userData.user?.id}
            </p>
            <p>
              <strong>First Name:</strong> {userData.user?.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.user?.last_name}
            </p>
            <p>
              <strong>Username:</strong> {userData.user?.username}
            </p>
            <p>
              <strong>Chat Instance:</strong> {userData.chat_instance}
            </p>
            <p>
              <strong>Chat Type:</strong> {userData.chat_type}
            </p>
            <p>
              <strong>Auth Date:</strong> {formatAuthDate(userData.auth_date)}
            </p>
          </>
        ) : (
          <p>No Telegram Init Data.</p>
        )}
      </div>
    </main>
  );
};

export default NewMeeting;
