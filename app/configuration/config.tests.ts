import { AppConfiguration } from '~/models/AppConfiguration';

export const testAppConfig: AppConfiguration = {
    apiBaseUrl: '/',
    environment: 'test',
    isDevelopment: true,
    minWebViewVersion: 118,
    accessTokenReplaceDiffInDays: 2,
    features: {
        enableDevTools: true,
        disableAssignToOther: true,
        showMobilePhoneFrame: false,
        fixIphoneKeyboardResize: true,
    },
    devOnlyFeatures: {
        dontRedirectAndThrowOnError: false,
        showDevMenu: false,
    },
};
