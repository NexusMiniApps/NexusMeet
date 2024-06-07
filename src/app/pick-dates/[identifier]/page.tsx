"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState, useEffect } from "react";
import DatePickerTable from "@/components/DatePickerTable";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { Spinner } from "@/components/ui/spinner";
import type { Meeting, ApiResponse } from "@/lib/types";

export default function PickDates() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [meeting, setMeeting] = useState<Meeting | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);
  const router = useRouter();
  const pathname = usePathname();
  const identifier = pathname.split("/")[2];

  useEffect(() => {
    if (identifier) {
      fetch(`/api/getMeeting/${identifier}`)
        .then((response) => response.json())
        .then((data: ApiResponse) => {
          if (data.error) {
            setError(data.error);
            setMeeting(null);
          } else if (data.meeting) {
            setMeeting(data.meeting);
          } else {
            setError("Meeting data is missing");
            setMeeting(null);
          }
          setLoading(false);
        })
        .catch((error: Error) => {
          console.error("Error fetching meeting data:", error);
          setError("Error fetching meeting data");
          setLoading(false);
          setMeeting(null);
        });
    }
  }, [identifier]);

  const handleCancel = (dateToRemove: Date) => {
    setSelectedDates(selectedDates.filter((date) => date !== dateToRemove));
  };

  const clearError = () => {
    setError(null);
  };

  const onSubmit = () => {
    if (selectedDates.length === 0) {
      setError("Pick at least 1 date to continue.");
      return;
    }
    if (selectedDates.length > 5) {
      setError("Too many dates selected! Choose less options to make it easier for everyone.");
      return;
    }
    setSubmitting(true);
    const dateStrings = selectedDates.map((date) => date.toISOString());

    fetch(`/api/meetingDates/${identifier}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        meetingId: identifier,
        dates: dateStrings,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to save dates');
        }
        return response.json();
      })
      .then((data) => {
        console.log("Dates saved successfully", data);
        router.push(`/pick-time/${identifier}`);
      })
      .catch((error) => {
        console.error("Error saving dates:", error);
        setError("Error saving dates");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-blue-300">
        <Spinner className="mt-10 text-blue-800" size="large" />
      </div>
    );
  }

  console.log(meeting)
  return (
    <main className="flex min-h-screen flex-col items-center space-y-2 bg-gradient-to-b from-white to-blue-300 text-blue-800">
      {meeting ? (
        <>
        <div className="bg-gradient-to-br from-blue-100 to-blue-300 flex items-center flex-col rounded-md shadow-md p-3 w-72">
          <div>
            <strong>{meeting.name}</strong>
          </div>
          <div className="text-sm">
            {meeting.description ?? 'No description provided'}
          </div>
          {meeting.user && (
            <div>
              <strong>User:</strong> {meeting.user.first_name} {meeting.user.last_name ?? ''} ({meeting.user.username ?? 'No username'})
            </div>
          )}
          </div>
          <div className="py-2 w-72 text-md text-center">
            What days would you like to suggest for the meeting?
          </div>
          <Calendar
            mode="multiple"
            selected={selectedDates}
            onSelect={(dates) => {
              setSelectedDates(dates ?? []);
              clearError();
            }}
            className="rounded-md border bg-gradient-to-tl from-blue-200 to-white shadow-md"
          />
          <div className="border-b-2 border-blue-300 pt-4 text-lg">
            Selected Dates:
          </div>
          <DatePickerTable
            selectedDates={selectedDates}
            handleCancel={handleCancel}
            clearError={clearError}
          />
          {error && (
            <div className="max-w-72 text-center text-sm text-red-600 rounded-sm pb-2 bg-opacity-30">
              {error}
            </div>
          )}
          {selectedDates.length > 0 && (
            <Button
              className="w-40 max-w-72 bg-blue-800"
              onClick={onSubmit}
              onFocus={clearError}
              disabled={submitting}
            >
              {submitting ? "Loading..." : "Next"}
            </Button>
          )}
        </>
      ) : (
        <div>{error ? error : "Meeting data not available"}</div>
      )}
    </main>
  );
}
