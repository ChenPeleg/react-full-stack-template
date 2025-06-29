import {useNavigate} from 'react-router';
import {AppDropdownControlled} from '~/_core/react-common/dropdown/AppDropdownControlled';
import {MenuOption} from '~/_core/react-common/dropdown/MenuOption';
import {useState} from 'react';
import {Icon} from '~/UI/Icon';
import {useTranslation} from '~/translations/useTranslations';

interface UserInfoProps {
    userName: string;
    avatar: string;
}

export const UserInfo = ({userName, avatar}: UserInfoProps) => {
    const t = useTranslation();
    const [selectedOption, setSelectedOption] = useState<MenuOption | null>(null);
    const navigate = useNavigate()

    const options: MenuOption[] = [
        { 
            id: 'profile', 
            label: (
                <div className="flex items-center gap-2">
                    <Icon.user className="h-4 w-4" />
                    <span>{t('Profile')}</span>
                </div>
            )
        },
        { 
            id: 'logout', 
            label: (
                <div className="flex items-center gap-2">
                    <Icon.exitBlack className="h-4 w-4" />
                    <span>{t('Logout')}</span>
                </div>
            )
        }
    ];

    const handleOptionSelect = (option: MenuOption) => {
        setSelectedOption(option);
        if (option.id === 'logout') {
            // Submit the logout form
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = '/logout';
            document.body.appendChild(form);
            form.submit();
        } else if (option.id === 'profile') {
            navigate('/profile');
        }
    };

    return (
        <AppDropdownControlled
            options={options}
            selectedOption={selectedOption}
            setSelectedOption={handleOptionSelect}
            config={{
                width: 150,
                customButton: ({ isOpen, buttonsClickHandler }) => (
                    <button
                        onClick={() => buttonsClickHandler(!isOpen)}
                        className="bg-containerMain flex items-center gap-4 ring-1 text-outline  rounded-full px-4 py-1 hover:bg-surfaceHigh transition-colors"
                    >
                        <div className="flex items-center gap-2">
                            <span className="text-xl">{avatar}</span>
                            <span className="text-outline  ">
                                {userName}
                            </span>
                        </div>
                    </button>
                )
            }}
        />
    );
};
