/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,jsx,ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                playfair: ['PlayFair Display', 'serif'],
                opensans: ['Open Sans', 'sans-serif']
            }
        }
    },
    plugins: []
};
