import { ReactNode } from 'react';

interface IconButtonProps {
    onClick: () => void;
    icon: ReactNode;
    title: string;
    variant?: 'edit' | 'remove';
    className?: string;
}

export function IconButton({ onClick, icon, title, variant = 'edit', className = '' }: IconButtonProps) {
    const baseClasses = "p-1 rounded-full hover:bg-backgroundHover transition-colors w-7 h-7 flex flex-row justify-center items-center";
    const variantClasses = {
        edit: "text-onLabel hover:text-button-primary",
        remove: "text-text-caption hover:text-status-error-text"
    };

    return (
        <button
            onClick={onClick}
            className={`${baseClasses} ${variantClasses[variant]} ${className}`}
            title={title}
        >
            {icon}
        </button>
    );
} 
