// useLangDirections.tsx
import {useContext, useMemo} from 'react';
import {SessionContext} from '~/_core/sessionContext';
import {Language} from '~/translations/language';
import {i18n_en} from '~/translations/language.en';
import {i18n_he} from '~/translations/language.he';
import {getLangDirection} from '~/translations/getLangDirection';
export const useLangDirections = ()  => {
    const language = useContext(SessionContext).language;


    return  getLangDirection(language as Language)
};
