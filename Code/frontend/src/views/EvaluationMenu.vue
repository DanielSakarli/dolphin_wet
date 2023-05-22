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
            <ion-button expand="block" size="large" router-link="/detail">{{$t('principleBehaviour')}}</ion-button>
            <ion-button expand="block" size="large" router-link="/detailEmotionalState">{{$t('principleEmotionalState')}}</ion-button>
            <ion-button expand="block" size="large" router-link="/detail">{{$t('principleFeeding')}}</ion-button>
            <ion-button expand="block" size="large" router-link="/detail">{{$t('principleHousing')}}</ion-button>
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
IonButton,
IonButtons,
IonMenu,
IonMenuButton,
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
        IonButton,
        IonButtons,
        IonMenu,
        IonMenuButton,
    },
    methods: {
            changeLanguage($event: any) {
                this.$i18n.locale = $event.detail.value;
            },
        },
}
</script>