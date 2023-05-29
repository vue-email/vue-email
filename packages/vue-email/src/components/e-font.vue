<template>
  <render />
</template>

<script lang="ts" setup>
import { h, type CSSProperties } from 'vue';

type FallbackFont = 'Arial' | 'Helvetica' | 'Verdana' | 'Georgia' | 'Times New Roman';

type FontFormat = 'woff' | 'woff2' | 'truetype' | 'opentype' | 'embedded-opentype' | 'svg';

type FontWeight = CSSProperties['font-weight'];
type FontStyle = CSSProperties['font-style'];

interface FontProps {
  /** The font you want to use. NOTE: Do not insert multiple fonts here, use fallbackFontFamily for that */
  fontFamily: string;
  /** An array is possible, but the order of the array is the priority order */
  fallbackFontFamily: FallbackFont | FallbackFont[];
  /** Not all clients support web fonts. For support check: https://www.caniemail.com/features/css-at-font-face/ */
  webFont?: {
    url: string;
    format: FontFormat;
  };
  /** Default: 'normal' */
  fontStyle?: FontStyle;
  /** Default: 400 */
  fontWeight?: FontWeight;
}

const props = defineProps<FontProps>();

const src = props.webFont
  ? `src: url(${props.webFont.url}) format('${props.webFont.format}');`
  : '';

const styles = `
    @font-face {
      font-family: '${props.fontFamily}';
      font-style: ${props.fontStyle};
      font-weight: ${props.fontWeight};
      mso-font-alt: '${
        Array.isArray(props.fallbackFontFamily)
          ? props.fallbackFontFamily[0]
          : props.fallbackFontFamily
      }';
      ${src}
    }

    * {
      font-family: '${props.fontFamily}', ${
  Array.isArray(props.fallbackFontFamily)
    ? props.fallbackFontFamily.join(', ')
    : props.fallbackFontFamily
};
    }
  `;

const render = h('style', styles);
</script>
