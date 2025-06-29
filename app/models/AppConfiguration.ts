export interface AppConfiguration {
    apiBaseUrl: string;
    environment: 'staging' | 'production' | 'development' | 'test' | 'demo';
    isDevelopment: boolean;
    minWebViewVersion: number;
    accessTokenReplaceDiffInDays: number;
    features: {
        enableDevTools: boolean;
        disableAssignToOther: boolean;
        showMobilePhoneFrame: boolean;
        fixIphoneKeyboardResize: boolean;
    };
    devOnlyFeatures: {
        showDevMenu: boolean;
        dontRedirectAndThrowOnError: boolean;
    };
    /**
     * This will be pulled from the env variables (Vite define plugin)
     */
    buildDate?: string;
    appVersion?: string;
}
