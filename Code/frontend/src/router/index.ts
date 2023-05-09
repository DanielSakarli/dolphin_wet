import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import IndicatorCollectorVue from '@/views/IndicatorCollector.vue';

const routes: Array<RouteRecordRaw> = [
	{
		path: '/',
		redirect: '/test',
	},
	{
		path: '/test',
		name: 'test',
		component: IndicatorCollectorVue,
	},
];

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes,
});

export default router;
