// src/hooks/useInitData.ts
import { useState, useEffect, useRef } from "react";
import { retrieveLaunchParams } from "@tma.js/sdk";
import type { InitData } from "@/lib/types";

export const useInitData = () => {
  const [userData, setUserData] = useState<InitData | null>(null);
  const [loading, setLoading] = useState(true);
  const hasFetchedRef = useRef(false);

  useEffect(() => {
    if (hasFetchedRef.current) return;

    setLoading(true);

    let initDataRaw;
    try {
      initDataRaw =JSON.stringify(retrieveLaunchParams());
    } catch (error) {
      console.error("Failed to retrieve launch parameters:", error);
      initDataRaw ="user=%7B%22id%22%3A1974360207%2C%22first_name%22%3A%22Janessa%22%2C%22last_name%22%3A%22%22%2C%22username%22%3A%22jnssay%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=3036559886319002457&chat_type=supergroup&auth_date=1719500715&hash=769768530622305f3cc30bd74178ebabe7ec9d8f58bc68a42630968ff06995a9"
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
        .then((data: InitData) => {
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

  console.log("userData", userData, "loading", loading)
  return { userData, loading };
};
