// shallowMount 不会渲染子组件（适合Tdd/单元测试），mount 会渲染子组件（适合BDD/集成测试）
import { shallowMount } from '@vue/test-utils'
import TodoList from '../../TodoList.vue'

describe('TodoList.vue', () => {
  it('组件渲染 props.msg 通过', () => {
    const msg = 'Hi, Tom'
    const wrapper = shallowMount(TodoList, {
      propsData: { msg }
    })
    console.log(wrapper.text())
  })
})
