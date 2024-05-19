import "@components/ @styles/ @utils/styles/globals.css";

// import { GeistSans } from "geist/font/sans";
import { Quicksand } from "next/font/google";

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
      <body>{children}</body>
    </html>
  );
}
