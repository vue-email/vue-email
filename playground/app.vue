<template>
  <div class="min-h-screen p-8 px-30">
    <div class="flex gap-8 mb-8 justify-between">
      <div class="flex gap-4">
        <button
          class="bg-cyan-7 text-white text-opacity-50 px-3 rounded-md"
          @click="compileTemplate"
        >
          Compile Template
        </button>
        <button
          class="bg-dark-1 text-white text-opacity-50 px-3 rounded-md"
          v-if="template"
          @click="template = ''"
        >
          Clear
        </button>
      </div>
      <select
        class="text-dark py-3 px-4 rounded-md bg-zinc"
        v-model="selected"
        placeholder="Select template"
      >
        <option selected disabled>Select template</option>
        <option :value="text" v-for="{ text } in examplesList" :key="text">{{ text }}</option>
      </select>
    </div>

    <div class="mx-auto !mx-12">
      <div class="my-4 border p-6 rounded-md border-white border-opacity-50">
        <component class="!bg-white" :is="example" v-if="example" />
      </div>

      <div v-if="template">
        <p class="mb-8 text-white op50">Output:</p>
        <div class="overflow-scroll">
          <pre class="whitespace-break-spaces text-xs text-white op50">{{ template }}</pre>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, shallowRef, watch } from 'vue';
import { render } from '../src';
import HelloWorld from './examples/hello-world.vue';
import WelcomeTemplate from './examples/welcome-template.vue';
import WithTailwind from './examples/with-tailwind.vue';
import twitchResetPassword from './examples/twitch-reset-password.vue';

const example = shallowRef<any>(null);
const template = ref('');
const selected = ref('Select template');

const examplesList = [
  {
    text: 'hello-world',
    component: HelloWorld,
  },
  {
    text: 'welcome-template',
    component: WelcomeTemplate,
  },
  {
    text: 'tailwind',
    component: WithTailwind,
  },
  {
    text: 'twitch-reset',
    component: twitchResetPassword,
  },
];

const compileTemplate = async () => {
  const result = await render(example.value);
  console.log(result);
  template.value = result;
};

watch(selected, (val) => {
  if (val === 'Select template') {
    return;
  }

  const found = examplesList!.find((item) => item.text === val);
  example.value = found!.component;
});
</script>
