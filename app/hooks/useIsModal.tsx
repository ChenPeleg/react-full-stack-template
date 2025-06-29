import { useSearchParams } from 'react-router';
import {ModeSearchParams} from '~/models/AppSearchParams';

export const useIsModal = () => {
    const [params] = useSearchParams()
    return params.get('mode') === ModeSearchParams.SelectFolder
}
