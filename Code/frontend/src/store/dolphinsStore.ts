import { defineStore } from 'pinia';
import axios from 'axios';
//import dolphinList from '@/views/EvaluationMenu.vue';
import dolphinList from '@/data/animalList.json';

export const useDolphinsStore = defineStore('dolphinsStore', {
	state: () => {
		return {
			dolphinList,
		};
	},
	/* actions: {
        async fill(){
            this.dolphinList = dolphinList;
            //(await import("@/views/EvaluationMenu.vue")).default
            await axios.get('http://88395-17112.pph-server.de/api/dolphins')
                .then ((response) => {
                    this.dolphinList = response.data;
                })
                .catch ((e) => {
                console.error(e);
                });
        }
    }*/
});
