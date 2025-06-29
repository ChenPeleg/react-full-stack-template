import React from 'react';

export const FlashMessages = ({messages}: {
    messages: {
        success?: string;
        error?: string;
    }
}) => {
    const [isFlashMessageVisible, setIsFlashMessageVisible] = React.useState(false)

    React.useEffect(() => {
        if (messages.success || messages.error) {
            setIsFlashMessageVisible(true)
            setTimeout(() => setIsFlashMessageVisible(false), 3000)
        }
    }, [messages.error, messages.success])



    return (
        <div className="fixed top-4 right-4 z-50 transition-discrete starting:opacity-0 transition-all duration-100" style={ {opacity: isFlashMessageVisible ? 1 : 0}} >
            { isFlashMessageVisible &&   <div className={`px-4 py-3 rounded-lg shadow-lg transform transition-all duration-300 ease-in-out ${
                messages.success 
                    ? 'bg-green-500 text-white' 
                    : 'bg-red-500 text-white'
            }`}>
                <div className="flex items-center">
                    <span className="mr-2">
                        {messages.success ? '✓' : '✕'}
                    </span>
                    <span className="mr-4">
                        {messages.success || messages.error}
                    </span>
                    <button
                        className="ml-auto text-white hover:bg-surfaceHigh/20 rounded-full w-8 h-8 flex items-center justify-center transition-colors duration-150 focus:outline-none"
                        aria-label="Close flash message"
                        onClick={() => setIsFlashMessageVisible(false)}
                    >
                        ×
                    </button>
                </div>
            </div>}
        </div>
    );
}
