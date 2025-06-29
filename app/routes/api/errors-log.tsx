import { servicesLocator } from "~/_core/services/services.locator";
import { LoggerService } from "~/services/logger.service";
import type { ActionFunctionArgs } from "react-router";

export async function action({ request }: ActionFunctionArgs) {
  try {
    const formData = await request.formData();
    const errorData = {
      message: formData.get('message'),
      stack: formData.get('stack'),
      url: formData.get('url'),
      timestamp: formData.get('timestamp'),
      userAgent: formData.get('userAgent'),
    };
    
    const logger = servicesLocator(LoggerService);
    logger.error("Client Error", errorData);
    
    return Response.json({ success: true });
  } catch (error) {
    const logger = servicesLocator(LoggerService);
    logger.error("Error logging failed", { error });
    return Response.json({ success: false, error: "Failed to log error" }, { status: 500 });
  }
}

// Add a loader function to handle GET requests
export async function loader() {
  return Response.json({ status: "ok" });
}

// Add a default export to make this a valid route
export default function ErrorLogRoute() {
  return null;
}
