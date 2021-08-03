<template lang="pug">
main(:class="{ dark: theme != null }")
  NConfigProvider(:theme="theme")
    NCard
      NSpace(justify="end")
        NButton(v-if="theme == null" @click="theme = darkTheme")
          template(#icon)
            NIcon: MoonIcon
          | Dark
        NButton(v-else @click="theme = null")
          template(#icon)
            NIcon: SunIcon
          | Light
      NSpace(justify="end")
        YamlDownloadButton(:disabled="!isValid")
        YamlUploadButton
    RouterView
</template>

<script lang="ts">
import 'vfonts/Inter.css';
import { defineComponent, computed, ref } from 'vue';
import { Sunny as SunIcon, Moon as MoonIcon } from '@vicons/ionicons5';
import {
  NButton,
  NCard,
  NConfigProvider,
  NIcon,
  NSpace,
  darkTheme,
} from 'naive-ui';
import { useStore } from './store';
import YamlDownloadButton from './components/buttons/DownloadYaml.vue';
import YamlUploadButton from './components/buttons/UploadYaml.vue';

export default defineComponent({
  components: {
    NButton,
    NCard,
    NConfigProvider,
    NIcon,
    NSpace,
    SunIcon,
    MoonIcon,
    YamlDownloadButton,
    YamlUploadButton,
  },
  setup() {
    const store = useStore();

    return {
      darkTheme,
      theme: ref(darkTheme),
      isValid: computed(() => store.getters.isValid),
    };
  },
});
</script>

<style lang="stylus">
#app
  font-family v-sans, v-mono, Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  text-align center
  margin 0
  position fixed
  width 100vw
  height 100vh
</style>

<style lang="stylus" scoped>
  main
    mainWidth = 100%
    horizontalPadding = 1%
    width mainWidth - (horizontalPadding * 2)
    height 100%
    padding-left horizontalPadding
    padding-right horizontalPadding

    &.dark
      background-color #111122
</style>
