"use client";

import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";

export default function HomePage() {
  const [date, setDate] = useState<Date | undefined>(new Date());
  return (
    <main className="flex min-h-screen flex-col items-center justify-center space-y-8 bg-gradient-to-b from-white to-blue-300 text-blue-800">
      <div>What days would you like to meet on?</div>
      <Calendar
        mode="single"
        selected={date}
        onSelect={setDate}
        className="rounded-md border"
      />
    </main>
  );
}
