import { shallowMount } from '@vue/test-utils'
import ProfitLossSummary from '@/components/ProfitLossSummary.vue'
import { sampleData } from '@/mocks/options'

describe('ProfitLossSummary', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ProfitLossSummary, {
      propsData: {
        optionsData: sampleData
      }
    })
    expect(wrapper).toMatchSnapshot()
  })
})
