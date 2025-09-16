<template>
    <main class="container mx-auto max-w-2xl p-4">
      <div v-if="stations.length">
        <h2 class="text-xl font-semibold mt-6 mb-2 headline-blue">Gefundene Bahnhöfe</h2>
        <ul>
          <li v-for="s in stations" :key="s.id" class="flex items-center justify-between bg-white rounded shadow p-3 mb-2">
            <div>
              <div class="font-bold text-lg">{{ s.name }}</div>
              <div class="text-gray-500 text-sm">ID: {{ s.id }}</div>
              <div class="text-gray-400 text-xs">Typ: {{ s.type }}</div>
            </div>
            <NuxtLink :to="`/station/${s.id}`" class="ml-4 px-3 py-1 text-white rounded transition" style="background-color: #009ACD;">Details</NuxtLink>
          </li>
        </ul>
      </div>
      <div v-if="fromStation">
        <h3 class="text-lg font-semibold mt-6 mb-2">Verbindungen von <span class="text-blue-700">{{ fromStation.name }}</span> nach:</h3>
        <input v-model="toQuery" placeholder="Zielbahnhof" @keyup.enter="searchToStations" class="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2" />
        <ul v-if="toStations.length">
          <li v-for="s in toStations" :key="s.id">
            <button @click="selectToStation(s)" class="my-1 px-3 py-1 text-white rounded transition" style="background-color: #009ACD;">{{ s.name }}</button>
          </li>
        </ul>
      </div>
      <div v-if="error" class="text-red-600 font-semibold mt-4">{{ error }}</div>
    </main>
    <transition name="fade">
      <div v-if="isLoading" class="fixed top-0 left-0 w-full h-1 z-50">
        <div class="h-full w-full bg-gradient-to-r from-blue-200 via-[#009ACD] to-blue-400 animate-pulse"></div>
      </div>
    </transition>
</template>

<script setup lang="ts">
import { useStationSearchStore } from '@/stores/stationSearch';
import { storeToRefs } from 'pinia';

const stationSearch = useStationSearchStore();
const { stations, error, isLoading } = storeToRefs(stationSearch);
// --- Add missing properties and methods for template ---
import { ref } from 'vue';

const fromStation = ref<any | null>(null); // Replace 'any' with your station type if available
const toQuery = ref('');
const toStations = ref<any[]>([]); // Replace 'any' with your station type if available

async function searchToStations() {
  toStations.value = [];
  if (!toQuery.value) return;
  // Example API call, adjust endpoint as needed
  const res = await fetch(`/api/locations?q=${encodeURIComponent(toQuery.value)}`);
  const data = await res.json();
  toStations.value = Array.isArray(data) ? data : [];
}

function selectToStation(station: any) {
  // Implement navigation or selection logic here
  // For demo: set fromStation to null to hide the section
  fromStation.value = null;
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
 .headline-blue {
   color: #00688b;
 }
</style>

