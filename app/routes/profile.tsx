import { Form, useLoaderData, useActionData } from 'react-router';
import { redirect, type ActionFunctionArgs, type LoaderFunctionArgs } from 'react-router';
import { db } from '~/_core/server/db.server';
import { getSession, commitSession } from '~/_core/server/session.server';
import { handleExceptions } from '~/_core/server/http.server';
import { ErrorMessages } from '~/components/ErrorMessages';
import { useState } from 'react';
import { AppDropdown } from '~/_core/react-common/dropdown/AppDropDown';
import {Language} from '~/translations/language';
import { UserTheme } from '~/models/UserTheme';
import {useTranslation} from '~/translations/useTranslations';

const EMOJI_OPTIONS = ['😃', '😊', '😎', '🤓', '😍', '🥳', '🤖', '👾', '🎮', '🎯'];
const themeOptions = [
  { id: UserTheme.Light, label: 'Light', data: UserTheme.Light },
  { id: UserTheme.Dark, label: 'Dark', data: UserTheme.Dark },
  { id: UserTheme.System, label: 'System', data: UserTheme.System },
];
const languageOptions = [
  { id: Language.en, label: 'English', data: 'English' },
  { id: Language.he, label: 'Hebrew', data: 'Hebrew' },

];
type ActionData = {
  errors?: Record<string, string[]>;
} | undefined;

type LoaderData = {
  user: {
    id: number;
    name: string;
    email: string;
    avatar: string;
    bio: string | null;
    theme: string;
    language: string;
  };
};

export async function loader({ request }: LoaderFunctionArgs) {
  const session = await getSession(request);
  const userId = session.get('userId');

  if (!userId) {
    return redirect('/login');
  }

  const user = await db.user.findUnique({
    where: { id: Number(userId) },
    select: { id: true, name: true, email: true, avatar: true, bio: true, theme: true, language: true },
  });

  if (!user) {
    return redirect('/login');
  }

  return { user };
}

export async function action({ request }: ActionFunctionArgs) {
  const session = await getSession(request);
  const userId = session.get('userId');

  if (!userId) {
    return redirect('/login');
  }

  const formData = await request.formData();
  const name = formData.get('name');
  const avatar = formData.get('avatar');
  const bio = formData.get('bio');
  const theme = formData.get('theme');
  const language = formData.get('language');

  if (typeof name !== 'string' || typeof avatar !== 'string' || typeof theme !== 'string' || typeof language !== 'string') {
    return handleExceptions(new Error('Invalid input data'));
  }

  try {
    await db.user.update({
      where: { id: Number(userId) },
      data: {
        name,
        avatar,
        bio: bio ? String(bio) : null,
        theme,
        language,
      },
    });
    session.set('userName', name)

    session.flash('success', 'Profile updated successfully!');
    return redirect('/profile', {
      headers: {
        'Set-Cookie': await commitSession(session),
      },
    });
  } catch (error) {
    session.flash('error', 'Failed to update profile');
    await commitSession(session);
    return handleExceptions(error);
  }
}

export default function Profile() {
  const t = useTranslation();
  const { user } = useLoaderData<typeof loader>() as LoaderData;
  const actionData = useActionData<ActionData>();
  const [selectedEmoji, setSelectedEmoji] = useState(user.avatar);
  const [selectedTheme, setSelectedTheme] = useState<{ id: string | number; label: React.ReactNode; data: string }>({ id: user.theme, label: capitalize(user.theme), data: user.theme });
  const [selectedLanguage, setSelectedLanguage] = useState<{ id: string | number; label: React.ReactNode; data: string }>({ id: user.language, label: languageLabel(user.language), data: user.language });
  const inputClassName = 'appearance-none relative block w-full px-3 py-2 border border-borderInput rounded-md placeholder-onLabel focus:outline-none focus:ring-2 focus:ring-accen focus:border-transparent';



  function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  function languageLabel(code: string) {
    const found = languageOptions.find(l => l.id === code);
    return found ? found.label : code;
  }

  return (
    <div className="min-h-screen bg-containerMain text-onPrimary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto space-y-8 bg-surfaceHigh p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-onHeading">{t('Profile')}</h1>
        </div>

        {actionData && <ErrorMessages errors={actionData.errors} />}

        <Form method="POST" className="space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-onSecondary mb-1">
                {t('Name')}
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                defaultValue={user.name}
                className={inputClassName}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-onSecondary mb-1">
                {t('Email')}
              </label>
              <input
                id="email"
                type="email"
                disabled
                defaultValue={user.email}
                className={inputClassName + ' bg-gray-50'}
              />
            </div>

            <div>
              <label htmlFor="avatar" className="block text-sm font-medium text-onSecondary mb-1">
                {t('Avatar')}
              </label>
              <div className="grid grid-cols-5 gap-2">
                {EMOJI_OPTIONS.map((emoji) => (
                  <button
                    key={emoji}
                    type="button"
                    onClick={() => setSelectedEmoji(emoji)}
                    className={`p-2 text-2xl rounded-md transition-colors ${
                      selectedEmoji === emoji
                        ? 'bg-accent text-onPrimary'
                        : 'hover:text-onSecondary '
                    }`}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
              <input type="hidden" name="avatar" value={selectedEmoji} />
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-onSecondary mb-1">
                {t('Bio')}
              </label>
              <textarea
                id="bio"
                name="bio"
                rows={3}
                defaultValue={user.bio || ''}
                className={inputClassName}
                placeholder={t('Tell us about yourself...')}
              />
            </div>

            <div>
              <label htmlFor="theme" className="block text-sm font-medium text-onSecondary mb-1">
                {t('Theme')}
              </label>
              <AppDropdown.Controlled
                options={themeOptions}
                selectedOption={selectedTheme}
                setSelectedOption={option => {
                  setSelectedTheme({
                    id: option.id,
                    label: option.label ?? '',
                    data: option.data
                  });
                }}
                config={{ width: 240 }}
                name="theme"
              />
              <input type="hidden" name="theme" value={selectedTheme.data} />
            </div>
            <div>
              <label htmlFor="language" className="block text-sm font-medium text-onSecondary mb-1">
                {t('Language')}
              </label>
              <AppDropdown.Controlled
                options={languageOptions}
                selectedOption={selectedLanguage}
                setSelectedOption={option => {
                  setSelectedLanguage({
                    id: option.id,
                    label: option.label ?? '',
                    data: option.data
                  });
                }}
                config={{ width: 240 }}
                name="language"
              />
              <input type="hidden" name="language" value={selectedLanguage.data} />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-accen hover:bg-accentHover focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accen transition-colors"
            >
              {t('Update Profile')}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}
