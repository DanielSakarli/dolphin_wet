import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import EvaluationMenu from '@/views/EvaluationMenu.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/home',
	},
	{
		path: '/home',
		name: 'Home',
		component: EvaluationMenu
	},
	{
		path: '/detailHealth',
		name: 'DetailHealth',
		component: () => import('@/views/HealthIndicatorCollector.vue'),
	},
	{
		path: '/detailEmotionalState',
		name: 'DetailEmotionalState',
		component: () => import('@/views/EmotionalStateIndicatorCollector.vue')
	}
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
