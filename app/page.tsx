"use client";
import { useCrossOriginMessages } from "@/useCrossOriginMessages";
import { useEffect } from "react";

export default function Home() {
  const { postMessage } = useCrossOriginMessages();
  useEffect(() => {
    postMessage({
      type: "initialized",
      message: "App initialized",
    });
  }, [postMessage]);
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      Iframed Sample Project
    </main>
  );
}
