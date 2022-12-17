/** @type {import('tailwindcss').Config} */
module.exports = {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	safelist: ["alert-success", "alert-error"],
	theme: {
		extend: {},
	},
	plugins: [require("daisyui")],
}
