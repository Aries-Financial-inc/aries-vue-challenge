import { shallowMount } from '@vue/test-utils';
import RiskRewardGraph from '@/components/RiskRewardGraph.vue';

describe('RiskRewardGraph.vue', () => {
  it('does not generate graph when showGraph is false', () => {
    const options = [];
    const wrapper = shallowMount(RiskRewardGraph, {
      propsData: { options, showGraph: false },
    });

    expect(wrapper.find('[data-test-id="riskRewardChart"]').isEmpty()).toBe(true);
  });

  it('generates graph when showGraph is true', async () => {
    const options = [
      {
        strike_price: 100,
        type: 'Call',
        bid: 10.05,
        ask: 12.04,
        long_short: 'long',
        expiration_date: '2025-12-17T00:00:00Z',
      },
    ];
    const wrapper = shallowMount(RiskRewardGraph, {
      propsData: { options, showGraph: false },
    });

    await wrapper.setProps({ showGraph: true });

    expect(wrapper.find('[data-test-id="riskRewardChart"]').isVisible()).toBe(true);
  });
});
