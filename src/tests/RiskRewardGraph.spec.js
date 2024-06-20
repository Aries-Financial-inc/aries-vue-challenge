import { shallowMount } from '@vue/test-utils';
import RiskRewardGraph from '@/components/RiskRewardGraph.vue';
import '@testing-library/jest-dom';

describe('RiskRewardGraph.vue', () => {
  it('does not generate graph when showGraph is false', () => {
    const options = [];
    const wrapper = shallowMount(RiskRewardGraph, {
      props: { options, showGraph: false },
    });

    expect(wrapper.find('canvas').isVisible()).toBe(false);
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
      props: { options, showGraph: true },
    });

    // Simulate rendering to generate graph
    wrapper.vm.generateGraph();

    expect(wrapper.find('canvas').isVisible()).toBe(true);
  });
});
