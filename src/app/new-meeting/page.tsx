"use client";

import { MeetingForm } from "@/components/MeetingForm";
import { retrieveLaunchParams } from "@tma.js/sdk";
import { useEffect, useState, useRef } from "react";
import { Spinner } from "@/components/ui/spinner";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}

interface InitData {
  user: User;
  chat_instance: string;
  chat_type: string;
  auth_date: string;
  message: string;
}

interface InitDataResponse {
  message: string;
  user: User;
  chat_instance: string;
  chat_type: string;
  auth_date: string;
}

const HomePage = () => {
  const [userData, setUserData] = useState<InitData | null>(null);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;

    const { initDataRaw } = retrieveLaunchParams();
    console.log("TESTLOG");
    console.log(initDataRaw);

    if (initDataRaw) {
      fetch("/api/initUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ initData: initDataRaw }),
      })
        .then((response) => response.json())
        .then((data: InitDataResponse) => {
          console.log("Success:", data);
          setUserData(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });

      hasFetchedRef.current = true;
    }
  }, []);

  const formatAuthDate = (auth_date: string | null) => {
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
        {userData ? (
          <>
            <p>
              <strong>ID:</strong> {userData.user.id}
            </p>
            <p>
              <strong>First Name:</strong> {userData.user.first_name}
            </p>
            <p>
              <strong>Last Name:</strong> {userData.user.last_name}
            </p>
            <p>
              <strong>Username:</strong> {userData.user.username}
            </p>
            <p>
              <strong>Chat Instance:</strong> {userData.chat_instance}
            </p>
            <p>
              <strong>Chat Type:</strong> {userData.chat_type}
            </p>
            <p>
              <strong>Auth Date:</strong> {formatAuthDate(userData.auth_date)}
            </p>{" "}
          </>
        ) : (
          <Spinner />
        )}
      </div>
    </main>
  );
};

export default HomePage;
