import React, { useEffect } from 'react';

export const useSafeArea = () => {
    const [safeArea, setSafeArea] = React.useState({
        top: '',
        right: '',
        bottom: '',
        left: '',
    });
    useEffect(() => {
        const top = getComputedStyle(document.documentElement).getPropertyValue(
            '--sa-top'
        );
        const right = getComputedStyle(
            document.documentElement
        ).getPropertyValue('--sa-right');
        const bottom = getComputedStyle(
            document.documentElement
        ).getPropertyValue('--sa-bottom');
        const left = getComputedStyle(
            document.documentElement
        ).getPropertyValue('--sa-left');
      
        setSafeArea({
            top,
            right,
            bottom,
            left,
        });
    }, []);
    return safeArea;
};
