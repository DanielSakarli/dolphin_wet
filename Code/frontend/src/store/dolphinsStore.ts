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

interface Dolphin {
	dolphin_id: number;
	name: string;
	sex: number;
	on_site: number;
	year_of_birth: number;
	min_weight_measured: number;
	max_weight_measured: number;
	min_kcal_calculations: number;
	max_kcal_calculations: number;
}

export const useDolphinsStore = defineStore('dolphinsStore', {
	state: () => {
		return {
			// return empty array if fill() method cannot be executed due to internet connectivity
			// as soon as fill() was once executed successfully, the dolphinList will be filled with the values from the backend
			dolphinList: [] as Dolphin[], //[sessionStorage.getItem('roleName')],
		};
	},

	actions: {
		async fill() {
			//sessionStorage.setItem('roleName', 'nuernberg');
			const roleName = sessionStorage.getItem('roleName');

			if (roleName) {
				this.dolphinList = dolphinList[roleName as keyof typeof dolphinList];
			}
			// Only set this.dolphinList to the values from the JSON file if this.dolphinList is empty
			/*if (!this.dolphinList.length) {
				this.dolphinList = dolphinList; //.map((name: string) => ({ name })); // default values from animalList.json
			}*/

			const dolphinUrl = baseUrl + '/api/dolphins';
			await axios
				.get(dolphinUrl, {
					withCredentials: true,
					hideGlobalLoading: true,
				})
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
