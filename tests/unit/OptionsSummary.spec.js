import { shallowMount } from '@vue/test-utils';
import OptionsSummary from '@/components/OptionsSummary.vue';

describe('OptionsSummary.vue', () => {
  it('does not display OptionsSummary when showGraph is false', () => {
    const wrapper = shallowMount(OptionsSummary, {
      propsData: { maxProfit: (0).toFixed(2), maxLoss: (0).toFixed(2), breakEvenPoints: [], showGraph: false },
    });

    expect(wrapper.find('[data-test-id="summary-elements"]').element).toBe(undefined);
  });

  it('displays OptionsSummary when showGraph is true', () => {
    const wrapper = shallowMount(OptionsSummary, {
      propsData: { maxProfit: (100).toFixed(2), maxLoss: (-50).toFixed(2), breakEvenPoints: [100], showGraph: true },
    });

    expect(wrapper.find('[data-test-id="summary-elements"]').element).not.toBe(undefined);
    expect(wrapper.text()).toContain('Max Profit: 100.00');
    expect(wrapper.text()).toContain('Max Loss: -50.00');
    expect(wrapper.text()).toContain('Break-even Points: 100');
  });
});
