interface HamburgerButtonProps {
    isOpen: boolean;
    onClick: () => void;
    title: string;
    className?: string;
}

export function HamburgerButton({ isOpen, onClick, title, className = '' }: HamburgerButtonProps) {
    return (
        <button
            onClick={onClick}
            className={`p-0.5 hover:bg-backgroundHover rounded transition-colors ${className}`}
            aria-label={title}
        >
            <div className="w-5 h-4 relative flex items-center justify-center">
                <span 
                    className={`w-full h-0.5 bg-onSecondary transition-all duration-300 absolute ${
                        isOpen ? 'rotate-45' : 'rotate-0 -translate-y-1.5'
                    }`}
                />
                <span 
                    className={`w-full h-0.5 bg-onSecondary transition-all duration-300 absolute ${
                        isOpen ? 'opacity-0' : 'opacity-100'
                    }`}
                />
                <span 
                    className={`w-full h-0.5 bg-onSecondary transition-all duration-300 absolute ${
                        isOpen ? '-rotate-45' : 'rotate-0 translate-y-1.5'
                    }`}
                />
            </div>
        </button>
    );
} 
