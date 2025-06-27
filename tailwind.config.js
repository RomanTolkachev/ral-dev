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
    safeList: ['rotate-180', 'list-disc', 'rotate-0', 'checkbox-custom', 'thumb-secondary', 'text-wrap', 'filter-dropdown-button-active', "pl-8", "text-gray-400", 'w-12', 'line-clamp-3', 'line-clamp-2'],
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

                'header-nav-button': 'rgba(var(--header-nav-button))',
                'header-nav-text': 'rgba(var(--header-nav-text))',

                // Input
                'input-primary': 'rgba(var(--input-primary-bg))',
                'input-text': 'rgba(var(--input-primary-text))',
                'input-border-active': 'rgba(var(--input-border-active))',
                'input-nav-bg-active': 'rgba(var(--page-nav-bg-active))',
                'input-nav-bg-inactive': 'rgba(var(--page-nav-bg-inactive))',

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

                // Modal
                'row-modal-even': 'rgba(var(--row-modal-even))',
                'row-modal-odd': 'rgba(var(--row-modal-odd))',
            },
            boxShadow: {
                basic: '0px 1px 9px 0px rgba(var(--shadow-basic));',
                'button-main': '0px 5px 4px 0px rgba(0, 0, 0, 0.3)',
                'input-search': '10px 6px 9px 9px rgba(var(--input-primary-shadow), 0.5) inset;',
                'nav-page': '7px 2px 7px 0px rgba(var(--input-primary-shadow), 0.8) inset;',
                'input-page': '10px 2px 9px 5px rgba(var(--input-primary-shadow), 0.5) inset;',
            },
        },
    },

    plugins: [forms],
}
