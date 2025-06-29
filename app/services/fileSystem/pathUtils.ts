import path from "path";
import { PathSegment } from '~/models/file-system';

export class PathUtils {
  static createPathSegments(currentPath: string): PathSegment[] {
    const pathSegments: PathSegment[] = [];

    if (currentPath === "/") {
      return [
        {
          name: "root",
          path: "/",
        },
      ];
    }

    let currentSegment = "";
    currentPath
      .split(path.sep)
      .filter(Boolean)
      .forEach((segment) => {
        currentSegment = path.join(currentSegment, segment);
        pathSegments.push({
          name: segment,
          path: currentSegment,
        });
      });

    return pathSegments;
  }

  static getParentPath(currentPath: string): string {
    // If we're at root, stay at root
    if (currentPath === "/") {
      return "/";
    }
    return path.dirname(currentPath);
  }

  static normalizePath(inputPath: string): string {
    // If it's root, return as is
    if (inputPath === "/") {
      return "/";
    }

    // Remove any trailing slashes and dots
    let normalized = inputPath.replace(/[\\/]+$/, "").replace(/\.$/, "");

    // If it's a Windows path (starts with drive letter)
    if (/^[a-zA-Z]:/.test(normalized)) {
      // Handle drive root (e.g., "C:" or "C:.")
      if (normalized.length <= 3) {
        return normalized.replace(/^([a-zA-Z]:)(\.)?$/, "$1\\");
      }

      // Ensure there's a backslash after the drive letter
      if (!/^[a-zA-Z]:\\/.test(normalized)) {
        normalized = normalized.replace(/^([a-zA-Z]:)/, "$1\\");
      }
      // Ensure we don't have duplicate path segments
      const parts = normalized.split(/[\\/]+/);
      const drive = parts[0];
      const rest = parts.slice(1);
      return path.join(drive, ...rest);
    }

    // If it's a relative path, make it absolute
    if (!normalized.startsWith("/")) {
      normalized = path.resolve(process.cwd(), normalized);
    }

    return normalized;
  }

  static getLastPathSegment(inputPath: string): string {
    // Handle root path
    if (inputPath === "/") {
      return "root";
    }

    // Handle Windows drive root
    if (/^[a-zA-Z]:\\?$/.test(inputPath)) {
      return inputPath.replace(/\\$/, "");
    }

    // Get the last segment of the path
    const segments = inputPath.split(/[\\/]+/).filter(Boolean);
    return segments[segments.length - 1] || "root";
  }
}
