import { devAppConfig } from './config.dev';
import { prodAppConfig } from './config.prod';
import { testAppConfig } from './config.tests';
import { AppConfiguration } from '~/models/AppConfiguration';

type envType = 'development' | 'production' | 'test' | 'staging';

const dynamicFields: { buildDate: string; appVersion: string } = {
    buildDate: import.meta.env.VITE_BUILD_DATE,
    appVersion: import.meta.env.VITE_APP_VERSION,
};

const getApplicationConfig = (envName: envType) => {
    switch (envName) {
        case 'development':
            return { ...devAppConfig, ...dynamicFields };
        case 'production':
            return { ...prodAppConfig, ...dynamicFields };
        case 'test':
            return { ...testAppConfig, ...dynamicFields };
        default:
            return { ...prodAppConfig, ...dynamicFields };
    }
};
export const appConfig: AppConfiguration = getApplicationConfig(
    import.meta.env.VITE_MODE_NAME as envType
) as AppConfiguration;

// @ts-expect-error - Vite specific environment variable
if (import.meta.vitest) {
    // @ts-expect-error - Vite specific environment variable
    const { it, expect, describe } = import.meta.vitest;
    describe('App config types for different environments', () => {
        it('should return devAppConfig for development environment', () => {
            const actual = getApplicationConfig('development');
            expect(actual).toEqual(devAppConfig);
        });
        it('should return prodAppConfig for production environment', () => {
            const actual = getApplicationConfig('production');
            expect(actual).toEqual(prodAppConfig);
        });
        it('should return testAppConfig for test environment', () => {
            const actual = getApplicationConfig('test');
            expect(actual).toEqual(testAppConfig);
        });
        it('should return prodAppConfig for unknown environment', () => {
            const actual = getApplicationConfig('unknown' as envType);
            expect(actual).toEqual(prodAppConfig);
        });
    });
}
