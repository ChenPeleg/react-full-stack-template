import {ServiceInjectionMethod} from '~/_core/services/ServiceResolverClass';
import {DevToolsService} from '~/services/DevTools.service';
import {LoggerService} from '~/services/logger.service';
import {DbService} from '~/services/db.service';

export const servicesInjected: ServiceInjectionMethod[] = [{
    provide: DevToolsService,
    useFactory: (serviceResolver) => new DevToolsService(serviceResolver),
}, {
    provide: LoggerService,
    useClass: LoggerService,
},


    {
        provide: DbService,
        useClass: DbService,
    },

];
