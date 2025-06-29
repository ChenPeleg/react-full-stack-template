import {
   ServiceInjectionMethod,
  ServicesResolver,
} from '~/_core/services/ServiceResolverClass';
import { servicesInjected } from "~/services/_services.injected";

const servicesProviderFactory = (services: Array<ServiceInjectionMethod>) => {
  return new ServicesResolver(services);
};

export const servicesProvider = servicesProviderFactory(servicesInjected);
