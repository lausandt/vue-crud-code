import { describe, it, expect } from 'vitest'
import { shallowMount } from '@vue/test-utils'

import AppFooter from '@/components/AppFooter.vue'

describe('TestAppFooter', () => {
  it('renders message when component is created', () => {
    const wrapper = shallowMount(AppFooter, {
      slots: {
        message: 'This project is brought to you by A Peckish Salty',
        link: '<a href="https://testdriven.io">TestDriven.io</a>'
      }
    })
    expect(wrapper.text()).toMatch('This project is brought to you by A Peckish Salty')
    const items = wrapper.findAll('a')
    expect(items.length).toEqual(1)
    expect(items[0].text()).toMatch('TestDriven.io')
  })
})
