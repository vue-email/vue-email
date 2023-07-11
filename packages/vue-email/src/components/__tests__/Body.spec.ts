import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Body from '../Body.vue'

describe('Body', () => {
  it('renders properly', () => {
    const wrapper = mount(Body)

    expect(wrapper.vm).toBeTruthy()
    // expect(wrapper.isVueInstance()).toBeTruthy()

    // expect(wrapper.text()).toContain('Hi there!')
  })
})