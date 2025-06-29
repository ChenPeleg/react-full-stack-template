import { useFetcher } from "react-router";

export function useLogError() {
  const fetcher = useFetcher();

  const logError = (error: Error | string) => {
    const formData = new FormData();
    formData.append(
      "message",
      typeof error === "string" ? error : error.message
    );

    if (error instanceof Error && error.stack) {
      formData.append("stack", error.stack);
    }

    if (typeof window !== "undefined") {
      formData.append("url", window.location.href);
      formData.append("userAgent", navigator.userAgent);
    }

    formData.append("timestamp", new Date().toISOString());

    fetcher.submit(formData, { method: "POST", action: "/api/log-error" });
  };

  return {
    logError,
    isLogging: fetcher.state === "submitting",
  };
}
