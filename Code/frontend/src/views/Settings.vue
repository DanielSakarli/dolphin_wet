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
				<ion-item button>
					<ion-label> Delete an user </ion-label>
				</ion-item>
			</ion-list>
			<!-- Delete User Button -->
			<ion-modal :is-open="deleteModalOpen">
				<ion-header>
					<ion-toolbar>
						<ion-title>Delete User</ion-title>
						<ion-buttons slot="end">
							<ion-button @click="closeDeleteModal">Close</ion-button>
						</ion-buttons>
					</ion-toolbar>
				</ion-header>
				<ion-content>
					<form @submit.prevent="submitEdit">
						<ion-item>
							<ion-label position="stacked">Name</ion-label>
							<ion-list
								v-model="users.name"
								id="name"
								placeholder="Enter name"
							></ion-list>
						</ion-item>
						<ion-item>
							<ion-input
								ref="input"
								type="password"
								fill="solid"
								label="Zoo Administrator Password"
								label-placement="floating"
								helper-text="Enter the zoo´s administrator password"
								id="password"
								v-model="adminPassword"
							></ion-input>
						</ion-item>
						<ion-button expand="full" type="submit"> Delete User </ion-button>
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
	IonRow,
	IonCol,
	IonCard,
	IonCardTitle,
	IonContent,
	IonFooter,
	IonHeader,
	IonInput,
	IonItem,
	IonLabel,
	IonList,
	IonModal,
	IonToolbar,
	IonText,
	IonButtons,
	IonTitle,
	IonMenuButton,
	alertController,
} from '@ionic/vue';
//import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
//import { useRouter } from 'vue-router';
import { baseUrl } from '@/utils/baseUrl';
import { useDolphinsStore } from '@/store/dolphinsStore';
import AddDolphin from './AddDolphin.vue';
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const dolphinsStore = useDolphinsStore();

export default {
	components: {
		IonPage,
		IonButton,
		IonRow,
		IonCol,
		IonCard,
		IonCardTitle,
		IonContent,
		IonFooter,
		IonHeader,
		IonInput,
		IonItem,
		IonLabel,
		IonList,
		IonModal,
		IonToolbar,
		IonText,
		IonButtons,
		IonTitle,
		IonMenuButton,
		AddDolphin,
	},
	methods: {
		changeLanguage($event: any) {
			this.$i18n.locale = $event.detail.value;
		},

		// Fetch all dolphins when component is created
		async fetchUsers() {
			try {
				await axios
					.get(
						baseUrl + '/api/users/',
						{ withCredentials: true }
					)
					.then((response) => {
						if (localStorage.getItem('reload_data_button_pressed') === 'true') {
							toast.success('Dolphin data up to date.', {
								autoClose: 1500,
							});
							localStorage.setItem('reload_data_button_pressed', 'false');
						}
						console.log('Response:', response.data);
						this.dolphins = response.data;
						this.currentDolphinValues = response.data;
						console.log('Current dolphin values: ', this.currentDolphinValues);
					})
					.catch((e) => {
						console.error(e);

						toast.error('Error while getting the dolphin data.', {
							autoClose: 2000,
						});
					});
			} catch (error) {
				this.errorMessage = 'Error fetching dolphins.';
			}
		},

		// Gets called after user added a new dolphin
		// fetches the newest dolphinList and closes the ion-modal for adding dolphins
		dolphinAdded() {
			this.fetchDolphins();
			this.addModalOpen = false;
		},

		deleteDolphin() {
			if (this.currentDolphinValues.name) {
				this.showAlert().then(() => {
					let deleteDolphin = this.currentDolphinValues.name;
					const urlDelete = baseUrl + `/api/dolphins/${deleteDolphin}`;
					axios
						.delete(urlDelete, { withCredentials: true })
						.then((response) => {
							console.log('Response:', response.data);
							this.fetchDolphins();
							this.showDolphin = false;
							toast.success(`Dolphin ${deleteDolphin} successfully deleted!`, {
								autoClose: 1700,
							});
							deleteDolphin = '';
						})
						.catch((error) => {
							console.error('Error:', error.response.data);
							if (error.response.data.error === 'USER_NOT_AN_ADMINISTRATOR') {
								toast.error('User has no administrator rights!', {
									autoClose: 2000,
								});
							}
							deleteDolphin = '';
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
						message: 'Are you sure you want to delete the dolphin?',
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

		// Select a dolphin to view
		selectDolphin(dolphin: any) {
			this.currentDolphin = dolphin;
			/*this.currentDolphinIndex = this.dolphins.findIndex(
				(d) => d.dolphin_id === dolphin.dolphin_id
			);*/
			this.currentDolphinIndex = Object.keys(this.dolphins).indexOf(
				dolphin.dolphin_id.toString()
			);
			this.currentDolphinValues = { ...dolphin };
			this.showDolphin = true;
		},

		// Move to the next dolphin
		nextDolphin() {
			if (this.nextDolphinAvailable()) {
				this.currentDolphinIndex += 1; // The '!' after the value asserts that it is not null
				this.currentDolphin = this.dolphins[this.currentDolphinIndex]; // Here as well
				this.currentDolphinValues = { ...this.currentDolphin };
			}
		},

		nextDolphinAvailable() {
			return (
				this.currentDolphinIndex !== null &&
				this.currentDolphinIndex < Object.keys(this.dolphins).length - 1
			);
		},
		// Move to the previous dolphin
		prevDolphin() {
			if (this.prevDolphinAvailable()) {
				this.currentDolphinIndex -= 1; // And here
				this.currentDolphin = this.dolphins[this.currentDolphinIndex]; // And here
				this.currentDolphinValues = { ...this.currentDolphin };
			}
		},
		prevDolphinAvailable() {
			return this.currentDolphinIndex !== null && this.currentDolphinIndex > 0;
		},
		// Open the edit modal
		openEditModal() {
			this.editModalOpen = true;
		},
		// Close the edit modal
		closeEditModal() {
			this.editModalOpen = false;
		},
		// Submit edited dolphin values
		async submitEdit(event: Event) {
			event.preventDefault();

			if (this.currentDolphinValues) {
				console.log('Current values: ', this.currentDolphinValues);
			}
			const foundDolphin: any = dolphinsStore.dolphinList.find(
				(dolphin) => dolphin.name === this.currentDolphinValues?.name
			);

			if (foundDolphin) {
				//let dolphinCopy = { ...foundDolphin }; // Copies data so I can remove the id later on
				const dolphinCopy = {
					name: this.currentDolphinValues?.name,
					sex: this.currentDolphinValues?.sex,
					on_site: this.currentDolphinValues?.on_site,
					year_of_birth: this.currentDolphinValues?.year_of_birth.toString(),
					place_of_birth: this.currentDolphinValues?.place_of_birth.toString(),
					min_weight_measured: this.currentDolphinValues?.min_weight_measured,
					max_weight_measured: this.currentDolphinValues?.max_weight_measured,
					min_kcal_calculations:
						this.currentDolphinValues?.min_kcal_calculations,
					max_kcal_calculations:
						this.currentDolphinValues?.max_kcal_calculations,
				};

				/*if (dolphinCopy?.dolphin_id) {
					delete dolphinCopy.dolphin_id;
				} //delete dolphin_id since it is not allowed to be changed or be in the request body during a patch request
				*/
				console.log('This is sent to backend: ', dolphinCopy);
				const urlPatch = baseUrl + `/api/dolphins/${dolphinCopy.name}`;
				await axios
					.patch(urlPatch, dolphinCopy, { withCredentials: true })
					.then((response) => {
						console.log('Response:', response.data);
						this.closeEditModal();
						console.log('Current dolphin: ', this.currentDolphin?.name);
						this.fetchDolphins();
						toast.success('Dolphin data has been updated.', {
							autoClose: 1500,
						});
						// Set current dolphin name to null and then again to name
						// Because than the ion-card with the new dolphin data will be updated
						/*if (currentDolphin.value !== null) {
						currentDolphin.value.name = null; //closes the ion-card
					}*/
						this.showDolphin = false;
					})
					.catch((error) => {
						if (error.response.data.error === 'USER_NOT_AN_ADMINISTRATOR') {
							this.showDolphin = false;
							this.closeEditModal();

							toast.error('User has no administrator rights!', {
								autoClose: 2000,
							});
						}
						console.error('Error:', error.response.data);
					});
			}
		},
		//Adding a new dolphin
		//const addModalOpen = ref<boolean>(false);
		//const newDolphin = ref<Dolphin | null>(null);

		reloadDolphins() {
			localStorage.setItem('reload_data_button_pressed', 'true');
			this.fetchDolphins();
		},

		openAddModal() {
			this.addModalOpen = true;
			this.newDolphin = {
				dolphin_id: 0,
				name: '',
				sex: 0,
				on_site: 0,
				year_of_birth: new Date().getFullYear(),
				place_of_birth: '',
				min_weight_measured: 0,
				max_weight_measured: 0,
				min_kcal_calculations: 0,
				max_kcal_calculations: 0,
				//created_at: '',
				//updated_at: '',
			};
		},
		//Model and form for adding a dolphin
		closeAddModal() {
			this.addModalOpen = false;
		},

		async submitAdd(event: Event) {
			event.preventDefault();
			if (this.newDolphin) {
				try {
					await axios.post(baseUrl + '/api/dolphins', this.newDolphin, {
						withCredentials: true,
					});
					this.closeAddModal();
					this.fetchDolphins();
					this.showDolphin = false;
				} catch (error) {
					this.showDolphin = false;
					this.errorMessage = 'Error adding dolphin.';
				}
			}
		},
	},
	shouldDisplayKey(key: string | number) {
		const keysToDisplay = [
			'name',
			'sex',
			'on_site',
			'year_of_birth',
			'place_of_birth',
			'min_weight_measured',
			'max_weight_measured',
			'min_kcal_calculations',
			'max_kcal_calculations',
		];
		return keysToDisplay.includes(String(key));
	},
	getPlaceholder(key: string | number) {
		const placeholders = {
			name: 'Enter name',
			sex: 'Enter sex',
			on_site: 'Enter status (1: on-site, 0: not on-site)',
			year_of_birth: 'Enter year of birth',
			place_of_birth: 'Enter place of birth',
			min_weight_measured: 'Enter minimum wanted weight',
			max_weight_measured: 'Enter maximum wanted weight',
			min_kcal_calculations: 'Enter minimum kcal calculations',
			max_kcal_calculations: 'Enter maximum kcal calculations',
		};
		return placeholders[key as keyof typeof placeholders] || key;
	},
	data() {
		return {
			currentDolphinValues: {
				dolphin_id: -1,
				name: '',
				sex: -1,
				on_site: -1,
				year_of_birth: -1,
				place_of_birth: '',
				min_weight_measured: -1,
				max_weight_measured: -1,
				min_kcal_calculations: -1,
				max_kcal_calculations: -1,
			},
			dolphins: [
				{
					dolphin_id: -1,
					name: '',
					sex: -1,
					on_site: -1,
					year_of_birth: -1,
					place_of_birth: '',
					min_weight_measured: -1,
					max_weight_measured: -1,
					min_kcal_calculations: -1,
					max_kcal_calculations: -1,
				},
			],
			currentDolphin: {
				dolphin_id: -1,
				name: '',
				sex: -1,
				on_site: -1,
				year_of_birth: -1,
				place_of_birth: '',
				min_weight_measured: -1,
				max_weight_measured: -1,
				min_kcal_calculations: -1,
				max_kcal_calculations: -1,
			},
			newDolphin: {
				dolphin_id: -1,
				name: '',
				sex: -1,
				on_site: -1,
				year_of_birth: -1,
				place_of_birth: '',
				min_weight_measured: -1,
				max_weight_measured: -1,
				min_kcal_calculations: -1,
				max_kcal_calculations: -1,
			},
			errorMessage: '',
			addModalOpen: false,
			showDolphin: false,
			currentDolphinIndex: 0,
			editModalOpen: false,
			isLoading: false,
		};
	},
	async mounted() {
		this.isLoading = true;
		this.errorMessage = '';
		try {
			const response = await axios.get(
				baseUrl + '/api/dolphins', //'http://88395-17112.pph-server.de/api/dolphins'
				{ withCredentials: true }
			);
			this.dolphins = response.data;
		} catch (error) {
			if (axios.isAxiosError(error)) {
				this.errorMessage =
					error.response?.data.error || 'Unknown error occurred.';
			}
		} finally {
			this.isLoading = false;
		}
	},
};
</script>
