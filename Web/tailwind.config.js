const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
    darkMode: 'selector',
    content: [
        "./Views/**/*.cshtml",
        "./js/**/*.{html,js}"
    ],
    plugins: [
        require('@tailwindcss/forms')
    ],
};

//npx tailwindcss -i ./wwwroot/css/_input.css -o ./wwwroot/css/output.css --watch  