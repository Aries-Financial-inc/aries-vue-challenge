import { mount } from "@vue/test-utils";
import CodingChallenge from "@/components/CodingChallenge.vue";

const sampleData = [
  {
    strike_price: 100,
    type: "Call",
    bid: 10.05,
    ask: 12.04,
    long_short: "long",
    expiration_date: "2025-12-17T00:00:00Z",
  },
  {
    strike_price: 102.5,
    type: "Call",
    bid: 12.1,
    ask: 14,
    long_short: "long",
    expiration_date: "2025-12-17T00:00:00Z",
  },
  {
    strike_price: 103,
    type: "Put",
    bid: 14,
    ask: 15.5,
    long_short: "short",
    expiration_date: "2025-12-17T00:00:00Z",
  },
  {
    strike_price: 105,
    type: "Put",
    bid: 16,
    ask: 18,
    long_short: "long",
    expiration_date: "2025-12-17T00:00:00Z",
  },
];

describe("CodingChallenge.vue", () => {
  it("renders correctly with sample data", () => {
    const wrapper = mount(CodingChallenge, {
      props: { optionsData: sampleData },
    });

    expect(wrapper.find("h1").text()).toBe("Options Profit Calculator");
    expect(wrapper.findAll("canvas").length).toBe(1);
  });
});
