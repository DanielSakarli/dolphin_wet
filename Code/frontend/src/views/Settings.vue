<template>
	<ion-page>
		<ion-header>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-menu-button></ion-menu-button>
				</ion-buttons>
				<ion-title>Dolphin WET</ion-title>
			</ion-toolbar>
		</ion-header>
		<ion-content>
			<ion-list>
				<ion-item button @click="toggleDeleteModal">
					<ion-label> {{ $t('deleteUser') }}</ion-label>
				</ion-item>
			</ion-list>
			<!-- Delete User Button -->
			<ion-modal :is-open="deleteModalOpen">
				<ion-header>
					<ion-toolbar>
						<ion-title>{{ $t('deleteUser') }}</ion-title>
						<ion-buttons slot="end">
							<ion-button @click="toggleDeleteModal">{{
								$t('close')
							}}</ion-button>
						</ion-buttons>
					</ion-toolbar>
				</ion-header>
				<ion-content>
					<form @submit.prevent="deleteUser">
						<ion-item>
							<ion-radio-group
								v-model="currentUser"
								:allow-empty-selection="true"
							>
								<ion-list>
									<ion-item v-for="(user, index) in users" :key="index">
										<ion-radio :value="user.name" label-placement="start">{{
											user.name
										}}</ion-radio>
									</ion-item>
								</ion-list>
								<!--<ion-list>
									<ion-item v-for="(user, index) in users" :key="index">
										<ion-label :style="{ marginRight: '10px' }">{{
											user.name
										}}</ion-label>
								<ion-radio
									:value="users.name"
									value="start"
									label-placement="stacked"
								></ion-radio>
								</ion-item>
								</ion-list>-->
							</ion-radio-group>
						</ion-item>
						<ion-item>
							<ion-input
								ref="input"
								type="password"
								fill="solid"
								:label="$t('adminPasswordLabel')"
								label-placement="floating"
								:helper-text="$t('adminPasswordHelperText')"
								id="password"
								v-model="adminPassword"
							></ion-input>
						</ion-item>
						<ion-button expand="full" type="submit">
							{{ $t('deleteUser') }}
						</ion-button>
					</form>
				</ion-content>
			</ion-modal>
		</ion-content>
	</ion-page>
</template>

<script lang="ts">
import {
	IonPage,
	IonButton,
	IonContent,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonModal,
	IonToolbar,
	IonButtons,
	IonTitle,
	IonMenuButton,
	IonRadioGroup,
	IonRadio,
	alertController,
} from '@ionic/vue';
//import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';
import { baseUrl } from '@/utils/baseUrl';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';

export default {
	components: {
		IonPage,
		IonButton,
		IonContent,
		IonHeader,
		IonInput,
		IonItem,
		IonLabel,
		IonList,
		IonModal,
		IonToolbar,
		IonButtons,
		IonTitle,
		IonMenuButton,
		IonRadioGroup,
		IonRadio,
	},
	async mounted() {
		this.isLoading = true;
		this.errorMessage = '';
		try {
			const response = await axios.get(
				baseUrl + '/api/users/getUsers', //'http://88395-17112.pph-server.de/api/dolphins'
				{ withCredentials: true }
			);
			this.users = response.data;
			console.log('users: ', this.users);
		} catch (error) {
			if (axios.isAxiosError(error)) {
				this.errorMessage =
					error.response?.data.error || 'Unknown error occurred.';
			}
		} finally {
			this.isLoading = false;
		}
	},
	methods: {
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},

		// Fetch all dolphins when component is created
		async fetchUsers() {
			try {
				await axios
					.get(baseUrl + '/api/users/getUsers', { withCredentials: true })
					.then((response) => {
						console.log('Response:', response.data);
						this.users = response.data;
					})
					.catch((e) => {
						console.error(e);

						toast.error('Error while getting the user data.', {
							autoClose: 2000,
						});
					});
			} catch (error) {
				this.errorMessage = 'Error fetching the users.';
			}
		},

		deleteUser() {
			console.log('Delete user: ', this.currentUser);
			if (this.currentUser) {
				this.showAlert().then(() => {
					const requestBody = {
						userName: this.currentUser,
						adminPassword: this.adminPassword,
					};
					const urlDelete = baseUrl + '/api/users/deleteUser';
					axios
						.delete(urlDelete, { data: requestBody, withCredentials: true })
						.then((response) => {
							console.log('Response:', response.data);
							this.fetchUsers();

							toast.success(`User ${this.currentUser} successfully deleted!`, {
								autoClose: 1700,
							});
							this.currentUser = '';
						})
						.catch((error) => {
							console.error('Error:', error.response);
							if (error.response.data === 'USER_NOT_AN_ADMINISTRATOR') {
								toast.error('User has no administrator rights!', {
									autoClose: 2000,
								});
							}
							if (error.response.data === 'ADMIN_PASSWORD_IS_WRONG') {
								toast.error('Administrator password is wrong!', {
									autoClose: 2000,
								});
							}
							if (error.response.data === 'USER_NAME_NOT_PROVIDED') {
								toast.error('Provide the user to be deleted.', {
									autoClose: 2000,
								});
							}
							if (error.response.data === 'ADMIN_PASSWORD_NOT_PROVIDED') {
								toast.error('Provide an administrator password.', {
									autoClose: 2000,
								});
							}
						});
				});
			}
		},

		showAlert() {
			return new Promise((resolve, reject) => {
				console.log('Reached the alert message');
				alertController
					.create({
						header: 'Confirmation',
						message: 'Are you sure you want to delete the user?',
						buttons: [
							{
								text: 'Cancel',
								role: 'cancel',
								cssClass: 'secondary',
								handler: () => {
									console.log('Cancel clicked');
									reject();
								},
							},
							{
								text: 'Delete',
								handler: () => {
									console.log('Confirm Okay');
									resolve(void 0);
								},
							},
						],
					})
					.then((alert) => {
						alert.present();
					});
			});
		},

		// Open or close the delete modal
		toggleDeleteModal() {
			this.deleteModalOpen = !this.deleteModalOpen;
		},
	},

	data() {
		return {
			currentUser: '',
			users: [] as Array<{ name: string; created_at: string }>,
			adminPassword: '',
			deleteModalOpen: false,
			errorMessage: '',
			addModalOpen: false,
			showDolphin: false,
			currentDolphinIndex: 0,
			editModalOpen: false,
			isLoading: false,
		};
	},
};
</script>
