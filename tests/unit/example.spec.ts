import { shallowMount } from '@vue/test-utils'
import App from '@/App.vue'

describe('App', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(App, {})
    expect(wrapper).toMatchSnapshot()
  })
})
