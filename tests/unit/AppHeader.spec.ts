import { render } from '@testing-library/vue'
import { createPinia } from 'pinia'
import AppHeader from '@/components/AppHeader.vue'

describe('AppHeader', () => {
  it('zeigt Suchfeld an', () => {
    const { getByPlaceholderText } = render(AppHeader, {
      global: { plugins: [createPinia()] }
    })
    expect(getByPlaceholderText(/Bahnhof/i)).toBeTruthy()
  })
})
