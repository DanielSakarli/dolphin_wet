module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/typescript/recommended',
		'prettier',
	],
	plugins: ['prettier'],
	parserOptions: {
		ecmaVersion: 2020,
	},
	rules: {
		'prettier/prettier': 'error',
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'func-names': 'off',
		'vue/no-deprecated-slot-attribute': 'off',
		'@typescript-eslint/no-explicit-any': 'off',
	},
};
