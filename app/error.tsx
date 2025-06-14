"use client";
import GlobalError from "@/components/Error/GlobalError";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return <GlobalError error={error} resetAction={reset} />;
}
