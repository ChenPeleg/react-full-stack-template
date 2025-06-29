import {ActionFunctionArgs, Link, MetaFunction, redirect, useLoaderData} from 'react-router';
import mainLogo from '~/assets/images/pc-worker.png'
import {useTranslation} from '~/translations/useTranslations';
import {getSession} from '~/_core/server/session.server';

export const meta: MetaFunction = () => {
    return [{title: 'App example'}, {
        name: 'description',
        content: ''
    },];
};

export async function loader({request}: ActionFunctionArgs) {
    const session = await getSession(request);
    const userId = session.get('userId');
    if (userId) {
        return redirect('home');
    }

}

export default function Index() {

    const t = useTranslation();


    return (<div className="flex flex-col h-screen items-center justify-start bg-containerMain text-onPrimary">
        <Link to={'home'} className="flex flex-col items-center gap-16 mt-14">
            <header className="flex flex-col items-center gap-9">
                <h1 className="leading text-3xl font-bold text-gray-800  ">
                    {t('PC Worker')}
                </h1>
                <div className="h-[144px] ">
                    <img
                        src={mainLogo}
                        alt={t('pc-worker-logo')}
                        className="block h-full  "
                    />

                </div>
            </header>
        </Link>
        <Link
            to="/login"
            className="mt-8 px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
        >
            {t('Login')}
        </Link>
    </div>);
}
