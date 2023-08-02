import { toDisplayString as _toDisplayString, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("h1", null, "Hi! My name is " + _toDisplayString(_ctx.name), 1 /* TEXT */))
}

  
import { defineComponent } from 'vue';

const _sfc_main = defineComponent({
  props: {
    name: String,
    required: true,
  }
})


  

  _sfc_main.render = render
  
  export default _sfc_main