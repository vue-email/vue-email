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
  setup(props, { slots }) {

    const styleObject = computed(() => {
      if (typeof props.style === 'string' || Array.isArray(props.style)) {
        return {};
      }
      return props.style as CSSProperties;
    });


    const { pt, pr, pb, pl } = parsePadding({
      padding: styleObject.value?.padding,
      paddingLeft: styleObject.value?.paddingLeft,
      paddingRight: styleObject.value?.paddingRight,
      paddingTop: styleObject.value?.paddingTop,
      paddingBottom: styleObject.value?.paddingBottom,
    });

    const y = pt + pb;
    const textRaise = pxToPt(y);

    const firstSpan = `<!--[if mso]><i style="letter-spacing: ${pl}px;mso-font-width:-100%;mso-text-raise:${textRaise}" hidden>&nbsp;</i><![endif]-->`
    const secondSpan = `<!--[if mso]><i style="letter-spacing: ${pr}px;mso-font-width:-100%" hidden>&nbsp;</i><![endif]-->`

    return () => {
      return h(
        'a',
        {
          'style': buttonStyle({
            ...props.style as CSSProperties,
            pt,
            pr,
            pb,
            pl
          }),
          'href': props.href,
          'target': props.target,
        },
        [
          h('span', { innerHTML: firstSpan }),
          h(
            'span',
            {
              style: buttonTextStyle(pb),
            },
            slots.default?.(),
          ),
          h('span', { innerHTML: secondSpan }),
        ],
      )
    }
  },
})

