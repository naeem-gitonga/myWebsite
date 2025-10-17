"use client";
import { useEffect } from "react";

export default function Redirector({
  url,
  delayMs = 1000,
}: {
  url: string;
  delayMs?: number;
}) {
  useEffect(() => {
    if (!url) {
      console.error("No or invalid redirect URL");
      return;
    }

    const timer = setTimeout(() => {
      // Use replace() to avoid adding an extra history entry
      window.location.replace(url);
    }, delayMs);

    return () => clearTimeout(timer);
  }, [url, delayMs]);

  return null; // client logic only
}
