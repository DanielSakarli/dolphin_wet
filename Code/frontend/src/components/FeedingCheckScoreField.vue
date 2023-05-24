<template >
        <ion-item v-if=" subcriteria === 'firstSubcriteriaFeeding'" lines="none">
            <ion-checkbox justify="space-between" :value="fulfilled"
                >{{ $t('fulfilled') }}
            </ion-checkbox>
        </ion-item>
        <ion-item lines="none">
            <ion-checkbox justify="space-between" :value="noTendency"
                >{{ $t('notFulfilled') }}
            </ion-checkbox>
        </ion-item>
        <ion-item lines="none">
            <ion-checkbox justify="space-between" :value="notFulfilled"
                >{{ $t('noStatement') }}
            </ion-checkbox>
        </ion-item>
</template>

<script lang="ts">
import { 
	IonCheckbox, 
	IonItem, 
	IonCard, 
	IonThumbnail, 
	IonButton, 
	IonIcon,
    IonContent
} from '@ionic/vue';
import {camera} from 'ionicons/icons';
import FeedingCheckCriteriaSelector from '@/components/FeedingCheckCriteriaSelector.vue';

export default {
	components: {
		IonCheckbox,
		IonItem,
		IonCard,
		IonThumbnail,
		IonButton,
		IonIcon,
        FeedingCheckCriteriaSelector,
        IonContent
	},
	data() {
		return {
			fulfilled: this.$t('fulfilled'),
			noTendency: this.$t('noTendency'),
			notFulfilled: this.$t('notFulfilled'),
			camera,
            subcriteria: '',
		};
	},
    methods: {
        // Eine Methode zum Abrufen der subcriteria-Werte aus der FeedingCheckCriteriaSelector-Komponente
        getSubcriteriaValue(subcriteria: string) {
        this.subcriteria = subcriteria;
        }
    },      
};
</script>

<style scoped>
ion-checkbox {
	margin: 0.5rem 2rem;
}
ion-card {
	margin: 5px 15px;
}
</style>
