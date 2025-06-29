import {LoaderFunctionArgs, MetaFunction, useLoaderData, Outlet } from 'react-router';
 
 
import {TopBar} from '~/components/TopBar';
import {Sidebar} from '~/components/navigation/Sidebar'; 
import {useIsModal} from '~/hooks/useIsModal'; 
import {getSession} from '~/_core/server/session.server';

interface LoaderData {
    userId: number;
    userName: string;
    avatar: string;
}

export const meta: MetaFunction = () => {
    return [{title: 'PC Worker'}, {
        name: 'Helps managing the pc',
        content: 'Welcome to React!'
    },];
};
export async function loader({request}: LoaderFunctionArgs) {

    const session = await getSession(request)


    return Response.json(session.data)
}

export default function Home() {
    const loaderData = useLoaderData<LoaderData>()
    const isModal = useIsModal() ;

    return (<div className="flex h-screen w-screen overflow-hidden bg-containerMain text-onPrimary flex-col">
        {!isModal && <TopBar userName={loaderData.userName} avatar={loaderData.avatar}/>}
        <div id={'page-container'} className="flex w-full flex-1 flex-row">
            {!isModal &&   <Sidebar/>}
            <main className={'flex flex-col items-center  justify-center  w-full h-full'}>

            </main>
        </div>
    </div>);
}

