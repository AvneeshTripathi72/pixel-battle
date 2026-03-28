import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { SocketProvider } from "../context/SocketContext";

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
});

const outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
});

export const metadata = {
  title: "Pixel Warriors | Live Shared Grid",
  description: "A real-time shared pixel grid for claiming tiles and competing for the leaderboard.",
  keywords: "nextjs, socketio, real-time, pixel art, shared grid, interactive",
  openGraph: {
    title: "Pixel Warriors | Live Shared Grid",
    description: "Pick your color, claim your tiles!",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} ${outfit.variable} font-sans antialiased text-zinc-950 dark:text-zinc-50 tracking-tight bg-white dark:bg-black`}>
        <SocketProvider>
          {children}
        </SocketProvider>
      </body>
    </html>
  );
}
