"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import DatePickerTable from "@/components/DatePickerTable";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function HomePage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleCancel = (dateToRemove: Date) => {
    setSelectedDates(selectedDates.filter((date) => date !== dateToRemove));
  };

  const clearError = () => {
    setError(null);
  };

  const onSubmit = () => {
    if (selectedDates.length == 0) {
      setError("Pick at least 1 date to continue.");
      return;
    }
    if (selectedDates.length > 5) {
      setError(
        "Too many dates selected! Choose less options to make it easier for everyone.",
      );
      return;
    } else {
      //TODO: Add backend logic for sending dates in
      console.log("Form submitted");
      router.push("/pick-time");
    }
  };
  return (
    <main className="flex min-h-screen flex-col items-center space-y-2 bg-gradient-to-b from-white to-blue-300 text-blue-800">
      <div className="py-2">What days would you like to meet on?</div>
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
        <div className="max-w-72 text-center text-sm text-red-600">{error}</div>
      )}
      {selectedDates.length > 0 && (
        <Button
          className="w-40 max-w-72 bg-blue-800"
          onClick={onSubmit}
          onFocus={clearError}
        >
          Next
        </Button>
      )}
    </main>
  );
}
