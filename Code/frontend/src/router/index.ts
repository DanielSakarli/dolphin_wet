import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';

// import EvaluationMenu from '@/views/EvaluationMenu.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/detail',
		redirect: '/folder/Evaluate',
	},
	{
		path: '/home',
		component: () => import('@/views/LoginPage.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/login',
		component: () => import('@/views/LoginFormPage.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/signup',
		component: () => import('@/views/SignupPage.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/changePassword',
		component: () => import('@/views/ChangePassword.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/resetPassword',
		component: () => import('@/views/ResetPassword.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/folder/Evaluate',
		component: () => import('@/views/EvaluationMenu.vue'), //EvaluationMenu,
		meta: { requiresAuth: true },
	},
	{
		path: '/folder/Dolphins',
		component: () => import('@/views/DolphinEvaluationMenu.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/folder/Data',
		component: () => import('@/views/ViewData.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/folder/Settings',
		component: () => import('@/views/Settings.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/detailHealth',
		name: 'DetailHealth',
		component: () => import('@/views/HealthIndicatorCollector.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/detailBehaviour',
		name: 'DetailBehaviour',
		component: () => import('@/views/BehaviourIndicatorCollector.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/detailEmotionalState',
		name: 'DetailEmotionalState',
		component: () => import('@/views/EmotionalStateIndicatorCollector.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/detailFeeding',
		name: 'DetailFeeding',
		component: () => import('@/views/FeedingIndicatorCollector.vue'),
		meta: { requiresAuth: true },
	},
	{
		path: '/detailHousing',
		name: 'DetailHousing',
		component: () => import('@/views/HousingIndicatorCollector.vue'),
		meta: { requiresAuth: true },
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL), //Creates a history object that keeps track of the url history
	routes,
});

// If in the localStorage the token of the user is not there
// then the user is redirected to the login page if he clicks
// on the Evaluate, Dolphins, or View Data button of the menu
// If login successful, the token is stored in the localStorage
router.beforeEach((to, from, next) => {
	console.log('token in router file: ', localStorage.getItem('token'));
	if (to.path === '/login' || to.path === '/home') {
		// Set the token to an empty string
		localStorage.setItem('token', '');
		console.log(
			'token set to empty string because user entered login or home page'
		);
		next();
	} else if (from.path === '/login' || from.path === '/home') {
		// If the user is navigating to the home or login page
		if (
			!localStorage.getItem('token') ||
			localStorage.getItem('token') === ''
		) {
			if (
				to.path === '/home' ||
				to.path === '/signup' ||
				to.path === '/changePassword' ||
				to.path === '/resetPassword'
			) {
				// User able to access above routes when NOT logged in
				next();
			} else {
				// Redirect to the login page
				next('/login');
			}
		} else {
			next();
		}
	} else if (to.matched.some((record) => record.meta.requiresAuth)) {
		// Check if the route requires authentication
		// Check if the user is not logged in
		if (!localStorage.getItem('token')) {
			// Redirect to the login page
			next('/login');
		} else {
			// If the user is logged in, proceed to the route
			//next();

			// Check if dataInBody is present in localStorage
			// dataInBody is a flag that indicates if the user
			// has unsaved data in the CheckCriteriaSelector
			// vue files.
			console.log('dataInBody: ', localStorage.getItem('dataInBody'));
			console.log(
				'backButtonClicked: ',
				localStorage.getItem('backButtonClicked')
			);
			if (localStorage.getItem('dataInBody') === 'false') {
				next();
			}
			if (
				localStorage.getItem('dataInBody') === 'true' &&
				localStorage.getItem('backButtonClicked') === 'false'
			) {
				// Show a warning message to the user
				if (
					window.confirm(
						'Warning: You have unsaved data. Are you sure you want to leave?'
					)
				) {
					// If the user confirms, proceed to the route
					localStorage.setItem('dataInBody', 'false');
					next();
				} else {
					// If the user cancels, stop navigation
					next(false);
				}
			}
			if (
				localStorage.getItem('dataInBody') === 'true' &&
				localStorage.getItem('backButtonClicked') === 'true'
			) {
				next();
			}
		}
	} else {
		// If the route does not require authentication, proceed to the route
		next();
	}
});

export default router;
