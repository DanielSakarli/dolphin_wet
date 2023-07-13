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
            <ion-button expand="block" size="large" router-link="/detailHealth">{{$t('principleHealth')}}</ion-button>    
            <ion-button expand="block" size="large" router-link="/detailBehaviour">{{$t('principleBehaviour')}}</ion-button>
            <ion-button expand="block" size="large" router-link="/detailEmotionalState">{{$t('principleEmotionalState')}}</ion-button>
            <ion-button expand="block" size="large" router-link="/detailFeeding">{{$t('principleFeeding')}}</ion-button>
            <ion-button expand="block" size="large" router-link="/detailHousing">{{$t('principleHousing')}}</ion-button>
        </ion-content>
        <ion-button fill="clear" size="large" @click="showDolphins">
            Download List of Dolphins
            <ion-icon slot="start" :icon="download" ></ion-icon>
        </ion-button>
    </ion-page>
</template>

<script lang="ts">
import {
    IonPage, IonHeader, IonToolbar, IonTitle, IonContent,
    IonList, IonButton, IonButtons, IonMenu, IonMenuButton,
    IonIcon
} from '@ionic/vue';
import { download } from 'ionicons/icons';
import axios from 'axios';

export default {
    data() {
        return {
            download,
            dolphinList: [] as {name: string}[],
			urlDolphins: 'http://88395-17112.pph-server.de/api/dolphins',
        };
    },
    components:{
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonButton,
        IonButtons,
        IonMenu,
        IonMenuButton,
        IonIcon
    },
    methods: {
            async showDolphins() {
                await axios.get(this.urlDolphins)
                    .then ((response) => {
                    this.dolphinList = response.data;
                    console.log('Response:', this.dolphinList);
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