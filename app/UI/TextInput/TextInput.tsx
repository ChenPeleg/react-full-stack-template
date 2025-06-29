export const TextInput = ({ ...config }) => {
    return (
        <div className={' '}>
            <input
                className={'h-12 rounded text-sm '}
                style={{ padding: '8px 12px', minWidth: '100%' }}
                role={'input'}
                {...config}
                type={config.type ? config.type : 'text'}
            ></input>
        </div>
    );
};
