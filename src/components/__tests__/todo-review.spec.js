import { mount } from '@vue/test-utils'
import TodoPreview from 'src/components/TodoPreview.vue'
import {describe, it,expect} from 'vitest'

describe('TodoPreview', () => {
    it('should have an element with class "my-class"', () => {
        const wrapper = mount(TodoPreview, {
            propsData: {
                todo: {id: 1, text: 'foo', done: false},
            },
        })
        expect(wrapper.find('.todo-preview').exists()).toBe(true)
    })
})
