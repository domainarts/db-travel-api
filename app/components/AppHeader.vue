<template>
    <header class="relative w-full h-64 flex items-center justify-center bg-cover bg-center" style="background-image: url('/header-bg.jpeg');">
      <div class="absolute inset-0 bg-black/40"></div>
      <div class="relative z-10 flex flex-col items-center w-full">
        <form @submit.prevent="searchStations" class="flex flex-col gap-2 w-full max-w-xl items-center justify-center bg-white/80 rounded-lg p-4 shadow">
          <h1 class="text-3xl md:text-4xl font-bold drop-shadow mb-4 text-center" style="color: #00688b;">DB Travel API Demo</h1>
          <div class="flex flex-col md:flex-row gap-2 w-full">
            <input v-model="stationQuery" placeholder="Bahnhof suchen (z.B. Berlin)" class="w-full md:flex-1 px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400" />
            <button type="submit" class="w-full md:w-auto px-4 py-2 text-white rounded transition" style="background-color: #009ACD;">Suchen</button>
          </div>
        </form>
      </div>
    </header>
</template>

<script setup lang="ts">
import { useStationSearchStore } from '@/stores/stationSearch';
import { storeToRefs } from 'pinia';
import { useRouter, useRoute } from 'vue-router';

const stationSearch = useStationSearchStore();
const { stationQuery, isLoading } = storeToRefs(stationSearch);
const router = useRouter();
const route = useRoute();

function searchStations() {
  // Wenn nicht auf der Startseite, dorthin navigieren
  if (route.path !== '/') {
    router.push('/');
    // Timeout, damit die Seite erst navigiert und dann sucht
    setTimeout(() => {
      stationSearch.searchStations();
    }, 100);
  } else {
    stationSearch.searchStations();
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>
