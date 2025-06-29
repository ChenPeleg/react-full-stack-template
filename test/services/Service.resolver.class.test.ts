import { describe, it, expect, beforeEach } from "vitest";

import { AbstractBaseService } from "../../app/_core/services/AbstractBaseService";
import {
  ServiceConstructorClass,
  ServicesResolver,
  ServiceWithFactoryFunction,
  ServiceWithSpecificToken,
} from "../../app/_core/services/ServiceResolverClass";
import { appConfig } from "~/configuration/appConfig";

class TestService extends AbstractBaseService {
  constructor(servicesProvider: ServicesResolver) {
    super(servicesProvider);
  }
}

class AnotherTestService extends AbstractBaseService {
  constructor(servicesProvider: ServicesResolver) {
    super(servicesProvider);
  }
}

describe("ServicesResolver", () => {
  let servicesResolver: ServicesResolver;

  beforeEach(() => {
    servicesResolver = new ServicesResolver([]);
  });

  it("should add and retrieve a service by class", () => {
    servicesResolver = new ServicesResolver([TestService]);
    const service = servicesResolver.getService(TestService);
    expect(service).toBeInstanceOf(TestService);
  });

  it("should throw an error when retrieving a non-existent service", () => {
    expect(() => servicesResolver.getService(TestService)).toThrowError(
      "[ServicesResolver] Service TestService does not exist"
    );
  });

  it("should add and retrieve a service by specific token", () => {
    const token = "TestServiceToken";
    const serviceWithToken: ServiceWithSpecificToken = {
      provide: token,
      useClass: TestService,
    };
    servicesResolver = new ServicesResolver([serviceWithToken]);
    const service = servicesResolver.getService(
      token as unknown as ServiceConstructorClass
    );
    expect(service).toBeInstanceOf(TestService);
  });

  it("should add and retrieve a service by factory function", () => {
    const token = "TestServiceFactoryToken";
    const serviceWithFactory: ServiceWithFactoryFunction = {
      provide: token,
      useFactory: (resolver) => new TestService(resolver),
    };
    servicesResolver = new ServicesResolver([serviceWithFactory]);
    const service = servicesResolver.getService(
      token as unknown as ServiceConstructorClass
    );
    expect(service).toBeInstanceOf(TestService);
  });

  it("should add multiple services and retrieve them", () => {
    servicesResolver = new ServicesResolver([TestService, AnotherTestService]);
    const testService = servicesResolver.getService(TestService);
    const anotherTestService = servicesResolver.getService(AnotherTestService);
    expect(testService).toBeInstanceOf(TestService);
    expect(anotherTestService).toBeInstanceOf(AnotherTestService);
  });

  describe("overrideServices", () => {
    class MockTestService extends AbstractBaseService {
      constructor(servicesProvider: ServicesResolver) {
        super(servicesProvider);
      }
    }

    class NewTestService extends AbstractBaseService {
      constructor(servicesProvider: ServicesResolver) {
        super(servicesProvider);
      }
    }

    beforeEach(() => {
      // Set environment to test for overrideServices to work
      appConfig.environment = "test";
    });

    it("should override an existing service", () => {
      servicesResolver = new ServicesResolver([TestService]);
      const originalService = servicesResolver.getService(TestService);
      expect(originalService).toBeInstanceOf(TestService);

      servicesResolver.overrideServices([MockTestService]);
      const overriddenService = servicesResolver.getService(MockTestService);
      expect(overriddenService).toBeInstanceOf(MockTestService);
    });

    it("should add a new service through override", () => {
      servicesResolver = new ServicesResolver([TestService]);
      expect(() => servicesResolver.getService(NewTestService)).toThrow();

      servicesResolver.overrideServices([NewTestService]);
      const newService = servicesResolver.getService(NewTestService);
      expect(newService).toBeInstanceOf(NewTestService);
    });

    it("should throw error when used outside test environment", () => {
      appConfig.environment = "development";
      servicesResolver = new ServicesResolver([TestService]);

      expect(() =>
        servicesResolver.overrideServices([MockTestService])
      ).toThrow(
        "[ServicesResolver] overrideServices can only be used in test environment"
      );
    });
  });
});
