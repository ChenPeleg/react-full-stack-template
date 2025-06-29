import { AppConfiguration } from '~/models/AppConfiguration';

export const devAppConfig: AppConfiguration = {
    apiBaseUrl: '/',
    environment: 'development',
    isDevelopment: true,
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
        showDevMenu: true,
    },
};
