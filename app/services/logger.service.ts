import { promises as fs } from "fs";
import path from "path";
import { AbstractBaseService } from "~/_core/services/AbstractBaseService";
import { ServicesResolver } from "~/_core/services/ServiceResolverClass";

type LogLevel = "info" | "warn" | "error" | "debug";

type LogData =
  | {
      path?: string;
      error?: string;
      itemCount?: number;
      driveCount?: number;
      [key: string]: unknown;
    }
  | unknown;

interface LogEntry {
  timestamp: string;
  level: LogLevel;
  message: string;
  data?: LogData;
}

export class LoggerService extends AbstractBaseService {
  private logDir: string;
  private logQueue: LogEntry[] = [];
  private isProcessing: boolean = false;
  private readonly MAX_QUEUE_SIZE = 100;
  private readonly FLUSH_INTERVAL = 5000; // 5 seconds

  constructor(servicesResolver: ServicesResolver) {
    super(servicesResolver);
    this.logDir = path.join(process.cwd(), "logs");
    // Initialize directory immediately
    this.initializeLogDirectory().then(() => {
      this.debug("Log directory initialized", { path: this.logDir });
    });
    this.startPeriodicFlush();
  }

  private async initializeLogDirectory() {
    try {
      await fs.mkdir(this.logDir, { recursive: true });
      // Force an immediate flush to ensure the directory is created
      await this.flush();
    } catch (error) {
      console.error("Failed to create log directory:", error);
    }
  }

  private getLogFileName(level: LogLevel): string {
    const date = new Date().toISOString().split("T")[0];
    return path.join(this.logDir, `${level}-${date}.log`);
  }

  private formatLogEntry(entry: LogEntry): string {
    if (typeof entry.data !== "object") {
      entry.data = {
        timestamp: new Date().toISOString(),
        level: "info",
        message: String(entry),
      };
    }
    const logLine = JSON.stringify({
      timestamp: entry.timestamp,
      level: entry.level,
      message: entry.message,
      //@ts-expect-error this is handled
      ...(entry.data && { data: entry.data }),
    });
    return logLine + "\n";
  }

  private async writeLogs() {
    if (this.isProcessing || this.logQueue.length === 0) return;

    this.isProcessing = true;
    const logsByLevel = new Map<LogLevel, LogEntry[]>();

    // Group logs by level
    for (const entry of this.logQueue) {
      if (!logsByLevel.has(entry.level)) {
        logsByLevel.set(entry.level, []);
      }
      logsByLevel.get(entry.level)!.push(entry);
    }

    // Write logs for each level
    for (const [level, entries] of logsByLevel) {
      const logFile = this.getLogFileName(level);
      const logContent = entries
        .map((entry) => this.formatLogEntry(entry))
        .join("");

      try {
        await fs.appendFile(logFile, logContent);
      } catch (error) {
        console.error(`Failed to write ${level} logs:`, error);
      }
    }

    // Clear the queue
    this.logQueue = [];
    this.isProcessing = false;
  }

  private startPeriodicFlush() {
    setInterval(() => {
      this.writeLogs();
    }, this.FLUSH_INTERVAL);
  }

  private queueLog(level: LogLevel, message: string, data?: LogData) {
    const entry: LogEntry = {
      timestamp: new Date().toISOString(),
      level,
      message,
      data,
    };

    this.logQueue.push(entry);

    // If queue is too large, write logs immediately
    if (this.logQueue.length >= this.MAX_QUEUE_SIZE) {
      this.writeLogs();
    }
  }

  info(message: string, data?: LogData) {
    this.queueLog("info", message, data);
  }

  warn(message: string, data?: LogData) {
    this.queueLog("warn", message, data);
  }

  error(message: string, data?: LogData) {
    this.queueLog("error", message, data);
  }

  debug(message: string, data?: LogData) {
    this.queueLog("debug", message, data);
  }

  // Force immediate write of all queued logs
  async flush() {
    await this.writeLogs();
  }
}
