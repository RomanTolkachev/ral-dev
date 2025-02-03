import defaultTheme from 'tailwindcss/defaultTheme'
import forms from '@tailwindcss/forms'

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.tsx',
        './node_modules/tailwind-datepicker-react/dist/**/*.js',
    ],
    safeList: ['rotate-180', 'rotate-0', 'checkbox-custom, thumb-secondary, filter-dropdown-button-active', "pl-8"],
    theme: {
        extend: {
            fontFamily: {
                // sans: ['Figtree', ...defaultTheme.fontFamily.sans],
                Inter: ['Inter', 'sans-serif'],
            },
            colors: {
                // Common
                'gray-common': 'rgba(var(--gray-common))',
                'error': 'rgba(var(--error))',

                background: 'rgba(var(--background))',
                'background-block': 'rgba(var(--background-block))',

                // Buttons
                'button-violet': 'rgba(var(--violet-button))',
                'button-violet-text': 'rgba(var(--violet-button-text))',

                'button-white': 'rgba(var(--white-button))',
                'button-white-text': 'rgba(var(--white-button-text))',

                'button-red': 'rgba(var(--red-button))',
                'button-red-text': 'rgba(var(--red-button-text))',

                'filter-dropdown-button': 'rgba(var(--filter-dropdown-button))',
                'filter-dropdown-button-active': 'rgba(var(--filter-dropdown-button-active))',
                'filter-dropdown-button-border': 'rgba(var(--filter-dropdown-button-border))',

                'main-select': 'rgba(var(--main-select))',
                'primary-row': 'rgba(var(--primary-row))',
                'secondary-row': 'rgba(var(--secondary-row))',
                'text-primary': 'rgba(var(--text-primary))',

                // Input
                'input-primary': 'rgba(var(--input-primary-bg))',
                'input-text': 'rgba(var(--input-primary-text))',
                'input-border-active': 'rgba(var(--input-border-active))',

                // Table
                'row-even': 'rgba(var(--row-even))',
                'row-odd': 'rgba(var(--row-odd))',
                'table-base': 'rgba(var(--text-table-base))',

                // Text
                'header-text': 'rgba(var(--header-text))',
                'cell-text': 'rgba(var(--cell-text))',
                'gray-light-gray': 'rgba(var(--gray-light-gray))',

                // Checkbox
                'checkbox-custom': 'rgba(var(--checkbox-custom))',
                'checkbox-ring': 'rgba(var(--checkbox-ring))',

                // Borders
                'checkbox-custom-border': 'rgba(var(--checkbox-custom-border))',
            },
            boxShadow: {
                basic: '0px 1px 9px 0px rgba(var(--shadow-basic));',
                'button-main': '0px 5px 4px 0px rgba(0, 0, 0, 0.3)',
                'input-search': '22px 16px 22px 0px rgba(var(--shadow-input-primary), 1) inset;',
            },
        },
    },

    plugins: [forms],
}
