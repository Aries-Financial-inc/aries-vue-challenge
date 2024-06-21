import { shallowMount } from '@vue/test-utils';
import CodingChallenge from '@/components/CodingChallenge.vue';
import InputOptions from '@/components/InputOptions.vue';
import RiskRewardGraph from '@/components/RiskRewardGraph.vue';
import OptionsSummary from '@/components/OptionsSummary.vue';

describe('CodingChallenge.vue', () => {
  it('renders child components', () => {
    const wrapper = shallowMount(CodingChallenge, {
      props: {
        optionsData: [
          {
            strike_price: 100,
            type: 'Call',
            bid: 10.05,
            ask: 12.04,
            long_short: 'long',
            expiration_date: '2025-12-17T00:00:00Z',
          },
        ],
      },
    });

    expect(wrapper.findComponent(InputOptions).exists()).toBe(true);
    expect(wrapper.findComponent(RiskRewardGraph).exists()).toBe(true);
    expect(wrapper.findComponent(OptionsSummary).exists()).toBe(true);
  });

  it('updates options and displays graph when update-options event is emitted', async () => {
    const optionsData = [
      {
        strike_price: 100,
        type: 'Call',
        bid: 10.05,
        ask: 12.04,
        long_short: 'long',
        expiration_date: '2025-12-17T00:00:00Z',
      },
    ];

    const wrapper = shallowMount(CodingChallenge, {
      props: { optionsData },
    });

    // Simulate emitting the event from InputOptions
    wrapper.findComponent(InputOptions).vm.$emit('update-options');

    await wrapper.vm.$nextTick();

    expect(wrapper.vm.options).toEqual(optionsData);
    expect(wrapper.vm.showGraph).toBe(true);
  });
});
