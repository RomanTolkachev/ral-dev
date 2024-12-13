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
    safeList: ["rotate-180", "rotate-0", "checkbox-custom, thumb-secondary, filter-dropdown-button-active"],
    theme: {
        extend: {
            fontFamily: {
                // sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                Inter: ['Inter', 'sans-serif']
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
                "filter-dropdown-button-active": "rgba(var(--filter-dropdown-button-active))",

                "main-select": "rgba(var(--main-select))",
                "primary-row": "rgba(var(--primary-row))",
                "secondary-row": "rgba(var(--secondary-row))",
                "text-primary": "rgba(var(--text-primary))",

                // Table
                "row-even": "rgba(var(--row-even))",
                "row-odd": "rgba(var(--row-odd))",

                // Text
                "header-text": "rgba(var(--header-text))",
                "cell-text": "rgba(var(--cell-text))",

                // Checkbox
                "checkbox-custom": "rgba(var(--checkbox-custom))",

            },
            boxShadow: {
                "basic": "0px 1px 9px 0px rgba(0, 0, 0, 0.3);",
                "button-main": "0px 5px 4px 0px rgba(0, 0, 0, 0.3)",
                'input-search': "22px 16px 22px 0px rgba(224, 224, 230, 1) inset;"
            }
        },
    },

    plugins: [forms],
};
