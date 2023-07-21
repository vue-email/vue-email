<script lang="ts">
export default { name: 'EIcon' }
</script>

<template>
  <render />
</template>

<script setup lang="ts">
import { computed, defineAsyncComponent, h, } from 'vue'
import { loadIcon } from '@iconify/vue'

const props = defineProps({
  size: {
    type: Number,
    default: 24,
  },
  name: {
    type: String,
    default: '',
  },
})

const iconName = computed(() => props.name)
const sSize = computed(() => {
  return `${props.size}px`
})

class SvgToPngConverter {
  constructor() {
    this._init = this._init.bind(this);
    this._cleanUp = this._cleanUp.bind(this);
    this.convertFromInput = this.convertFromInput.bind(this);
  }

  _init() {
    this.canvas = document.createElement("canvas");
    this.imgPreview = document.createElement("img");
    this.imgPreview.style = "position: absolute; top: -9999px";

    document.body.appendChild(this.imgPreview);
    this.canvasCtx = this.canvas.getContext("2d");
  }

  _cleanUp() {
    document.body.removeChild(this.imgPreview);
  }

  convertFromInput(input, callback, width = 128, height = 128) {
    this._init();
    let _this = this;
    this.imgPreview.onload = function () {
      const img = new Image();
      _this.canvas.width = width;
      _this.canvas.height = height;
      img.crossOrigin = "anonymous";
      img.src = _this.imgPreview.src;
      img.onload = function () {
        _this.canvasCtx.drawImage(img, 0, 0, width, height);
        let imgData = _this.canvas.toDataURL("image/png");
        if (typeof callback == "function") {
          callback(imgData);
        }
        _this._cleanUp();
      };
    };

    this.imgPreview.src = input;
  }
}

const render = defineAsyncComponent(async () => {
  return await loadIcon(iconName.value).then(async icon => {
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.width} ${icon.height}">${icon.body}</svg>`
    let svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' })
    let src = URL.createObjectURL(svgBlob)
    let converter = new SvgToPngConverter()

    let image = await new Promise(r =>
      converter.convertFromInput(src, r, props.size, props.size)
    );

    return () => h('img', {
      src: image,
      style: {
        width: sSize.value,
        height: sSize.value,
      },
    })

  }).catch(() => {
    return () => h('span', {
      default: () => iconName.value,
    })
  })
})


</script>
