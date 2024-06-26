import { shallowMount } from '@vue/test-utils'
import CodingChallenge from '@/components/CodingChallenge.vue'
import { sampleData } from '@/mocks/options'

describe('CodingChallenge', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(CodingChallenge, {
      propsData: {
        optionsData: sampleData
      }
    })
    expect(wrapper).toMatchSnapshot()
  })
})
