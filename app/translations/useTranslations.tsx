import {useContext} from 'react';
import {SessionContext} from '~/_core/sessionContext';
import {Language} from '~/translations/language';
import {i18n_en} from '~/translations/language.en';
import {i18n_he} from '~/translations/language.he';

export const useTranslation = (): ((key: string) => string) => {
    const language = useContext(SessionContext).language;


    return (key: string): string => {
        let returnKey = ''
        switch (language) {
            case Language.en:
                returnKey =  i18n_en[key] || key;
                break;
            case Language.he:
                returnKey=  i18n_he[key] || key;
                break
            default:
                returnKey =  key;
        }
        return returnKey;
    };
};
