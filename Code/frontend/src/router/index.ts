import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import EvaluationMenu from '@/views/EvaluationMenu.vue';
import DolphinEvaluationMenu from '@views/DolphinEvaluationMenu';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/folder/Evaluate',
	},
	{
		path: '/folder/Evaluate',
		component: () => import ('../views/EvaluationMenu.vue')
	},
	{
		path: '/folder/Dolphins',
		component: () => import ('../views/DolphinEvaluationMenu.vue')
	},
	{
		path: '/folder/Data',
		component: () => import ('../views/DolphinEvaluationMenu.vue')
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
	},
	{
		path: '/detailFeeding',
		name: 'DetailFeeding',
		component: () => import('@/views/FeedingIndicatorCollector.vue')
	},
	{
		path: '/detailHousing',
		name: 'DetailFeeding',
		component: () => import('@/views/HousingIndicatorCollector.vue')
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
