"use client";

import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider, Progress } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { useEffect, useState, Suspense } from "react";
import { usePathname } from "next/navigation";
import "../styles/globals.css";
import "@mantine/tiptap/styles.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [isPageLoading, setIsPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = () => {
      setIsPageLoading(true);
      setProgress(20);
    };

    const handleComplete = () => {
      setProgress(100);
      setTimeout(() => {
        setIsPageLoading(false);
        setProgress(0);
      }, 300);
    };

    handleStart();
    const timeout = setTimeout(handleComplete, 1000);
    return () => clearTimeout(timeout);
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <ColorSchemeScript />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#000000" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
      </head>
      <body>
        <MantineProvider>
          {isPageLoading && (
            <Progress
              value={progress}
              color="blue"
              size="xs"
              style={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
              }}
            />
          )}{" "}
          <Notifications position="top-right" zIndex={9999} />
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </MantineProvider>
      </body>
    </html>
  );
}
