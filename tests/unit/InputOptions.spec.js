import { shallowMount } from '@vue/test-utils';
import InputOptions from '@/components/InputOptions.vue';

describe('InputOptions.vue', () => {
  it('renders options correctly', () => {
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
    const wrapper = shallowMount(InputOptions, {
      propsData: { options },
    });

    expect(wrapper.text()).toContain('Call long at $100 (Bid: $10.05, Ask: $12.04)');
  });

  it('emits update-options event when button is clicked', async () => {
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
    const wrapper = shallowMount(InputOptions, {
      propsData: { options },
    });

    await wrapper.vm.updateOptions();

    expect(wrapper.emitted('update-options')).toBeTruthy();
  });
});
