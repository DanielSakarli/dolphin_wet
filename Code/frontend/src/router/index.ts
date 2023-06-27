import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import EvaluationMenu from '@/views/EvaluationMenu.vue';


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
		component: () => import ('@/views/LoginPage.vue')
	},
	{
		path: '/login',
		component: () => import ('@/views/LoginFormPage.vue')
	},
	{
		path: '/signup',
		component: () => import ('@/views/SignupPage.vue')
	},
	{
		path: '/folder/Evaluate',
		component: EvaluationMenu
	},
	{
		path: '/folder/Dolphins',
		component: () => import ('@/views/DolphinEvaluationMenu.vue')
	},
	{
		path: '/folder/Data',
		component: () => import ('@/views/DolphinEvaluationMenu.vue')
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
		component: () => import('@/views/EmotionalStateIndicatorCollector.vue')
	},
	{
		path: '/detailFeeding',
		name: 'DetailFeeding',
		component: () => import('@/views/FeedingIndicatorCollector.vue')
	},
	{
		path: '/detailHousing',
		name: 'DetailHousing',
		component: () => import('@/views/HousingIndicatorCollector.vue')
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
