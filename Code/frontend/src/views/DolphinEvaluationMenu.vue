<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>DoliMo - DolphinMonitoring</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <ion-button expand="block" size="large" router-link="/folder/Evaluate">{{$t('dolphin1')}}</ion-button>    
            <ion-button expand="block" size="large" router-link="/folder/Evaluate">{{$t('dolphin2')}}</ion-button>
            <ion-button expand="block" size="large" router-link="/folder/Evaluate">{{$t('dolphin3')}}</ion-button>
            <ion-button expand="block" size="large" router-link="/folder/Evaluate">{{$t('dolphin4')}}</ion-button>
            <ion-button expand="block" size="large" router-link="/folder/Evaluate">{{$t('dolphin5')}}</ion-button>
            <ion-button expand="block" size="large" router-link="/folder/Evaluate">{{$t('dolphin6')}}</ion-button>
        </ion-content>
    </ion-page>
</template>

<script lang="ts">
import {
IonPage,
IonHeader,
IonToolbar,
IonTitle,
IonContent,
IonList,
IonButton
} from '@ionic/vue';

export default {
    data() {
        return {
            
        };
    },
    components:{
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonButton
    },
    methods: {
            changeLanguage($event: any) {
                this.$i18n.locale = $event.detail.value;
            },
        },
}
</script>