<template>
  <render />
</template>

<script lang="ts" setup>
import { VNode, h, useSlots } from 'vue';
import { TailwindConfig, tailwindToCSS } from 'tw-to-css';
import {
  cleanCss,
  getMediaQueryCss,
  makeCssMap,
  testResponsiveStyles,
  styleToObject,
} from '../utils/css';

interface Props {
  config?: TailwindConfig;
}

const props = defineProps<Props>();
const slots = useSlots();

if (!slots?.default || !slots?.default()) {
  throw new Error('You must insert at least one code');
}

const $default = slots?.default();
const { twi } = tailwindToCSS({ config: props.config });

const helper = (node: any, hasHTML: boolean, hasHead: boolean) => {
  if (node.props) {
    const tailwindCSS = twi(node.props.class, {
      merge: false,
      ignoreMediaQueries: false,
    });

    const css = cleanCss(tailwindCSS);
    const cssMap = makeCssMap(css);
    const headStyle = getMediaQueryCss(css);
    const hasResponsiveStyles = testResponsiveStyles(headStyle);
    const stylesString = Object.values(cssMap).join(';');
    const styles = styleToObject(stylesString);

    if (hasResponsiveStyles && hasHead && node.type.__name.includes('head')) {
      let newVNode: VNode | null = null;

      if (node.children.default().length) {
        newVNode = h('head', { ...node.props }, [h('style', headStyle)]);
      }

      return newVNode;
    }

    const vnode = h(node, { ...node.props, style: styles });

    if (
      typeof vnode.children === 'object' &&
      vnode.children &&
      // @ts-ignore
      Array.isArray(vnode.children.default()) &&
      // @ts-ignore
      vnode.children.default().length
    ) {
      const childrenComponent = vnode.children
        // @ts-ignore
        .default()
        .map((vnode: VNode) => helper(vnode, hasHTML, hasHead));
      return h(vnode, () => childrenComponent);
    }

    return h(vnode);
  }

  if (
    typeof node.children === 'object' &&
    node.children &&
    Array.isArray(node.children.default()) &&
    node.children.default().length
  ) {
    const children = node.children.default().map((vnode: VNode) => helper(vnode, hasHTML, hasHead));
    return h(node, () => children);
  }

  return h(node);
};

const renderHelper = () => {
  let hasHTML = false;
  let hasHead = false;

  return function inner() {
    const vnodesArray: VNode[] = [];

    const $forEachHelper = (vnode: any) => {
      vnodesArray.push(vnode);

      if (
        typeof vnode.children === 'object' &&
        vnode.children &&
        Array.isArray(vnode.children.default()) &&
        vnode.children.default().length > 1
      ) {
        vnode.children.default().forEach($forEachHelper);
      }
    };

    $default.forEach($forEachHelper);

    // @ts-ignore
    const htmlFound = vnodesArray.find((el) => el.type?.__name?.includes('html') ?? null);
    // @ts-ignore
    const headFound = vnodesArray.find((el) => el.type?.__name?.includes('head') ?? null);

    if (htmlFound != undefined) {
      hasHTML = true;
    }

    if (headFound != undefined) {
      hasHead = true;
    }

    return $default.map((vnode) => helper(vnode, hasHTML, hasHead));
  };
};

function render() {
  const _render = renderHelper();
  return h('div', _render());
}
</script>
