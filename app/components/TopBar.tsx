import {useEffect, useState} from 'react';
import {useTranslation} from '~/translations/useTranslations';
import appLogo from '~/assets/images/pc-worker.png';
import {UserInfo} from '~/components/UserInfo';
import { Icon } from '~/UI/Icon';

export const TopBar = ({
                           userName,
                           avatar
                       }: { userName: string; avatar: string }) => {
    const t = useTranslation();
    const [themValue, setThemeValue] = useState<string>(   'light');

    useEffect(() => {
        if (  document?.documentElement.dataset.theme) {
            return
        }
        let theme = localStorage.getItem('theme');
        if (!theme) {
            theme = 'light';
            localStorage.setItem('theme', theme);

        }
        setThemeValue(theme)
        document.documentElement.dataset.theme = theme;
    }, []);

    const handleThemeToggle = () => {
        const currentTheme = document.documentElement.dataset.theme;
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setThemeValue(newTheme);
        document.documentElement.dataset.theme = newTheme;
        localStorage.setItem('theme', newTheme);
    };

    return (<nav className={`flex flex-row shadow h-11 w-full border-b border-b-slate-400`}>
        <div className={'flex h-full w-full flex-row items-center justify-between px-4'}>
            <h1 className={'flex flex-row items-center gap-2 text-onHeading  '}>
                <div className="h-[20px] w-[20px]">
                    <img
                        src={appLogo}
                        alt="pc-worker"
                        className="block w-full  "
                    />
                </div>
                <span>
                    {t('Template')}
                </span>

            </h1>
            
            <div className="flex flex-row items-center gap-4">
                <button
                    aria-label="Toggle theme"
                    className="px-0  rounded-full border-2 border-slate-300 bg-surfaceHigh dark:bg-slate-700 dark:text-white text-slate-900 hover:bg-slate-100 dark:hover:bg-slate-600 transition flex items-center gap-1 justify-center min-w-[64px] relative"
                    style={{ boxShadow: '0 2px 8px 0 rgba(0,0,0,0.06)' }}
                    onClick={handleThemeToggle}
                >
                    <span className="absolute left-0 top-0 bottom-0 w-8 transition-all duration-300 z-0 rounded-full"
                        style={{
                            margin : '1px',
                            background: themValue === 'light' ? '#fde68a' : '#1e293b',
                            transform: themValue === 'light' ? 'translateX(0)' : 'translateX(36px)',
                            boxShadow: themValue === 'light' || themValue === 'dark' ? '0 0 8px 2px rgba(0,0,0,0.10)' : 'none',
                        }}
                    />
                    <span className={`   flex justify-center items-center rounded-full w-8 h-8 z-10 transition-all duration-200 ${themValue === 'light' ? 'text-yellow-900 font-bold' : 'opacity-60'}`}
                    >
                        🌞
                    </span>
                    <span className={`  flex justify-center items-center rounded-full w-8 h-8 z-10 transition-all duration-200 ${themValue === 'dark' ? 'text-white font-bold' : 'opacity-60'}`}
                    >
                        🌙
                    </span>
                </button>
                <UserInfo userName={userName} avatar={avatar} />
            </div>
        </div>
    </nav>);
};
