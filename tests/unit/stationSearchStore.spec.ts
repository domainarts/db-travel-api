import { setActivePinia, createPinia } from 'pinia'
import { useStationSearchStore } from '@/stores/stationSearch'

describe('stationSearchStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('setzt die Suchanfrage korrekt', () => {
    const store = useStationSearchStore()
    store.setQuery('Berlin')
    expect(store.stationQuery).toBe('Berlin')
  })

  it('initialisiert mit leerer Stationsliste', () => {
    const store = useStationSearchStore()
    expect(store.stations).toEqual([])
  })
})
