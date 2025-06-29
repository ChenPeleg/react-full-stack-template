import type {Config} from 'tailwindcss';

export default {
    content: ['./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}'],
    darkMode: ['class', '[data-theme="dark"]'],
    theme: {
        extend: {
            colors: {
                primary: 'rgb(var(--color-primary-rgb) / <alpha-value>)',
                secondary: 'rgb(var(--color-secondary-rgb) / <alpha-value>)',
                accent: 'rgb(var(--color-accent-rgb) / <alpha-value>)',
                accentHover: 'rgb(var(--color-accent-hover-rgb) / <alpha-value>)',
                success: 'rgb(var(--color-success-rgb) / <alpha-value>)',
                warning: 'rgb(var(--color-warning-rgb) / <alpha-value>)',
                /* for surface colors */
                containerMain: 'rgb(var(--color-container-main-rgb) / <alpha-value>)',
                surfaceMain: 'rgb(var(--color-surface-main-rgb) / <alpha-value>)',
                surfaceHigh: 'rgb(var(--color-surface-high-rgb) / <alpha-value>)',
                backgroundHover: 'rgb(var(--color-background-hover-rgb) / <alpha-value>)',
                card: 'rgb(var(--color-card-rgb) / <alpha-value>)',
                /* for text and icons on the surface colors */
                onPrimary: 'rgb(var(--color-on-primary-rgb) / <alpha-value>)',
                onHeading: 'rgb(var(--color-on-heading-rgb) / <alpha-value>)',
                onLabel: 'rgb(var(--color-on-label-rgb) / <alpha-value>)',
                outline: 'rgb(var(--color-outline-rgb) / <alpha-value>)', // Outline color


                borderInput: 'rgb(var(--color-border-input-rgb) / <alpha-value>)', // Input borders

                onError: 'rgb(var(--color-on-error-rgb) / <alpha-value>)', // Error text
            },
            fontFamily: {
                sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif', 'Apple Color Emoji', 'Segoe UI Emoji', 'Segoe UI Symbol', 'Noto Color Emoji',],
            },
        },
    },
    plugins: [],
} satisfies Config;
