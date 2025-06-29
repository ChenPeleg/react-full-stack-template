import {
    type ActionFunctionArgs,
    data,
    Form,
    type LoaderFunctionArgs,
    redirect,
    useActionData,
    useLoaderData,
    useSubmit
} from 'react-router';
import {db} from '~/_core/server/db.server';
import {addMessage} from '~/_core/server/messages.server';
import {useTranslation} from '~/translations/useTranslations';
import {ErrorMessages} from '~/components/ErrorMessages';
import {AppDropdown} from '~/_core/react-common/dropdown/AppDropDown';
import {TextInput} from '~/UI/TextInput/TextInput';
import {UserTheme} from '~/models/UserTheme';
import React, {useState} from 'react';
import {getSession} from '~/_core/server/session.server';
import type {exampleData} from '@prisma/client';


type ActionData = {
                      errors?: Record<string, string[]>;
                  } | undefined;

interface LoaderData {
    exampleData: exampleData[];
}

const selectableOptions = [{
    id: 1,
    label: 'First',
    data: '1'
}, {
    id: '2',
    label: 'Second',
    data: UserTheme.Dark
}, {
    id: 3,
    label: 'Third',
    data: '3'
},];

export async function loader({request}: LoaderFunctionArgs) {
    const session = await getSession(request);
    const userId = session.get('userId');

    if (!userId) {
        return redirect('/login');
    }
    const exampleData = await db.exampleData.findMany()
    return data({
        exampleData
    });
}


export async function action({
                                 request,
                             }: ActionFunctionArgs) {

    const formData = new URLSearchParams(await request.text());
    const id = formData.get('id');
    const action = formData.get('action') || 'save';
    const name = formData.get('name') || '';


    if (action === 'delete' && id) {
        await db.exampleData.delete({
            where: {
                id: +id
            }
        });
        await addMessage(request, 'success', `Folder with id ${id} deleted`,);
    } else if (!id) {
        await db.exampleData.create({
            data: {
                name,
                description: '',
                createdAt: new Date() ,
                updatedAt: new Date()
            }
        });
        await addMessage(request, 'success', `Folder ${name} created`,);
    } else {
        await db.folderPath.update({
            where: {
                id: id ? +id : 0
            },
            data: {
                name,

                updatedAt: new Date().toString()
            }
        });
        await addMessage(request, 'success', `Folder ${name} updated`,);
    }
    return null
}

export default function Example() {
    const t = useTranslation();
    const data = useLoaderData<LoaderData>();
    const actionData = useActionData<ActionData>();
    const submit = useSubmit();


    const [selectionExampleValue, setSelectionExampleValue] = useState<{ id: string | number; label: React.ReactNode; data: string }>({
        id: 1,
        label: 'default value',
        data: '1'
    });


    return (<div className={'flex flex-col items-start  justify-start  w-full h-full'}>
        <div className={'bg-containerMain'}>
            <div>
                {data.exampleData.map(item => (<div key={item.id} className="p-4 border-b border-surfaceHigh">
                        <h2 className="text-lg font-semibold text-onHeading">{item.name}</h2>
                        <p className="text-sm text-onSecondary">{item.description}</p>

                    </div>))}
            </div>
        </div>
        <div className="min-h-screen bg-containerMain text-onPrimary py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md mx-auto space-y-8 bg-surfaceHigh p-8 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-onHeading">{t('Example')}</h1>
                </div>

                {actionData && <ErrorMessages errors={actionData.errors}/>}


                <Form method="POST" className="space-y-6">


                    <TextInput
                        id="name"
                        name="name"
                        type="text"
                        required
                        defaultValue={''}
                    />


                    <div>
                        <label htmlFor="selectionValue" className="block text-sm font-medium text-onSecondary mb-1">
                            {t('Selection Value')}
                        </label>
                        <AppDropdown.Controlled
                            options={selectableOptions}
                            selectedOption={selectionExampleValue}
                            setSelectedOption={option => {
                                setSelectionExampleValue({
                                    id: option.id,
                                    label: option.label ?? '',
                                    data: option.data
                                });
                            }}
                            config={{width: 240}}
                            name="selectionValue"
                        />
                        <input type="hidden" name="selectionValue" value={selectionExampleValue.data}/>
                    </div>


                    <div>
                        <button
                            type="submit"
                            className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-onPrimary bg-primary/80 hover:bg-primary  transition-colors"
                        >
                            {t('Create Example')}
                        </button>
                    </div>
                </Form>
            </div>
        </div>
    </div>);
}
