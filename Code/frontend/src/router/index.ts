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
		path: '/detailHealth',
		name: 'DetailHealth',
		component: () => import('@/views/HealthIndicatorCollector.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/detailBehaviour',
		name: 'DetailBehaviour',
		component: () => import('@/views/BehaviourIndicatorCollector.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/detailEmotionalState',
		name: 'DetailEmotionalState',
		component: () => import('@/views/EmotionalStateIndicatorCollector.vue'),
		meta: { requiresAuth: false },
	},
	{
		path: '/detailFeeding',
		name: 'DetailFeeding',
		component: () => import('@/views/FeedingIndicatorCollector.vue'),
		meta: { requiresAuth: false },
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
	// Check if the route requires authentication
	console.log('token in router file: ', localStorage.getItem('token'));
	if (to.matched.some((record) => record.meta.requiresAuth)) {
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
			console.log('backButtonClicked: ', localStorage.getItem('backButtonClicked'));
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
			if (localStorage.getItem('dataInBody') === 'false') {
				next();
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
