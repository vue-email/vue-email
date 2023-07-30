import { toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createElementBlock as _createElementBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createElementBlock("section", null, [
    _createElementVNode("h1", null, "Welcome " + _toDisplayString($props.name), 1 /* TEXT */)
  ]))
}

  const _sfc_main = {
  __name: 'ScriptSetup',
  props: {
  name: String
},
  setup(__props, { expose: __expose }) {
  __expose();



const __returned__ = {  }
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}

}

  

  _sfc_main.render = render
  
  export default _sfc_main