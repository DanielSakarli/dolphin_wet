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
        <ion-list>
            <ion-item v-for="dolphin in dolphins" :key="dolphin.dolphin_id" button @click="selectDolphin(dolphin)">
                <ion-label>{{ dolphin.name }} (Born: {{ dolphin.year_of_birth }})</ion-label>
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
                <ion-list v-for="(value, key) in currentDolphinValues" :key="key">
                <ion-item>
                    <ion-label position="stacked">{{ key }}</ion-label>
                    <ion-input v-model="currentDolphinValues![key]" :id="key" :placeholder="key"></ion-input>
                </ion-item>
                </ion-list>
                <ion-button expand="full" type="submit">Save Changes</ion-button>
            </form>
            </ion-content>
        </ion-modal>
        <!-- Card content of each dolphin -->
        <ion-card v-if="currentDolphin">
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
            <ion-button @click="openEditModal">Edit</ion-button>
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
                <ion-button @click="openAddModal">Add</ion-button>
                <ion-button @click="nextDolphin" :disabled="!nextDolphinAvailable">
                Next
                </ion-button>
            </ion-buttons>
        </ion-toolbar>

        <ion-modal :is-open="addModalOpen">
            <ion-header>
            <ion-toolbar>
                <ion-title>Add Dolphin</ion-title>
                <ion-buttons slot="end">
                <ion-button @click="closeAddModal">Close</ion-button>
                </ion-buttons>
            </ion-toolbar>
            </ion-header>
            <ion-content>
            <form @submit.prevent="submitAdd">
                <ion-list v-for="(value, key) in newDolphin" :key="key+'Add'">
                <ion-item>
                    <ion-label position="stacked">{{ key }}</ion-label>
                    <ion-input v-model="newDolphin![key]" :id="key+'Add'" :placeholder="key"></ion-input>
                </ion-item>
                </ion-list>
                <ion-button expand="full" type="submit">Add Dolphin</ion-button>
            </form>
            </ion-content>
        </ion-modal>
        </ion-footer>
    </ion-page>
</template>

<script lang="ts">
import { IonPage, IonButton, IonCard, IonCardTitle, IonContent, IonFooter, IonHeader, IonInput, IonItem, IonLabel, IonList, IonModal, IonToolbar, IonText, IonButtons, IonTitle } from '@ionic/vue';
import { ref, computed, onMounted } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';

interface Dolphin {
    dolphin_id: number;
    name: string;
    sex: number;
    on_site: number;
    year_of_birth: number;
    place_of_birth: string;
    created_at: string;
    updated_at: string;
}

export default {
components: {
    IonPage,
    IonButton,
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
    IonTitle
},
methods: {
            changeLanguage($event: any) {
                this.$i18n.locale = $event.detail.value;
            },
        },
setup() {
    const dolphins = ref<Dolphin[]>([]);
    const currentDolphin = ref<Dolphin | null>(null);
    const currentDolphinIndex = ref<number | null>(null);
    const errorMessage = ref<string | null>(null);
    const editModalOpen = ref<boolean>(false);
    const currentDolphinValues = ref<Dolphin | null>(null);
    const isLoading = ref<boolean>(false);
    const router = useRouter();

    onMounted(async () => {
        isLoading.value = true;
        errorMessage.value = '';
        try {
            const response = await axios.get('http://88395-17112.pph-server.de/api/dolphins');
            dolphins.value = response.data;
        } catch(error) {
            if (axios.isAxiosError(error)) {
                errorMessage.value = error.response?.data.error || "Unknown error occurred.";
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
        const response = await axios.get('http://88395-17112.pph-server.de/api/dolphins');
        dolphins.value = response.data;
      } catch (error) {
        errorMessage.value = 'Error fetching dolphins.';
      }
    };

    fetchDolphins();

    // Select a dolphin to view
    const selectDolphin = (dolphin: Dolphin) => {
      currentDolphin.value = dolphin;
      currentDolphinIndex.value = dolphins.value.findIndex(d => d.dolphin_id === dolphin.dolphin_id);
      currentDolphinValues.value = { ...dolphin };
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

    const nextDolphinAvailable = computed(() => currentDolphinIndex.value !== null && currentDolphinIndex.value < dolphins.value.length - 1);
    const prevDolphinAvailable = computed(() => currentDolphinIndex.value !== null && currentDolphinIndex.value > 0);

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
        try {
          await axios.put(`/api/dolphins/${currentDolphinValues.value.dolphin_id}`, currentDolphinValues.value);
          closeEditModal();
          fetchDolphins();
        } catch (error) {
          errorMessage.value = 'Error editing dolphin.';
        }
      }
    };
    //Adding a new dolphin
    const addModalOpen = ref<boolean>(false);
    const newDolphin = ref<Dolphin | null>(null);

    const openAddModal = () => {
        addModalOpen.value = true;
        newDolphin.value = {
            dolphin_id: 0,
            name: '',
            sex: 0,
            on_site: 0,
            year_of_birth: new Date().getFullYear(),
            place_of_birth: '',
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
          await axios.post(`http://88395-17112.pph-server.de/api/dolphins`, newDolphin.value);
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
      submitEdit,
      editModalOpen,
      openAddModal,
      closeAddModal,
      addModalOpen,
      newDolphin,
      submitAdd,
    };
  }
};

</script>