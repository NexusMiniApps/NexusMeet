"use client";

import { useState, useEffect } from "react";
import TimeSelectionGrid from "@/components/TimeSelectionGrid";
import { Spinner } from "@/components/ui/spinner";
import { usePathname } from "next/navigation";
import type { ApiResponse, MeetingDate } from "@/lib/types";

export default function PickTime() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();
  const identifier = pathname.split("/")[2];

  useEffect(() => {
    if (identifier) {
      fetch(`/api/meetingDates/${identifier}`)
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          if (data.meetingDates && Array.isArray(data.meetingDates)) {
            const dates = data.meetingDates.map((meetingDate: MeetingDate) => new Date(meetingDate.date));
            setSelectedDates(dates);
          }
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching dates:", error);
          setLoading(false);
        });
    }
  }, [identifier]);

  if (loading) {
    return <div className="flex min-h-screen flex-col items-center  bg-gradient-to-b from-white to-blue-300"><Spinner className="mt-10 text-blue-800" size="large"/></div>;
  }

  return (
    <main className="flex min-h-screen flex-col items-center space-y-2 bg-gradient-to-b from-white to-blue-300 text-blue-800">
      <div className="pt-2">Select your availability.</div>
      {selectedDates.length > 0 && (
        <TimeSelectionGrid selectedDates={selectedDates} />
      )}
    </main>
  );
}
