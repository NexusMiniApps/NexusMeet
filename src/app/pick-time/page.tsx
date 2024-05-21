"use client";

import TimeSelectionGrid from "@/components/TimeSelectionGrid";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";

export default function HomePage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([]);
  return (
    <main className="flex min-h-screen flex-col items-center space-y-2 bg-gradient-to-b from-white to-blue-300 text-blue-800">
      <div className="pt-2">Select your availability.</div>
      {selectedDates.length > 0 && (
        <TimeSelectionGrid selectedDates={selectedDates} />
      )}
      <div className="max-w-72 pb-2 pt-20 text-center">
        TODO: put in backend for fetching dates. For now, you can select from
        the calendar to view the datepicker
      </div>

      <Calendar
        mode="multiple"
        selected={selectedDates}
        onSelect={(dates) => {
          setSelectedDates(dates ?? []);
        }}
        className="rounded-md border bg-gradient-to-tl from-blue-400 to-white shadow-md"
      />
    </main>
  );
}
