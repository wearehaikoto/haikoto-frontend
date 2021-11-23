module.exports = {
    mode: "jit",
    purge: [
        "./pages/**/*.{js,ts,jsx,tsx}",
        "./app/**/*.{js,ts,jsx,tsx}"
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            screens: {
                'portrait': {'raw': '(orientation: portrait)'},
                'landscape': {'raw': '(orientation: landscape)'}
            }
        }
    },
    variants: {
        extend: {}
    },
    plugins: []
};
