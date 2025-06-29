export const TextAreaInput = ({ ...config }) => {
    return (
        <div className={' '}>
            <textarea
                className={'h-12  rounded text-sm'}
                style={{ padding: '8px 12px', minWidth: '100%' }}
                role={'input'}
                {...config}
            ></textarea>
        </div>
    );
};
