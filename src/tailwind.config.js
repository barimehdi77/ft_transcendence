/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./pages/**/*.{js,ts,jsx,tsx}',
		'./components/**/*.{js,ts,jsx,tsx}',
	],
	theme: {
		screens: {
			navbar: '980px',
		},
		extend: {
			backgroundImage: (theme) => ({
				'hero-pattern': "url('/bg-pattern.png')",
			}),
		},
	},
	plugins: [],
};
