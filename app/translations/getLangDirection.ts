
import {Language} from '~/translations/language';

export const getLangDirection = (lang: Language): 'ltr' | 'rtl' => {
    switch (lang) {
        case Language.en:
            return 'ltr';
        case Language.he:
            return 'rtl';
        default:
            return 'ltr'; // Default to left-to-right for unsupported languages
    }
};
