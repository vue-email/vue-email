<script setup lang="ts">
import { ref, defineComponent, h, useAttrs, useSlots, normalizeProps, VNode } from 'vue'
import { TailwindConfig, tailwindToCSS } from 'tw-to-css';
import { cleanCss, getMediaQueryCss, makeCssMap } from '../utils/css';

interface Props {
  config?: TailwindConfig;
}
const props = defineProps<Props>();

const ETailwindComponent = defineComponent(function ETailwindComponent() {
  const attrs = useAttrs()
  const slots = useSlots()


  const { twi } = tailwindToCSS({ config: props.config });
  const hasHTML = ref(false);
  const hasHead = ref(false);
  const hasResponsiveStyles = ref(false);
  const classes = ref<string[]>([]);
  const css = ref<string>('');
  const tailwindCss = ref<string>('');
  const cssMap = ref<Record<string, string>>({});
  const headStyle = ref<string>('');


  if (!slots.default || !slots.default()) {
    throw new Error('You must insert at least one code');
  }

  const $default = slots.default();

  const helper = (v: VNode) => {
    // @ts-ignore
    if (hasResponsiveStyles.value && hasHead.value && v.type && v.type?.__name?.toLowerCase().includes('Head')) {
      if (v.children) {
        const props = normalizeProps(v.props)

        return h('head', {
          ...props
        }, [
          h('style', headStyle.value)
        ])
      }
    }


    if (v.props && v.props.class) {

      const cleanRegex = /[:#\\!\-[\]\\/\\.%]+/g;

      const cleanTailwindClasses = v.props.class.replace(cleanRegex, "_");

      let currentStyles = "";

      if (typeof v.props.style === 'object') {
        currentStyles = Object.keys(v.props.style).map((key) => {
          // @ts-ignore
          return `${key}: ${v.props.style[key]};`
        }).join(" ")
      }
      // @ts-ignore
      const tailwindStyles = cleanTailwindClasses.split(" ").map((className) => {
        return cssMap.value[`.${className}`];
      }).join(";")

      v.props.style = `${currentStyles} ${tailwindStyles}`.trim();

      v.props.class = v.props.class
        .split(" ")
        // @ts-ignore
        .filter((className) => className.search(/^.{2}:/) !== -1)
        .join(" ")
        .replace(cleanRegex, "_");


      if (v.props.class === '') {
        delete v.props.class
      }
    }



    if (v.children) {
      // @ts-ignore
      const defaultChildren = v.children.default?.();

      if (defaultChildren && Array.isArray(defaultChildren) && defaultChildren.length) {
        // @ts-ignore
        v.children['default'] = () => defaultChildren.map((vnode: VNode) => helper(vnode))
      } else if (v.children && Array.isArray(v.children)) {
        // @ts-ignore
        v.children = v.children.map((vnode: VNode) => helper(vnode))
      }
    }

    return h(v);
  }

  const $forEachHelper = (vnode: any) => {

    if (vnode.props && vnode.props.class) {
      classes.value.push(vnode.props.class)
    }

    if (vnode.type && vnode.type?.__name?.toLowerCase().includes('html')) {
      hasHTML.value = true;
    }

    if (vnode.type && vnode.type?.__name?.toLowerCase().includes('head')) {
      hasHead.value = true;
    }

    if (
      typeof vnode.children === 'object' &&
      vnode.children
    ) {
      const defaultChildren = vnode.children.default?.();

      if (defaultChildren && Array.isArray(defaultChildren) && defaultChildren.length) {
        defaultChildren.forEach($forEachHelper)
      } else if (vnode.children && Array.isArray(vnode.children)) {
        vnode.children.forEach($forEachHelper)
      }
    }
  };

  $default.forEach($forEachHelper);

  tailwindCss.value = twi(classes.value.join(" "), {
    merge: false,
    ignoreMediaQueries: false,
  });

  css.value = cleanCss(tailwindCss.value);
  cssMap.value = makeCssMap(css.value);
  headStyle.value = getMediaQueryCss(css.value);
  hasResponsiveStyles.value = /@media[^{]+\{(?<content>[\s\S]+?)\}\s*\}/gm.test(
    headStyle.value
  );

  return () => h(
    'div',
    {
      ...attrs,
    },
    $default.map((vnode) => helper(vnode))
  )


})
</script>

<template>
  <ETailwindComponent>
    <slot />
  </ETailwindComponent>
</template>
