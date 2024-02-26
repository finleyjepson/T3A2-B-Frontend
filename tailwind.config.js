// Tailwind - Configure template paths per https://tailwindcss.com/docs/guides/vite

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/@zach.codes/react-calendar/dist/**/*.js"
    ],
    theme: {
        extend: {
            animationDuration: {
                "1.5s": "1.5s",
                "2s": "2s",
                "3s": "3s",
                "5s": "5s",
            }
        }
    },
    plugins: [
        require("tailwindcss-animate"),
    ],
}


