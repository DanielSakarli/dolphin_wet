<template>
	<div>
		<h1>Add Dolphin</h1>
		<form @submit.prevent="addDolphin">
			<input v-model="dolphin.name" type="text" placeholder="Dolphin Name" />
			<input v-model="dolphin.sex" type="number" placeholder="Dolphin Sex" />
			<input v-model="dolphin.on_site" type="number" placeholder="On Site?" />
			<input
				v-model="dolphin.year_of_birth"
				type="number"
				placeholder="Year of Birth"
			/>
			<input
				v-model="dolphin.place_of_birth"
				type="text"
				placeholder="Place of Birth"
			/>
			<button type="submit">Add Dolphin</button>
		</form>
		<p v-if="errorMessage">{{ errorMessage }}</p>
		<p v-else-if="isLoading">Loading...</p>
	</div>
</template>

<script lang="ts">
import { ref } from 'vue';
import axios from 'axios';
import apiClient from '@/utils/apiClient.js';
import { baseUrl } from '@/utils/baseUrl';

interface Dolphin {
	dolphin_id?: number;
	name: string;
	sex: number;
	on_site: number;
	year_of_birth: number;
	place_of_birth: string;
}

export default {
	setup() {
		const dolphin = ref<Dolphin>({
			name: '',
			sex: 0,
			on_site: 0,
			year_of_birth: new Date().getFullYear(),
			place_of_birth: '',
		});
		const errorMessage = ref<string>('');
		const isLoading = ref<boolean>(false);

		const addDolphin = async () => {
			isLoading.value = true;
			errorMessage.value = '';
			try {
				await axios.post(
					baseUrl + '/api/dolphins', // http://88395-17112.pph-server.de/api/dolphins',
					dolphin.value
				);
			} catch (error) {
				if (axios.isAxiosError(error)) {
					errorMessage.value =
						error.response?.data.error || 'Unknown error occurred.';
				}
			} finally {
				isLoading.value = false;
			}
		};

		return {
			dolphin,
			errorMessage,
			isLoading,
			addDolphin,
		};
	},
};
</script>

<style scoped>
.error {
	color: red;
	font-weight: bold;
	border: 1px solid red;
	padding: 10px;
	margin-top: 10px;
	border-radius: 5px;
	background-color: #ffe6e6;
}
</style>
