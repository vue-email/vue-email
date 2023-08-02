import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("section", null, [
    _createElementVNode("p", null, "Count: " + _toDisplayString(_ctx.count), 1 /* TEXT */),
    _createElementVNode("p", null, "Double: " + _toDisplayString(_ctx.double), 1 /* TEXT */)
  ]))
}

  
import { computed, defineComponent } from 'vue';

const _sfc_main = defineComponent({
  props: {
    count: Number,
    required: true,
  },
  setup(props) {
    const double = computed(() => props.count * 2)

    return { double }
  }
})


  

  _sfc_main.render = render
  
  export default _sfc_main