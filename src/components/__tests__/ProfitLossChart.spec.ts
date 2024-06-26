import { shallowMount } from '@vue/test-utils'
import ProfitLossChart from '@/components/ProfitLossChart.vue'
import { sampleData } from '@/mocks/options'

describe('ProfitLossChart', () => {
  it('renders correctly', () => {
    const wrapper = shallowMount(ProfitLossChart, {
      propsData: {
        optionsData: sampleData
      }
    })
    expect(wrapper).toMatchSnapshot()
  })
})
