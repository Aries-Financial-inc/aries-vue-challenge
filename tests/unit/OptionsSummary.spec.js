import { shallowMount } from '@vue/test-utils';
import OptionsSummary from '@/components/OptionsSummary.vue';

describe('OptionsSummary.vue', () => {
  it('does not display OptionsSummary when showGraph is false', () => {
    const wrapper = shallowMount(OptionsSummary, {
      props: { maxProfit: 0, maxLoss: 0, breakEvenPoints: [], showGraph: false },
    });

    expect(wrapper.find('div').isVisible()).toBe(false);
  });

  it('displays OptionsSummary when showGraph is true', () => {
    const wrapper = shallowMount(OptionsSummary, {
      props: { maxProfit: 100, maxLoss: -50, breakEvenPoints: [100], showGraph: true },
    });

    expect(wrapper.find('div').isVisible()).toBe(true);
    expect(wrapper.text()).toContain('Max Profit: 100');
    expect(wrapper.text()).toContain('Max Loss: -50');
    expect(wrapper.text()).toContain('Break-even Points: 100');
  });
});
