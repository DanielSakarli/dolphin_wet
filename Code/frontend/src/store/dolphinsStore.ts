import { defineStore } from 'pinia';
import axios from 'axios';
import dolphinList from '@/data/animalList.json';
import { baseUrl } from '@/utils/baseUrl';

// In this file the dolphinList is taken from the animalList.json with the default
// reference values. The fill() function is used to get the dolphinList from the
// backend server if there is an internet connection present. If there is an
// internet connection, the dolphinList is updated with the values from the backend.
// If no internet connection is present, the dolphinList is not updated and the
// default values are used.

export const useDolphinsStore = defineStore('dolphinsStore', {
	state: () => {
		return {
			dolphinList,
		};
	},

	actions: {
		async fill() {
			this.dolphinList = dolphinList; // default values from animalList.json

			//(await import("@/views/EvaluationMenu.vue")).default
			const dolphinUrl = baseUrl + '/api/dolphins';
			await axios
				.get(dolphinUrl)
				.then((response) => {
					// if internet connection is present, the dolphinList is updated with
					// the values from the backend
					this.dolphinList = response.data;
					return this.dolphinList;
				})
				.catch((e) => {
					// if no internet connection is present, the default values are used
					console.error(e);
					return this.dolphinList;
				});
		},
	},
});
