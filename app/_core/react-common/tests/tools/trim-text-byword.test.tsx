import { describe, it, expect } from 'vitest';
import { trimTextByWord } from '../../tools/trimeTextByWord';

describe('trimTextByWord', () => {
    it('should trim text by word up to a maximum length', () => {
        const text =
            'This is a long sentence that should be trimmed by word up to a maximum length';
        const result = trimTextByWord(text, 30);
        expect(result).toEqual('This is a long sentence that should...');
    });

    it('should return the same text if it is shorter than the maximum length', () => {
        const text = 'Short sentence';
        const result = trimTextByWord(text, 30);
        expect(result).toEqual('Short sentence');
    });

    it('should return the same text without the last character if it is a comma or period', () => {
        const text = 'This is a sentence.';
        const result = trimTextByWord(text, 30);
        expect(result).toEqual('This is a sentence');
    });

    it('should return an empty string if the input is null or undefined', () => {
        // @ts-expect-error testing null
        const result = trimTextByWord(null, 30);
        expect(result).toEqual('');
    });
});
