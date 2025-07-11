const isProduction: boolean = process.env.NODE_ENV === 'production';
const prefix: string = 'Invariant failed';

export default function appInvariant(
    condition: any,
    // Not providing an inline default argument for message as the result is smaller
    /**
     * Can provide a string, or a function that returns a string for cases where
     * the message takes a fair amount of effort to compute
     */
    message?: string | (() => string),
): asserts condition {
    if (condition) {
        return;
    }

    if (isProduction) {
        throw new Error(prefix);
    }

    // When not in production we allow the message to pass through
    // *This block will be removed in production builds*

    const provided: string | undefined = typeof message === 'function' ? message() : message;

    // Options:
    // 1. message provided: `${prefix}: ${provided}`
    // 2. message not provided: prefix
    const value: string = provided ? `${prefix}: ${provided}` : prefix;
    throw new Error(value);
}
