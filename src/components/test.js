import { mount } from '@vue/test-utils';
import Modal from './Modal.vue';

describe('Modal', () => {

  const modal = mount(Modal)

  it('has a button', () => {
    expect(modal.contains('input')).toBe(true)
    expect(small.contains('input')).toBe(true)

  })
})
