/* eslint-disable no-undef */
import { mount } from "@vue/test-utils";
import Card from "./Card.vue";

let wrapper;

describe("Card", () => {
  describe("Component Mount", () => {
    it("is a Vue instance", () => {
      wrapper = mount(Card, {
        propsData: {},
      });
      expect(wrapper.vm).toBeTruthy();
    });
  });
});
