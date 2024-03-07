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
	},
	{
		path: '/login',
		component: () => import('@/views/LoginFormPage.vue'),
	},
	{
		path: '/signup',
		component: () => import('@/views/SignupPage.vue'),
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
	},
	{
		path: '/detailBehaviour',
		name: 'DetailBehaviour',
		component: () => import('@/views/BehaviourIndicatorCollector.vue'),
	},
	{
		path: '/detailEmotionalState',
		name: 'DetailEmotionalState',
		component: () => import('@/views/EmotionalStateIndicatorCollector.vue'),
	},
	{
		path: '/detailFeeding',
		name: 'DetailFeeding',
		component: () => import('@/views/FeedingIndicatorCollector.vue'),
	},
	{
		path: '/detailHousing',
		name: 'DetailHousing',
		component: () => import('@/views/HousingIndicatorCollector.vue'),
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
	if (to.matched.some((record) => record.meta.requiresAuth)) {
		// Check if the user is not logged in
		if (!localStorage.getItem('token')) {
			// Redirect to the login page
			next({ path: '/login' });
		} else {
			// Proceed to the route
			next();
		}
	} else {
		// If the route does not require authentication, proceed to the route
		next();
	}
});

export default router;
