import { MeetingForm } from "@/components/MeetingForm";

export default function HomePage() {
  return (
    <main className="justify-top flex min-h-screen flex-col items-center bg-gradient-to-b from-white to-blue-300 text-blue-800">
      <MeetingForm />
    </main>
  );
}
