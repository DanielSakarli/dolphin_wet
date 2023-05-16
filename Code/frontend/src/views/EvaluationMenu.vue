<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title>DoliMo - DolphinMonitoring</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-list>
            <ion-item>
                <ion-label>Good Health</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>Behaviour</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>The Legend of Zelda</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>Pac-Man</ion-label>
            </ion-item>
            <ion-item>
                <ion-label>Super Mario World</ion-label>
            </ion-item>
        </ion-list>
    </ion-page>
</template>

<script lang="ts">
import {
IonPage,
IonHeader,
IonToolbar,
IonTitle,
IonContent,
IonList
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
        IonList
    },
    methods: {
            changeLanguage($event: any) {
                this.$i18n.locale = $event.detail.value;
            },
        },
}
</script>