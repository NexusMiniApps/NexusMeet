// src/hooks/useInitData.ts
import { useState, useEffect, useRef } from "react";
import { retrieveLaunchParams } from "@tma.js/sdk";

interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
}

interface InitData {
  user?: User;
  chat_instance?: string;
  chat_type?: string;
  auth_date?: string;
  message?: string;
}

interface InitDataResponse {
  message: string;
  user: User;
  chat_instance: string;
  chat_type: string;
  auth_date: string;
}

export const useInitData = () => {
  const [userData, setUserData] = useState<InitData | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;

    setLoading(true);

    let initDataRaw;
    try {
      initDataRaw = retrieveLaunchParams();
    } catch (error) {
      console.error("Failed to retrieve launch parameters:", error);
    }

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
          setUserData(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          setLoading(false);
        });

      hasFetchedRef.current = true;
    } else {
      setLoading(false);
    }
  }, []);

  return { userData, loading };
};
