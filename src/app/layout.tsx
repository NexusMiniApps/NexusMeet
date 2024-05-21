import "@components/ @styles/ @utils/styles/globals.css";

import { Quicksand } from "next/font/google";
import NexusMeetLogo from "@/assets/nexusmeet.svg";

const quicksand = Quicksand({ subsets: ["latin"] });

export const metadata = {
  title: "NexusMeet",
  description: "Nexus Tools Suite for Telegram Mini Apps",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={quicksand.className}>
      <body>
        <div className="w-full flex-col items-center justify-center">
          <NexusMeetLogo className="mx-auto w-full max-w-96 px-20" />
          {children}
        </div>
      </body>
    </html>
  );
}
