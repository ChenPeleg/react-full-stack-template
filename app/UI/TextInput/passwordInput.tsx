import { Icon } from "../Icon";



export const PasswordInput = ({
    isPassWordShown,
    setIsPassWordShown,
    className,
    hidePasswordButton,
    ...config
}: {
    isPassWordShown: boolean;
    setIsPassWordShown: (v: boolean) => void;
    className?: string;
    onChange?: (ev: unknown) => void;
    name?: string;
    type?: string;
    placeholder?: string;
    hidePasswordButton?: boolean;
    required?: boolean;
    defaultValue?: string;
}) => {
    const typeOfInput = isPassWordShown ? 'text' : 'password';

    return (
        <div className={'relative'}>
            <input
                className={
                    'font-satoshi h-12 w-full rounded text-sm ' +
                    (className || '')
                }
                style={{ padding: '8px 15px', minWidth: '100%' }}
                {...config}
                type={typeOfInput}
            ></input>
            {hidePasswordButton ? null : (
                <div
                    onClick={() => setIsPassWordShown(!isPassWordShown)}
                    id={'visibility-button'}
                    role={'button'}
                    className={
                        'absolute right-0 top-0 flex h-12 cursor-pointer flex-col items-center justify-center p-4'
                    }
                >
                    {isPassWordShown ? (
                        <Icon.pauseSound />
                    ) : (
                        <Icon.pauseSound />
                    )}
                </div>
            )}
        </div>
    );
};
