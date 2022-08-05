/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		extend: {
			backgroundImage: (theme) => ({
				'hero-pattern': "url('/bg-pattern.png')",
			})
		}
	},
	plugins: [],
};
