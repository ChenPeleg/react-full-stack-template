import { describe, it, expect, beforeEach } from "vitest";
import { servicesProvider } from "~/_core/services/services.provider";
import { ServicesResolver } from "../../app/_core/services/ServiceResolverClass";
import { DevToolsService } from "../../app/services/DevTools.service";
import { AbstractBaseService } from "../../app/_core/services/AbstractBaseService";

describe("ServicesProvider", () => {
  it("should create a ServicesResolver instance", () => {
    expect(servicesProvider).toBeInstanceOf(ServicesResolver);
  });

  it("should have services injected", () => {
    expect(servicesProvider).toBeDefined();
  });

  it("should resolve DevToolsService", () => {
    const devToolsService = servicesProvider.getService(DevToolsService);
    expect(devToolsService).toBeInstanceOf(DevToolsService);
  });

  it("should have DevToolsService methods working", () => {
    const devToolsService = servicesProvider.getService(DevToolsService);
    expect(devToolsService.areDevToolsEnabled()).toBe(true);
    expect(devToolsService.isUseIntervalVeryLong()).toBe(true);
  });

  it("should throw error when requesting non-existent service", () => {
    class NonExistentService extends AbstractBaseService {
      constructor(servicesResolver: ServicesResolver) {
        super(servicesResolver);
      }
    }
    expect(() => servicesProvider.getService(NonExistentService)).toThrow();
  });

  describe("Service Factory", () => {
    it("should create service using factory method", () => {
      const devToolsService = servicesProvider.getService(DevToolsService);
      expect(devToolsService).toBeInstanceOf(DevToolsService);
      // Verify the service has access to the resolver through its methods
      expect(devToolsService.areDevToolsEnabled()).toBe(true);
    });
  });

  describe("Service Dependencies", () => {
    it("should maintain service singleton instances", () => {
      const service1 = servicesProvider.getService(DevToolsService);
      const service2 = servicesProvider.getService(DevToolsService);
      expect(service1).toBe(service2); // Same instance
    });
  });
});
