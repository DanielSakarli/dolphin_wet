<template >
    <base-layout pageTitle="Login Form">
        <h3 style=" position: fixed;left: 0;top: 100px;right: 0;margin: 30px;color: aliceblue;">Welcome <br> Back</h3>
        <div class="wrapper" style=" position: fixed;left: 0;bottom: 100px;right: 0;">
            <ion-card>
                <ion-icon name="heart" aria-hidden="true"></ion-icon>
                <ion-card-content>
                    <ion-input
                        ref="input"
                        type="email"
                        fill="solid"
                        label="Email"
                        label-placement="floating"
                        helper-text="Enter a valid email"
                        className='form-input'
                        id='e-mail'
                        v-model="email"
                    ></ion-input>
                    <ion-input
                        ref="input"
                        type="password"
                        fill="solid"
                        label="Password"
                        label-placement="floating"
                        helper-text="Enter your password"
                        v-model="password"
                    ></ion-input>
                    <h5 style="text-align: right;color:#6370ff;margin-bottom: 10px;font-weight: 700;">Forget Passowrd?</h5>
                    <ion-button color="primary" expand="block" router-link="/folder/Evaluate" @click="login">Log in</ion-button>
                    <p style="text-align: center;">----------------- or -------------------</p>
                    <ion-button color="light" style="border: 1px solid gray;border-radius: 15px;margin-top: 10px;" expand="block" router-link="/signup">Sign up</ion-button>

                </ion-card-content>
            </ion-card>
        </div>
    </base-layout>
</template>

<script lang="ts">
import { IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import { IonIcon, IonButton, IonCard, IonCardContent } from '@ionic/vue';
import axios from 'axios';

export default defineComponent ({
    components: { IonInput, IonIcon, IonButton, IonCard, IonCardContent},
    data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login() {
      const url = 'http://88395-17112.pph-server.de/api/users/login';

      const requestBody = {
        username: this.email,
        password: this.password,
      };
      console.log(this.email, this.password);
      axios
        .post(url, requestBody)
        .then((response) => {
          console.log('Response:', response.data);
        })
        .catch((error) => {
          console.error('Error:', error.response.data);
        });
    }
  }
});


</script>