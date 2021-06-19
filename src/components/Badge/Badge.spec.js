import { mount } from '@vue/test-utils'
import Badge from '@/components/Badge/Badge.vue'

let wrapper;

describe('Badge', () => {
  describe('Component Mount', () => {
    it('is a Vue instance', () => {
      wrapper = mount(Badge, {
        propsData: {
          text: 'poison',
          link: '/poketypes/poison'
        }
      })
      expect(wrapper.vm).toBeTruthy()
    })
  })
  describe('Computed Methods', () => {
    describe('computedClass', () => {
      it('should return the badge class with text as modifier', () => {
        wrapper = mount(Badge, {
          propsData: {
            text: 'poison',
            link: '/poketypes/poison'
          }
        })

        expect(wrapper.vm.computedClass[0]).toBe('badge--poison')
      })
    })
  })
})
