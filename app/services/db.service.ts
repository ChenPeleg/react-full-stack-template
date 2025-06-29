import { PrismaClient } from "@prisma/client";
import { AbstractBaseService } from "~/_core/services/AbstractBaseService";
import { ServicesResolver } from "~/_core/services/ServiceResolverClass";
import { LoggerService } from "./logger.service";
import { db } from "~/_core/server/db.server";

// This service is responsible for managing the database connection and operations only within server-side code.
export class DbService extends AbstractBaseService {
  constructor(servicesResolver: ServicesResolver) {
    super(servicesResolver);
  }

  private get logger(): LoggerService {
    return this.servicesResolver.getService(LoggerService);
  }

  get db(): PrismaClient {
    return db;
  }

  async disconnect(): Promise<void> {
    try {
      this.logger.info("Disconnecting from database");
      await db.$disconnect();
      this.logger.info("Successfully disconnected from database");
    } catch (error) {
      this.logger.error("Error disconnecting from database", {
        error: error instanceof Error ? error.message : "Unknown error",
      });
      throw error;
    }
  }
}
