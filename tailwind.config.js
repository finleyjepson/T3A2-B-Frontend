// Tailwind - Configure template paths per https://tailwindcss.com/docs/guides/vite

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
        "node_modules/@zach.codes/react-calendar/dist/**/*.js"
    ],
    theme: {
    },
    plugins: [],
}


