/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	daisyui: {
		themes: ["coffee"]
	},
	theme: {
		extend: {
			screens: {
				xs: '600px'
			},
			fontFamily: {
				condense: ['Roboto Condensed', 'sans-serif'],
				roboto: ['Poppins', 'sans-serif'],
				sans: ['Inter', 'sans-serif']
			}
		}
	},
	plugins: [require('daisyui')]
};
