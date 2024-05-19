import { MeetingForm } from "@/components/MeetingForm";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-white to-blue-300 text-blue-800">
      <MeetingForm />
    </main>
  );
}
