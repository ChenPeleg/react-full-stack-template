import { AppConfiguration } from '../models/AppConfiguration';

export const prodAppConfig: AppConfiguration = {
    apiBaseUrl: '/',
    environment: 'production',
    isDevelopment: false,
    minWebViewVersion: 118,
    accessTokenReplaceDiffInDays: 2,
    features: {
        enableDevTools: true,
        disableAssignToOther: true,
        showMobilePhoneFrame: true,
        fixIphoneKeyboardResize: true,
    },
    devOnlyFeatures: {
        dontRedirectAndThrowOnError: false,
        showDevMenu: false,
    },
};
