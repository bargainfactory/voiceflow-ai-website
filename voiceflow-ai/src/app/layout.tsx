import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "../i18n/LanguageContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "VoiceFlow AI | AI Chatbots & Voice Agents for 24/7 Customer Service",
  description:
    "Cut support costs 70% with custom AI chatbots and voice agents. Built with Voiceflow, ElevenLabs, and Twilio for 24/7 customer service, lead qualification, and appointment booking.",
  keywords: "AI chatbot, voice agent, customer service automation, Voiceflow, ElevenLabs, Twilio, lead qualification",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="min-h-screen">
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
