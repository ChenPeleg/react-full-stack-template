import { AbstractBaseService } from "~/_core/services/AbstractBaseService";
import { ServicesResolver } from "~/_core/services/ServiceResolverClass";

export class DevToolsService extends AbstractBaseService {
  constructor(servicesResolver: ServicesResolver) {
    super(servicesResolver);
  }
  areDevToolsEnabled(): boolean {
    return true;
  }

  isUseIntervalVeryLong(): boolean {
    return this.areDevToolsEnabled();
  }
}
