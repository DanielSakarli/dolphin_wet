<template >
    <base-layout pageTitle="Login">
            <div class="wrapper" style=" position: fixed;left: 0;bottom: 100px;right: 0;padding: 20px;">
                <h3 style="color:white">DoliMo</h3>
                <h6 style="color:white"> Dolphin Health Monitoring </h6>
                <router-link to="/loginform"><ion-button color="light"  expand="block">Login</ion-button></router-link>
                <router-link to="/signup"><ion-button color="tertiary" style="border: 2px solid white;border-radius: 15px;margin-top: 10px;" expand="block">Sign Up</ion-button></router-link>
            </div>
    </base-layout>
</template>

<script lang="ts">
import { IonButton} from '@ionic/vue';
export default {
    components:{
        IonButton
    }
}
</script>