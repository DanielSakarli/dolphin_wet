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
				<ion-item
					v-for="dolphin in dolphins"
					:key="dolphin.dolphin_id"
					button
					@click="selectDolphin(dolphin)"
				>
					<ion-label
						>{{ dolphin?.name }} (Born: {{ dolphin?.year_of_birth }})</ion-label
					>
				</ion-item>
			</ion-list>
			<!-- Edit Dolphin Button -->
			<ion-modal :is-open="editModalOpen">
				<ion-header>
					<ion-toolbar>
						<ion-title>Edit Dolphin</ion-title>
						<ion-buttons slot="end">
							<ion-button @click="closeEditModal">Close</ion-button>
						</ion-buttons>
					</ion-toolbar>
				</ion-header>
				<ion-content>
					<form @submit.prevent="submitEdit">
						<ion-list>
							<ion-item>
								<!--<ion-label position="stacked">Name</ion-label>-->
								<ion-input
									v-model="currentDolphinValues.name"
									id="name"
									label="Name*"
									label-placement="stacked"
									placeholder="Enter name"
								></ion-input>
							</ion-item>
							<ion-item>
								<ion-input
									v-model="currentDolphinValues.sex"
									id="sex"
									label="Sex*"
									label-placement="stacked"
									placeholder="Enter sex"
								></ion-input>
							</ion-item>
							<ion-item>
								<ion-input
									v-model="currentDolphinValues.on_site"
									id="on_site"
									label="On Site*"
									label-placement="stacked"
									placeholder="Enter status (1: on-site, 0: not on-site)"
								></ion-input>
							</ion-item>
							<ion-item>
								<ion-input
									v-model="currentDolphinValues.year_of_birth"
									id="year_of_birth"
									label="Year of Birth*"
									label-placement="stacked"
									placeholder="Enter year of birth"
								></ion-input>
							</ion-item>
							<ion-item>
								<ion-input
									v-model="currentDolphinValues.place_of_birth"
									id="place_of_birth"
									label="Place of Birth*"
									label-placement="stacked"
									placeholder="Enter place of birth"
								></ion-input>
							</ion-item>
							<ion-item>
								<ion-input
									v-model="currentDolphinValues.min_weight_measured"
									id="min_weight_measured"
									label="Minimum Wanted Weight"
									label-placement="stacked"
									placeholder="Enter minimum wanted weight"
								></ion-input>
							</ion-item>
							<ion-item>
								<ion-input
									v-model="currentDolphinValues.max_weight_measured"
									id="max_weight_measured"
									label="Maximum Wanted Weight"
									label-placement="stacked"
									placeholder="Enter maximum wanted weight"
								></ion-input>
							</ion-item>
							<ion-item>
								<ion-input
									v-model="currentDolphinValues.min_kcal_calculations"
									id="min_kcal_calculations"
									label="Minimum Kcal Calculations"
									label-placement="stacked"
									placeholder="Enter minimum kcal calculations"
								></ion-input>
							</ion-item>
							<ion-item>
								<ion-input
									v-model="currentDolphinValues.max_kcal_calculations"
									id="max_kcal_calculations"
									label="Maximum Kcal Calculations"
									label-placement="stacked"
									placeholder="Enter maximum kcal calculations"
								></ion-input>
							</ion-item>
						</ion-list>
						<ion-text style="margin: 15px; font-size: 0.9em"
							>* necessary fields</ion-text
						>
						<ion-button expand="full" type="submit"> Save Changes </ion-button>
					</form>
				</ion-content>
			</ion-modal>
			<!-- Card content of each dolphin -->
			<ion-card v-if="showDolphin">
				<ion-card-title>{{ currentDolphin.name }}</ion-card-title>
				<ion-item>
					<ion-label>Sex:</ion-label>
					<ion-text>{{ currentDolphin.sex == 0 ? 'Male' : 'Female' }}</ion-text>
				</ion-item>
				<ion-item>
					<ion-label>On Site:</ion-label>
					<ion-text>{{ currentDolphin.on_site == 0 ? 'No' : 'Yes' }}</ion-text>
				</ion-item>
				<ion-item>
					<ion-label>Year of Birth:</ion-label>
					<ion-text>{{ currentDolphin.year_of_birth }}</ion-text>
				</ion-item>
				<ion-item>
					<ion-label>Place of Birth:</ion-label>
					<ion-text>{{ currentDolphin.place_of_birth }}</ion-text>
				</ion-item>
				<ion-item>
					<ion-label>Minimum Wanted Weight:</ion-label>
					<ion-text>{{ currentDolphin.min_weight_measured }}</ion-text>
				</ion-item>
				<ion-item>
					<ion-label>Maximum Wanted Weight:</ion-label>
					<ion-text>{{ currentDolphin.max_weight_measured }}</ion-text>
				</ion-item>
				<ion-item>
					<ion-label>Minimum Kcal Calculations:</ion-label>
					<ion-text>{{ currentDolphin.min_kcal_calculations }}</ion-text>
				</ion-item>
				<ion-item>
					<ion-label>Maximum Kcal Calculations:</ion-label>
					<ion-text>{{ currentDolphin.max_kcal_calculations }}</ion-text>
				</ion-item>
				<ion-row>
					<ion-col size="6">
						<ion-button expand="full" @click="openEditModal">Edit</ion-button>
					</ion-col>
					<ion-col size="6" class="ion-text-end">
						<ion-button expand="full" @click="deleteDolphin">Delete</ion-button>
					</ion-col>
				</ion-row>
			</ion-card>
		</ion-content>

		<ion-footer>
			<ion-toolbar>
				<ion-buttons slot="start">
					<ion-button @click="prevDolphin" :disabled="!prevDolphinAvailable">
						Prev
					</ion-button>
				</ion-buttons>
				<ion-buttons slot="end">
					<ion-button @click="reloadDolphins">Reload Data</ion-button>
					<ion-button @click="openAddModal">Add</ion-button>
					<ion-button @click="nextDolphin" :disabled="!nextDolphinAvailable">
						Next
					</ion-button>
				</ion-buttons>
			</ion-toolbar>
			<ion-modal :is-open="addModalOpen">
				<AddDolphin @close-modal="dolphinAdded" />
			</ion-modal>
			<!--<form @submit.prevent="submitAdd">
						<ion-list v-for="(value, key) in newDolphin" :key="key + 'Add'">
							<ion-item>
								<ion-label position="stacked">{{ key }}</ion-label>
								<ion-input
									v-model="newDolphin![key]"
									:id="key + 'Add'"
									:placeholder="key"
								></ion-input>
							</ion-item>
						</ion-list>
						<ion-button expand="full" type="submit">Add Dolphin</ion-button>
					</form>-->
		</ion-footer>
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

/*interface Dolphin {
	dolphin_id: number;
	name: string;
	sex: number;
	on_site: number;
	year_of_birth: number;
	place_of_birth: string;
	min_weight_measured: number;
	max_weight_measured: number;
	min_kcal_calculations: number;
	max_kcal_calculations: number;
	created_at: string;
	updated_at: string;
}
*/
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
		async fetchDolphins() {
			try {
				await axios
					.get(
						baseUrl + '/api/dolphins', //'http://88395-17112.pph-server.de/api/dolphins'
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
	setup() {
		/*const dolphins = ref<Dolphin[]>([]);
		//const currentDolphin = ref<Dolphin | null>(null);
		//const currentDolphinIndex = ref<number | null>(null);
		const errorMessage = ref<string | null>(null);
		//const editModalOpen = ref<boolean>(false);
		//const currentDolphinValues = ref<Dolphin | null>(null);
		const showDolphin = ref<boolean>(false);

		// For editing the dolphin
		// const dolphinValues = dolphinsStore.dolphinList;

		const isLoading = ref<boolean>(false);
		//const router = useRouter();

		onMounted(async () => {
			isLoading.value = true;
			errorMessage.value = '';
			try {
				const response = await axios.get(
					baseUrl + '/api/dolphins', //'http://88395-17112.pph-server.de/api/dolphins'
					{ withCredentials: true }
				);
				dolphins.value = response.data;
			} catch (error) {
				if (axios.isAxiosError(error)) {
					errorMessage.value =
						error.response?.data.error || 'Unknown error occurred.';
				}
			} finally {
				isLoading.value = false;
			}
		});

		// const goToAddDolphin = () => {
		//   router.push({ name: 'AddDolphin' });
		// };

		
		// Fetch all dolphins when component is created
		const fetchDolphins = async () => {
			try {
				await axios
					.get(
						baseUrl + '/api/dolphins', //'http://88395-17112.pph-server.de/api/dolphins'
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
						dolphins.value = response.data;
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
				errorMessage.value = 'Error fetching dolphins.';
			}
		};

		// Gets called after user added a new dolphin
		// fetches the newest dolphinList and closes the ion-modal for adding dolphins
		const dolphinAdded = () => {
			fetchDolphins();
			addModalOpen.value = false;
		};

		const deleteDolphin = () => {
			if (currentDolphinValues.value.name) {
				showAlert().then(() => {
					let deleteDolphin = currentDolphinValues.value.name;
					const urlDelete = baseUrl + `/api/dolphins/${deleteDolphin}`;
					axios
						.delete(urlDelete, { withCredentials: true })
						.then((response) => {
							console.log('Response:', response.data);
							fetchDolphins();
							showDolphin.value = false;
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
		};

		const showAlert = () => {
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
		};
		//fetchDolphins();

		// Select a dolphin to view
		const selectDolphin = (dolphin: Dolphin) => {
			currentDolphin.value = dolphin;
			currentDolphinIndex.value = dolphins.value.findIndex(
				(d) => d.dolphin_id === dolphin.dolphin_id
			);
			currentDolphinValues.value = { ...dolphin };
			showDolphin.value = true;
		};

		// Move to the next dolphin
		const nextDolphin = () => {
			if (nextDolphinAvailable.value) {
				currentDolphinIndex.value! += 1; // The '!' after the value asserts that it is not null
				currentDolphin.value = dolphins.value[currentDolphinIndex.value!]; // Here as well
				currentDolphinValues.value = { ...currentDolphin.value };
			}
		};

		// Move to the previous dolphin
		const prevDolphin = () => {
			if (prevDolphinAvailable.value) {
				currentDolphinIndex.value! -= 1; // And here
				currentDolphin.value = dolphins.value[currentDolphinIndex.value!]; // And here
				currentDolphinValues.value = { ...currentDolphin.value };
			}
		};

		const nextDolphinAvailable = computed(
			() =>
				currentDolphinIndex.value !== null &&
				currentDolphinIndex.value < dolphins.value.length - 1
		);
		const prevDolphinAvailable = computed(
			() => currentDolphinIndex.value !== null && currentDolphinIndex.value > 0
		);
		// Open the edit modal
		const openEditModal = () => {
			editModalOpen.value = true;
		};

		// Close the edit modal
		const closeEditModal = () => {
			editModalOpen.value = false;
		};

		// Submit edited dolphin values
		const submitEdit = async (event: Event) => {
			event.preventDefault();

			if (currentDolphinValues.value) {
				console.log('Current values: ', currentDolphinValues.value);
			}
			let dolphinCopy = {
				...dolphinsStore.dolphinList.find(
					(dolphin) => dolphin.name === currentDolphinValues.value?.name
				),
			}; // Copies data so I can remove the id later on
			dolphinCopy = {
				name: currentDolphinValues.value?.name,
				sex: currentDolphinValues.value?.sex,
				on_site: currentDolphinValues.value?.on_site,
				year_of_birth: currentDolphinValues.value?.year_of_birth.toString(),
				place_of_birth: currentDolphinValues.value?.place_of_birth.toString(),
				min_weight_measured: currentDolphinValues.value?.min_weight_measured,
				max_weight_measured: currentDolphinValues.value?.max_weight_measured,
				min_kcal_calculations:
					currentDolphinValues.value?.min_kcal_calculations,
				max_kcal_calculations:
					currentDolphinValues.value?.max_kcal_calculations,
			};

			if (dolphinCopy?.dolphin_id) {
				delete dolphinCopy.dolphin_id;
			} //delete dolphin_id since it is not allowed to be changed or be in the request body during a patch request
			console.log('This is sent to backend: ', dolphinCopy);
			const urlPatch =
				baseUrl + `/api/dolphins/${currentDolphinValues.value.name}`;
			await axios
				.patch(urlPatch, dolphinCopy, { withCredentials: true })
				.then((response) => {
					console.log('Response:', response.data);
					closeEditModal();
					console.log('Current dolphin: ', currentDolphin.value?.name);
					fetchDolphins();
					// Set current dolphin name to null and then again to name
					// Because than the ion-card with the new dolphin data will be updated
					/*if (currentDolphin.value !== null) {
						currentDolphin.value.name = null; //closes the ion-card
					}
					showDolphin.value = false;
				})
				.catch((error) => {
					console.error('Error:', error.response.data);
				});
		};
		//Adding a new dolphin
		const addModalOpen = ref<boolean>(false);
		const newDolphin = ref<Dolphin | null>(null);

		const reloadDolphins = () => {
			localStorage.setItem('reload_data_button_pressed', 'true');
			fetchDolphins();
		};

		const openAddModal = () => {
			addModalOpen.value = true;
			newDolphin.value = {
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
				created_at: '',
				updated_at: '',
			};
		};
		//Model and form for adding a dolphin
		const closeAddModal = () => {
			addModalOpen.value = false;
		};

		const submitAdd = async (event: Event) => {
			event.preventDefault();
			if (newDolphin.value) {
				try {
					await axios.post(baseUrl + '/api/dolphins', newDolphin.value, {
						withCredentials: true,
					});
					closeAddModal();
					fetchDolphins();
				} catch (error) {
					errorMessage.value = 'Error adding dolphin.';
				}
			}
		};

		return {
			dolphins,
			currentDolphin,
			errorMessage,
			selectDolphin,
			nextDolphin,
			prevDolphin,
			nextDolphinAvailable,
			prevDolphinAvailable,
			openEditModal,
			closeEditModal,
			currentDolphinValues,
			showDolphin,
			submitEdit,
			deleteDolphin,
			dolphinAdded,
			editModalOpen,
			reloadDolphins,
			openAddModal,
			closeAddModal,
			addModalOpen,
			newDolphin,
			submitAdd,
		};*/
	},
};
</script>

<style scoped>
ion-item {
	margin: 5px;
}
ion-card {
	margin: 5px 15px;
}
ion-card-title {
	margin: 5px;
}
</style>
