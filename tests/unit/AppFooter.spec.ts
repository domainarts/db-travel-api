import { render } from '@testing-library/vue'
import AppFooter from '@/components/AppFooter.vue'

describe('AppFooter', () => {
  it('zeigt Footer-Text an', () => {
    const { getByText } = render(AppFooter)
    expect(getByText(/DB Travel API Demo/i)).toBeTruthy()
  })
})
