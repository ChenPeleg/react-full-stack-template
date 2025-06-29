import {destroySession, getSession} from '~/_core/server/session.server'

import {type ActionFunctionArgs, redirect} from 'react-router';


export async function action({request}: ActionFunctionArgs) {
    const session = await getSession(request)

    return redirect('/', {
        headers: {
            'Set-Cookie': await destroySession(session),
        },
    })

}


