<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-buttons slot="start">
                    <ion-menu-button></ion-menu-button>
                </ion-buttons>
                <ion-title>DoliMo - DolphinMonitoring</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-list>
                <ion-item>
                    <ion-select 
                            label= "Dolphins"
                            placeholder="select Dolphin"
                            okText="OK"
                            cancelText="Cancel"		
                            v-model= "dolphinSelect">
                        <ion-select-option v-for="dolphin in dolphinsStore.dolphinList" v-bind:key="dolphin.name">{{ dolphin.name }}</ion-select-option>
                    </ion-select>
                </ion-item>
                <ion-item>
                    <ion-select 
                            label= "Principle"
                            placeholder="select Principle"
                            okText="OK"
                            cancelText="Cancel"		
                            v-model= "principleSelect">
                        <ion-select-option v-for="principle in principles">{{ principle }}</ion-select-option>
                    </ion-select>
                </ion-item>
            </ion-list>
            <ion-button expand="block" @click="showDolphins">
                <ion-icon slot="start" :icon="reload"></ion-icon>Generate Data</ion-button>
            <ion-card v-if="dataFeeding">
                <ion-list>
                    <ion-item v-for="(data, monthYear) in dataFeeding" :key="monthYear">
                        <ion-list>
                            <h3>{{ monthYear }}</h3>
                            <ion-list v-if="data">
                                <ion-item v-for="feedingRecord in data" :key="feedingRecord.feeding_record_id">
                                    <ion-label>
                                        <p>Dolphin Name: {{ feedingRecord.dolphin_name }}</p>
                                        <p>Body Condition Score: {{ feedingRecord.body_condition_score }}</p>
                                        <p>Weight Measured [kg]: {{ feedingRecord.weight_measured }}</p>
                                        <p>Kcal Calculations: {{ feedingRecord.kcal_calculations }}</p>
                                        <p>Blood Hydration: {{ feedingRecord.blood_hydration }}</p>
                                        <p>Fish Quality: {{ feedingRecord.fish_quality }}</p>
                                        <p>Fish Variety: {{ feedingRecord.fish_variety }}</p>
                                        <p>Comments: {{ feedingRecord.comments || 'N/A' }}</p>
                                        <p>Created At: {{ feedingRecord.created_at }}</p>
                                        <p>Updated At: {{ feedingRecord.updated_at }}</p>
                                    </ion-label>
                                </ion-item>
                            </ion-list>
                            <ion-label v-else>
                                <p>No data available for this month and year.</p>
                            </ion-label>
                        </ion-list>
                    </ion-item>
                </ion-list>
            </ion-card>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonButton, IonButtons, IonMenu, IonMenuButton,
    IonIcon, IonSelect, IonSelectOption, IonItem, IonCard, IonLabel
} from '@ionic/vue';
import {reload} from 'ionicons/icons';
import axios from 'axios';
import { useDolphinsStore }from '@/store/dolphinsStore';

const dolphinsStore = useDolphinsStore();
const urlFeeding = `http://88395-17112.pph-server.de/api/good_feeding?name=`;

interface FeedingRecord {
        feeding_record_id: number;
        user_id: number;
        dolphin_id: number;
        dolphin_name: string;
        body_condition_score: number;
        weight_measured: number;
        kcal_calculations: number;
        blood_hydration: number;
        fish_quality: number;
        fish_variety: number;
        comments: string | null;
        created_at: string;
        updated_at: string;
}
interface DataFeeding {
    [monthYear: string]: FeedingRecord[];
}

export default {
    data() {
        return {
            reload,
            dolphinsStore: dolphinsStore,
            dolphinSelect: null as string | null,
            principleSelect: null as string | null,
            principles: [this.$t('principleFeeding'), this.$t('principleHousing'), this.$t('principleHealth'), 
                        this.$t('principleBehaviour'), this.$t('principleEmotionalState') ],
            dataFeeding: null as DataFeeding | null,
        };
    },
    components:{
        IonPage, IonHeader, IonToolbar,
        IonTitle, IonContent, IonList,
        IonButton, IonButtons, IonMenu,
        IonMenuButton, IonIcon, IonSelect, 
        IonSelectOption, IonItem, IonCard, IonLabel
    },


    methods: {
            async showDolphins() {
                console.log(urlFeeding + this.dolphinSelect)
                await axios.get(urlFeeding + this.dolphinSelect)
                    .then ((response) => {
                    this.dataFeeding = response.data;
                    console.log('Response:', response.data);
                    })
                    .catch ((e) => {
                    console.error(e);
                    });
            },

            changeLanguage($event: any) {
                this.$i18n.locale = $event.detail.value;
            },
        },
}
</script>