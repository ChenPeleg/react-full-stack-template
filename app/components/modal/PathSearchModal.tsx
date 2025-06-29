import  {useEffect, useState} from 'react';
import {ModeSearchParams} from '~/models/AppSearchParams';
import {Icon} from '~/UI/Icon';
import {AppButtonStyle} from '~/UI/styles/AppButton.style';
import {DialogModal} from '~/_core/react-common/dialog/DialogModal';

export const PathSearchModal = ({onPathSelected, currentPath}: {
    onPathSelected: ({pathname}: { pathname: string }) => void,
    currentPath?: string,
}) => {
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            // Filter out React DevTools messages
            if (event.data?.source === 'react-devtools-bridge') {
                return;
            }

        
            if (event.data?.type === 'FOLDER_SELECTED') {
                onPathSelected(event.data.data.path);
                setIsOpen(false);
            }
        };

        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    if (!isOpen) {
        return (<button
            onClick={() => setIsOpen(true)}
            className= {AppButtonStyle}>
            <Icon.folder className={'h-6 w-6  '}  preventDarkMode />
            <span> Open File Browser</span>
        </button>);
    }

    return (
        <DialogModal showDialog={isOpen} setShowDialog={setIsOpen}>
            <div className="bg-surfaceHigh rounded-lg w-[90vw] h-[90vh] flex flex-col">
                <div className="flex justify-between items-center p-4 border-b">
                    <h2 className="text-xl font-semibold">File Browser</h2>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-gray-500 hover:text-gray-700"
                    >
                        ✕
                    </button>
                </div>
                <div className="flex-1 p-4">
                    <iframe
                        src={`/home/folders?mode=${ModeSearchParams.SelectFolder}${currentPath ? `&path=${encodeURIComponent(currentPath)}` : ''}`}
                        className="w-full h-full border-0"
                        title="File Browser"
                    />
                </div>
            </div>
        </DialogModal>
    );
};
