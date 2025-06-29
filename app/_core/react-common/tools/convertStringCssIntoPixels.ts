export const convertStringCssIntoPixels = (cssString: string): number => {
    return +(cssString.replace('px', '').replace('pt', '') || 0);
};
