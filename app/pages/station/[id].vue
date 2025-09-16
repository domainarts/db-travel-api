<template>
    <main class="container mx-auto max-w-2xl p-4">
      <h2 class="text-xl font-semibold mt-6 mb-2 headline-blue">Aktuelle Abfahrten</h2>
      <div v-if="departures.length">
        <!-- Mobile: Cards, Desktop: Tabelle -->
        <div class="block md:hidden">
          <ul>
            <li v-for="d in departures" :key="d.tripId || d.id" class="mb-4 p-3 bg-gray-100 rounded shadow">
              <div>
                <strong>{{ d.line?.name || d.line?.productName || 'Zug' }}</strong>
                <span v-if="d.destination?.name"> nach <strong>{{ d.destination.name }}</strong></span>
                <br />
                Abfahrt: {{ formatTime(d.plannedWhen || d.when) }}
                <span v-if="d.delay"> ({{ d.delay > 0 ? '+' + d.delay : d.delay }} min)</span>
                <br />
                <span class="text-xs text-gray-500">Gleis: {{ d.plannedPlatform || d.platform || '-' }}</span>
                <br />
                <span class="text-xs text-gray-500">Abfahrtsbahnhof: {{ d.stop?.name || '-' }}</span>
              </div>
            </li>
          </ul>
        </div>
        <div class="hidden md:block">
          <div class="mb-4 mx-auto max-w-2xl">
            <!-- Filter Panel: immer sichtbar auf Desktop, auf-/zuklappbar auf Mobile -->
            <div>
              <button @click="showFilter = !showFilter" class="md:hidden mb-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
                {{ showFilter ? 'Filter ausblenden' : 'Filter anzeigen' }}
              </button>
              <div :class="{'block': showFilter, 'hidden': !showFilter, 'md:block': true}">
                <span class="font-semibold text-sm mr-2">Filter nach Produkt:</span>
                <template v-for="p in productOptions" :key="p">
                  <label class="inline-flex items-center cursor-pointer bg-gray-200 rounded px-2 py-1 mr-2 mb-1">
                    <input type="checkbox" class="form-checkbox accent-filter-blue mr-1" :value="p" v-model="selectedProducts" />
                    <span class="text-sm">{{ p }}</span>
                  </label>
                </template>
              </div>
            </div>
          </div>
          <table class="min-w-full bg-white rounded shadow mx-auto" style="font-family: Verdana, Geneva, Tahoma, sans-serif;">
            <thead>
              <tr class="bg-gray-300 text-sm">
                <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Datum/Zeit</th>
                <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Start</th>
                <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Ziel</th>
                <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Zug</th>
                <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Gleis</th>
                <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Betreiber</th>
                <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Pünktlichkeit</th>
              </tr>
            </thead>
            <tbody>
              <template v-for="(d, i) in filteredDepartures" :key="d.tripId || d.id">
                <tr v-if="i % 15 === 0 && i !== 0" class="bg-gray-300 text-sm">
                  <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Datum/Zeit</th>
                  <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Start</th>
                  <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Ziel</th>
                  <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Zug</th>
                  <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Gleis</th>
                  <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Betreiber</th>
                  <th scope="col" class="px-2 py-2 text-left border border-white text-sm">Pünktlichkeit</th>
                </tr>
                <tr class="bg-gray-100 border border-white text-sm" v-if="d.delay <= 720">
                  <td class="px-2 py-2 border border-white whitespace-nowrap text-sm">{{ formatDateTime(d.plannedWhen || d.when) }}</td>
                  <td class="px-2 py-2 border border-white whitespace-nowrap text-sm">{{ d.stop?.name || '-' }}</td>
                  <td class="px-2 py-2 border border-white whitespace-nowrap text-sm">{{ d.direction || '-' }}</td>
                  <td class="px-2 py-2 border border-white whitespace-nowrap text-sm">{{ d.line?.name || d.line?.productName || 'Zug' }}</td>
                  <td class="px-2 py-2 border border-white whitespace-nowrap text-sm">{{ d.plannedPlatform || d.platform || '-' }}</td>
                  <td class="px-2 py-2 border border-white whitespace-nowrap text-sm">{{ d.line?.operator?.name || '-' }}</td>
                  <td class="px-2 py-2 border border-white whitespace-nowrap text-sm"
                    :class="d.delay ? 'text-red-600' : 'text-green-600'">
                    {{ d.delay ? (d.delay > 0 ? '+' + d.delay : d.delay) + ' min' : 'pünktlich' }}
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
      </div>
      <div v-if="error" class="text-red-600 font-semibold mt-4">{{ error }}</div>
      <transition name="fade">
        <div v-if="!departures.length && !error" class="w-full h-1 mb-4">
          <div class="h-full w-full bg-gradient-to-r from-blue-200 via-[#009ACD] to-blue-400 animate-pulse"></div>
        </div>
      </transition>
    </main>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const station = ref<any>(null);
const departures = ref<any[]>([]);
const error = ref('');
const selectedProducts = ref<string[]>(['ICE', 'RE', 'RB']);
const showFilter = ref(true);

// Search bar state for when no departures are available
const searchQuery = ref('');
const searchError = ref('');

async function searchDepartures() {
  searchError.value = '';
  if (!searchQuery.value) {
    searchError.value = 'Bitte einen Bahnhof eingeben.';
    return;
  }
  // Example API call, adjust endpoint as needed
  const res = await fetch(`/api/journeys?from=${encodeURIComponent(searchQuery.value)}`);
  const data = await res.json();
  let depArr = Array.isArray(data)
    ? data
    : (Array.isArray(data.departures) ? data.departures : []);
  if (data.error) {
    searchError.value = data.error;
    departures.value = [];
  } else if (depArr.length === 0) {
    searchError.value = 'Keine Abfahrten gefunden.';
    departures.value = [];
  } else {
    searchError.value = '';
    departures.value = depArr;
  }
}

function formatTime(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

function formatDateTime(dateStr: string) {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  // Format: TT.MM.JJJJ HH:MM
  return d.toLocaleDateString('de-DE', { day: '2-digit', month: '2-digit', year: 'numeric' }) + ' ' + d.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
}

const productOptions = computed(() => {
  const set = new Set<string>();
  departures.value.forEach(d => {
    if (d.line?.productName) set.add(d.line.productName as string);
  });
  return Array.from(set);
});

const filteredDepartures = computed(() => {
  // Wenn keine Filter ausgewählt sind, zeige keine Einträge
  if (!selectedProducts.value.length) return [];
  return departures.value.filter(d => selectedProducts.value.includes(d.line?.productName));
});

onMounted(async () => {
  const id = route.params.id;
  // Hole Bahnhofsdaten (optional: aus API oder übergeben)
  const res = await fetch(`/api/locations?id=${id}`);
  const data = await res.json();
  station.value = data[0];
  // Hole Abfahrten
  const departuresRes = await fetch(`/api/journeys?from=${id}`);
  const departuresData = await departuresRes.json();

  let depArr = Array.isArray(departuresData)
    ? departuresData
    : (Array.isArray(departuresData.departures) ? departuresData.departures : []);
  if (departuresData.error) {
    error.value = departuresData.error;
    departures.value = [];
  } else if (depArr.length === 0) {
    error.value = 'Keine Abfahrten gefunden.';
    departures.value = [];
  } else {
    error.value = '';
    departures.value = depArr;
  }
  showFilter.value = true;
});
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
 .accent-filter-blue {
   accent-color: #009ACD;
 }
</style>

