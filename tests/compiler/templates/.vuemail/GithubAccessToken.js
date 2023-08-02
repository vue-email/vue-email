import { createVNode as _createVNode, createTextVNode as _createTextVNode, withCtx as _withCtx, toDisplayString as _toDisplayString, createElementVNode as _createElementVNode, openBlock as _openBlock, createBlock as _createBlock } from "vue"

export function render(_ctx, _cache, $props, $setup, $data, $options) {
  return (_openBlock(), _createBlock($setup["EHtml"], null, {
    default: _withCtx(() => [
      _createVNode($setup["EHead"]),
      _createVNode($setup["EPreview"], null, {
        default: _withCtx(() => [
          _createTextVNode(" A fine-grained personal access token has been added to your account ")
        ]),
        _: 1 /* STABLE */
      }),
      _createVNode($setup["EBody"], { style: $setup.main }, {
        default: _withCtx(() => [
          _createVNode($setup["EContainer"], { style: $setup.container }, {
            default: _withCtx(() => [
              _createVNode($setup["EImg"], {
                width: "32",
                height: "32",
                src: "/static/github.png",
                alt: "Github"
              }),
              _createVNode($setup["EText"], { style: $setup.title }, {
                default: _withCtx(() => [
                  _createElementVNode("strong", null, "@" + _toDisplayString($props.username), 1 /* TEXT */),
                  _createTextVNode(", a personal access was created on your account. ")
                ]),
                _: 1 /* STABLE */
              }),
              _createVNode($setup["ESection"], { style: $setup.section }, {
                default: _withCtx(() => [
                  _createVNode($setup["EText"], { style: $setup.text }, {
                    default: _withCtx(() => [
                      _createTextVNode(" Hey "),
                      _createElementVNode("strong", null, _toDisplayString($props.username), 1 /* TEXT */),
                      _createTextVNode("! ")
                    ]),
                    _: 1 /* STABLE */
                  }),
                  _createVNode($setup["EText"], { style: $setup.text }, {
                    default: _withCtx(() => [
                      _createTextVNode(" A fine-grained personal access token ("),
                      _createVNode($setup["ELink"], { href: "#" }, {
                        default: _withCtx(() => [
                          _createTextVNode(" resend ")
                        ]),
                        _: 1 /* STABLE */
                      }),
                      _createTextVNode(") was recently added to your account. ")
                    ]),
                    _: 1 /* STABLE */
                  }),
                  _createVNode($setup["EButton"], {
                    href: "#",
                    style: $setup.button
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(" View your token ")
                    ]),
                    _: 1 /* STABLE */
                  })
                ]),
                _: 1 /* STABLE */
              }),
              _createVNode($setup["EText"], { style: $setup.links }, {
                default: _withCtx(() => [
                  _createVNode($setup["ELink"], {
                    href: "#",
                    style: $setup.link
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(" Your security audit log ")
                    ]),
                    _: 1 /* STABLE */
                  }),
                  _createTextVNode(" ・ "),
                  _createVNode($setup["ELink"], {
                    href: "#",
                    style: $setup.link
                  }, {
                    default: _withCtx(() => [
                      _createTextVNode(" Contact support ")
                    ]),
                    _: 1 /* STABLE */
                  })
                ]),
                _: 1 /* STABLE */
              }),
              _createVNode($setup["EText"], { style: $setup.footer }, {
                default: _withCtx(() => [
                  _createTextVNode(" GitHub, Inc. ・88 Colin P Kelly Jr Street ・San Francisco, CA 94107 ")
                ]),
                _: 1 /* STABLE */
              })
            ]),
            _: 1 /* STABLE */
          })
        ]),
        _: 1 /* STABLE */
      })
    ]),
    _: 1 /* STABLE */
  }))
}

  import { defineComponent as _defineComponent } from 'vue'
import { EHtml, EHead, EBody, EContainer, EPreview, EImg, EText, ESection, EButton, ELink } from 'vue-email';


const _sfc_main = /*#__PURE__*/_defineComponent({
  __name: 'GithubAccessToken',
  props: {
  username: {
    type: String,
    default: 'John Doe',
  },
},
  setup(__props, { expose: __expose }) {
  __expose();



const main = {
  backgroundColor: '#ffffff',
  color: '#24292e',
  fontFamily: '-apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji"',
}

const container = {
  width: '480px',
  margin: '0 auto',
  padding: '20px 0 48px',
}

const title = {
  fontSize: '24px',
  lineHeight: 1.25,
}

const section = {
  padding: '24px',
  border: 'solid 1px #dedede',
  borderRadius: '5px',
  textAlign: 'center',
}

const text = {
  margin: '0 0 10px 0',
  textAlign: 'left',
}

const button = {
  fontSize: '14px',
  backgroundColor: '#28a745',
  color: '#fff',
  lineHeight: 1.5,
  borderRadius: '0.5em',
  padding: '0.75em 1.5em',
}

const links = {
  textAlign: 'center',
}

const link = {
  color: '#0366d6',
  fontSize: '12px',
}

const footer = {
  color: '#6a737d',
  fontSize: '12px',
  textAlign: 'center',
  marginTop: '60px',
}

const __returned__ = { main, container, title, section, text, button, links, link, footer, get EHtml() { return EHtml }, get EHead() { return EHead }, get EBody() { return EBody }, get EContainer() { return EContainer }, get EPreview() { return EPreview }, get EImg() { return EImg }, get EText() { return EText }, get ESection() { return ESection }, get EButton() { return EButton }, get ELink() { return ELink } }
Object.defineProperty(__returned__, '__isScriptSetup', { enumerable: false, value: true })
return __returned__
}

})

  

  _sfc_main.render = render
  
  export default _sfc_main