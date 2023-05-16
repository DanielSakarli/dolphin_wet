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
		component: EvaluationMenu
	},
	{
		path: '/detail',
		name: 'Detail',
		component: () => import('@/views/IndicatorCollector.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
