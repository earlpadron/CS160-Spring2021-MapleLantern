import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  // Inspect the raw component options
  it('has data', () => {
    expect(typeof App.data).toBe('function')
  })
})

describe('Mounted App', () => {
  const wrapper = shallowMount(App);

  test('is a Vue instance', () => {
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})