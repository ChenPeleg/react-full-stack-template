import { useEffect } from "react";
import { isRouteErrorResponse, useNavigate, useRouteError } from "react-router";

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

export function ErrorBoundary({ children }: ErrorBoundaryProps) {
  const error = useRouteError();
  const navigate = useNavigate();

  useEffect(() => {

    if (!error) {
      return;
    }


    const reportError = async () => {
      try {
        const errorData = {
          message: isRouteErrorResponse(error) ? error.data : error instanceof Error ? error.message : "Unknown error",
          stack: error instanceof Error ? error.stack : undefined,
          url: window.location.href,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
        };

        await fetch("/api/log-error", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(errorData),
        });
      } catch (e) {
        console.error("Failed to report error:", e);
      }
    };

    reportError().then()
  }, [error]);

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-secondary">
        <div className="max-w-md w-full p-6 bg-surfaceHigh rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-red-600 mb-4">Oops! Something went wrong</h1>
          <p className="text-gray-600 mb-4">
            {isRouteErrorResponse(error)
              ? error.data
              : error instanceof Error
              ? error.message
              : "An unexpected error occurred"}
          </p>
          <button
            onClick={() => navigate(-1)}
            className="px-4 py-2 bg-primary text-white rounded hover:bg-primary transition-colors"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
} 
