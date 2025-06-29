import {commitSession, getSession} from '~/_core/server/session.server'
import {db} from '~/_core/server/db.server'
import {handleExceptions} from '~/_core/server/http.server'
import {useTranslation} from '~/translations/useTranslations';

import {type ActionFunctionArgs, Form, Link, redirect, useActionData} from 'react-router';
import {ErrorMessages} from '~/components/ErrorMessages';
import bcrypt from 'bcryptjs';
import {useState} from 'react';
import {Icon} from '~/UI/Icon';

type ActionData = {
                      errors?: Record<string, string[]>;
                  } | undefined;

export async function action({ request }: ActionFunctionArgs) {
    const formData = await request.formData()

    const name = formData.get('name')
    const email = formData.get('email')
    const password = formData.get('password');
    if (typeof name !== 'string' || typeof email !== 'string' || typeof password !== 'string' || !name.trim() || !email.trim() || !password.trim()) {
        return handleExceptions(new Error('Invalid input data'))
    }
    const session = await getSession(request)

    try {


        const user = await db.user.create({
            data: {
                email: email,
                name: name,
                password: await bcrypt.hash(password, 10),
            },
        })

        session.set('userId', user.id)

        session.flash('success', 'You are now successfully registered! Welcome to Conduit')

        return redirect('/', {
            headers: {
                'Set-Cookie': await commitSession(session),
            },
        })
    } catch (error) {
        session.flash('error', 'Registration failed')

        await commitSession(session)

        return handleExceptions(error)
    }
}

export default function Register() {
    const t = useTranslation();
    const actionData = useActionData<ActionData>()
    const [showPassword, setShowPassword] = useState(false)
    const inputClassName = 'appearance-none relative block w-full px-3 py-2 border border-borderInput rounded-md placeholder-onLabel focus:outline-none focus:ring-2 focus:ring-accen focus:border-transparent'

    return (<div className="min-h-screen bg-containerMain text-onPrimary flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-surfaceHigh p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-onHeading">{t('Sign up')}</h1>
                    <p className="mt-2 text-onSecondary">
                        <Link to="/login" className="text-accen hover:text-accentHover">
                            {t('Have an account?')}
                        </Link>
                    </p>
                </div>

                {actionData && <ErrorMessages errors={actionData.errors}/>}

                <Form method="POST" className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <div>
                            <label htmlFor="name" className="sr-only">{t('Your Name')}</label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                className={inputClassName}
                                placeholder={t('Your Name')}
                            />
                        </div>
                        <div>
                            <label htmlFor="email" className="sr-only">{t('Email address')}</label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                className={inputClassName}
                                placeholder={t('Email')}
                            />
                        </div>
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">{t('Password')}</label>
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? "text" : "password"}
                                required
                                className={inputClassName + " pr-10"}
                                placeholder={t('Password')}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute inset-y-0 right-0 pr-3 flex items-center text-onLabel hover:text-onSecondary transition-colors"
                                aria-label={showPassword ? t('Hide password') : t('Show password')}
                            >
                                {showPassword ? (
                                    <Icon.VisibilityOff className="w-5 h-5" />
                                ) : (
                                    <Icon.VisibilityOn className="w-5 h-5" />
                                )}
                            </button>
                        </div>
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accen hover:bg-accentHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accen transition-colors"
                        >
                            {t('Sign up')}
                        </button>
                    </div>
                </Form>
            </div>
        </div>)
}
