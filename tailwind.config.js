import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "background": "rgba(var(--background))",
                "background-block": "rgba(var(--background-block))",

                // Buttons
                "button-violet": "rgba(var(--violet-button))",
                "button-violet-text": "rgba(var(--violet-button-text))",

                "button-white": "rgba(var(--white-button))",
                "button-white-text": "rgba(var(--white-button-text))",

                "button-red": "rgba(var(--red-button))",
                "button-red-text": "rgba(var(--red-button-text))",

                "filter-dropdown-button": "rgba(var(--filter-dropdown-button))",

                "main-select": "rgba(var(--main-select))",
                "primary-row": "rgba(var(--primary-row))",
                "secondary-row": "rgba(var(--secondary-row))",
                "text-primary": "rgba(var(--text-primary))",

                // Table
                "row-even": "rgba(var(--row-even))",
                "row-odd": "rgba(var(--row-odd))",

                // Text
                "header-text": "rgba(var(--header-text))",
                "cell-text": "rgba(var(--cell-text))"
            },
            boxShadow: {
                "basic": "0px 1px 9px 0px rgba(0, 0, 0, 0.3);",
                "button-main": "0px 5px 4px 0px rgba(0, 0, 0, 0.3)"
            }
        },
    },

    plugins: [forms],
};
