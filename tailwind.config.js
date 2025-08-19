/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                red: {
                    500: "#ef4444", // standard Tailwind red-500
                },
                blue: {
                    500: "#3b82f6", // standard Tailwind blue-500
                },
                white: "#ffffff",
            },
        },
    },
    plugins: [],
}
