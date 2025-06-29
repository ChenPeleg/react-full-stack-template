import {createSessionStorage} from 'react-router';
import {db} from './db.server';
import {SessionData, SessionFlashData} from '~/models/SessionData';

const sessionStorage = createSessionStorage<SessionData, SessionFlashData>({
    cookie: {
        name: 'real_world_session',
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 1000 * 7, // one week
        path: '/',
        sameSite: 'lax', // @ts-ignore
        secrets: [process?.env?.SESSION_SECRET],
        secure: true,
    },
    async createData(data, expires) {
        const {id} = await db.session.create({
            data: {
                expiresAt: expires!,
                payload: JSON.stringify(data),
            },
        });

        return String(id);
    },
    async readData(id) {
        const session = await db.session.findUnique({where: {id: Number(id)}});

        return session?.payload ? JSON.parse(session?.payload) : null;
    },
    async updateData(id, data, expires) {
        console.log('session id',id)
        if (!id) {
            return
        }
        await db.session.update({
            where: {
                id: Number(id),
            },
            data: {
                payload: JSON.stringify(data),
                expiresAt: expires,
            },
        });
    },
    async deleteData(id) {

        await db.session.delete({where: {id: Number(id)}});
    },
});

export function getSession(request: Request) {
    return sessionStorage.getSession(request.headers.get('Cookie'));
}

export const commitSession = sessionStorage.commitSession;
export const destroySession = sessionStorage.destroySession;
