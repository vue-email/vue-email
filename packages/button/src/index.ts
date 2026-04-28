import type { CSSProperties, PropType, AnchorHTMLAttributes, DefineProps } from 'vue'
import { computed, defineComponent, h, ComponentOptionsWithoutProps } from 'vue'
import { parsePadding, pxToPt } from "./utils";

const buttonStyle = (
  style?: CSSProperties & {
    pt: number;
    pr: number;
    pb: number;
    pl: number;
  },
) => {
  const { pt, pr, pb, pl, ...rest } = style || {};

  return {
    lineHeight: "100%",
    textDecoration: "none",
    display: "inline-block",
    maxWidth: "100%",
    ...rest,
    padding: `${pt}px ${pr}px ${pb}px ${pl}px`,
  };
};

const buttonTextStyle = (pb?: number) => {
  return {
    maxWidth: "100%",
    display: "inline-block",
    lineHeight: "120%",
    msoPaddingAlt: "0px",
    msoTextRaise: pxToPt(pb || 0),
  };
};


export const Button = defineComponent<AnchorHTMLAttributes>({
  name: 'Button',
  props: {
    style: Object,
  },  
  setup(props, { slots }) {

    const styleObject = computed(() => {
      if (typeof props.style === 'string' || Array.isArray(props.style)) {
        return {};
      }
      return props.style as CSSProperties;
    });

    const paddingValues = computed(() => parsePadding({
      padding: styleObject.value?.padding,
      paddingLeft: styleObject.value?.paddingLeft ?? styleObject.value?.['padding-left'],
      paddingRight: styleObject.value?.paddingRight ?? styleObject.value?.['padding-right'],
      paddingTop: styleObject.value?.paddingTop ?? styleObject.value?.['padding-top'],
      paddingBottom: styleObject.value?.paddingBottom ?? styleObject.value?.['padding-bottom'],
    }));

    const textRaise = computed(() => pxToPt(paddingValues.value.pt + paddingValues.value.pb));

    const firstSpan = computed(() => `<!--[if mso]><i style="letter-spacing: ${paddingValues.value.pl}px;mso-font-width:-100%;mso-text-raise:${textRaise.value}" hidden>&nbsp;</i><![endif]-->`)
    const secondSpan = computed(() => `<!--[if mso]><i style="letter-spacing: ${paddingValues.value.pr}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`)

    return () => {
      return h(
        'a',
        {
          'style': buttonStyle({
            ...props.style as CSSProperties,
            ...paddingValues.value
          }),
          'href': props.href,
          'target': props.target,
        },
        [
          h('span', { innerHTML: firstSpan.value }),
          h(
            'span',
            {
              style: buttonTextStyle(paddingValues.value.pb),
            },
            slots.default?.(),
          ),
          h('span', { innerHTML: secondSpan.value }),
        ],
      )
    }
  },
})

