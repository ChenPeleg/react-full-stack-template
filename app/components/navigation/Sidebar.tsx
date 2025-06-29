import {SidebarLinks} from '~/components/navigation/Sidebar.links';
import { Link } from 'react-router';
import {useTranslation} from '~/translations/useTranslations';

export const Sidebar = () => {
    const t = useTranslation()
    return <div role={'toolbar'} className={' flex flex-col h-full w-80   justify-start border-r border-slate-500'}>
        {SidebarLinks.map(l => (
            <Link to={l.path} key={l.path} className={'flex cursor-pointer flex-row items-center justify-start w-full h-10 hover:bg-slate-300'}>
            <span className={'w-8 h-5 block'}>  </span>
            <l.icon className={'w-4 h-4  mx-2 brightness-90'}/>
            <span className={' text-sm '}>{t(l.label)}</span>
        </Link>))}
    </div>

}
