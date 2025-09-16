import { defineStore } from 'pinia';

export const useStationSearchStore = defineStore('stationSearch', {
  state: () => ({
    stationQuery: '',
    stations: [],
    error: '',
    isLoading: false,
  }),
  actions: {
    async searchStations() {
      this.error = '';
      this.stations = [];
      if (!this.stationQuery) return;
      this.isLoading = true;
      try {
        const res = await fetch(`/api/locations?q=${encodeURIComponent(this.stationQuery)}`);
        const data = await res.json();
        if (data.error) this.error = data.error;
        else this.stations = data;
      } finally {
        this.isLoading = false;
      }
    },
    setQuery(query: string) {
      this.stationQuery = query;
    }
  }
});
