<template>
	<base-layout pageTitle="Sign up Form">
		<h2
			style="
				position: fixed;
				left: 0;
				top: 100px;
				right: 0;
				margin: 30px;
				color: aliceblue;
			"
		>
			Create <br />
			Account
		</h2>
		<div
			class="wrapper"
			style="position: fixed; left: 0; bottom: 100px; right: 0"
		>
			<ion-card>
				<ion-icon name="heart" aria-hidden="true"></ion-icon>
				<ion-card-content>
					<ion-input
						ref="input"
						type="text"
						fill="solid"
						label="Name"
						label-placement="floating"
						helper-text="Enter Your Name"
					></ion-input>
					<ion-input
						ref="input"
						type="email"
						fill="solid"
						label="Email"
						label-placement="floating"
						helper-text="Enter a valid email"
					></ion-input>
					<ion-input
						ref="input"
						type="password"
						fill="solid"
						label="Password"
						label-placement="floating"
						helper-text="Enter your password"
					></ion-input>
					<ion-button color="primary" expand="block">Sign up</ion-button>
					<p style="text-align: center">
						----------------- or -------------------
					</p>
					<router-link to="/loginform"
						><ion-button
							color="light"
							style="
								border: 1px solid gray;
								border-radius: 15px;
								margin-top: 10px;
							"
							expand="block"
							>Log in</ion-button
						></router-link
					>
				</ion-card-content>
			</ion-card>
		</div>
	</base-layout>
</template>

<script lang="ts">
import { IonInput } from '@ionic/vue';
import { defineComponent } from 'vue';
import { IonIcon } from '@ionic/vue';

export default defineComponent({
	components: { IonInput, IonIcon },
});
</script>
