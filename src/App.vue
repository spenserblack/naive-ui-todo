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
    RouterView
</template>

<script lang="ts">
import 'vfonts/Inter.css';
import { defineComponent, ref } from 'vue';
import { Sunny as SunIcon, Moon as MoonIcon } from '@vicons/ionicons5';
import {
  NButton,
  NCard,
  NConfigProvider,
  NIcon,
  NSpace,
  darkTheme,
} from 'naive-ui';

export default defineComponent({
  components: {
    NButton,
    NCard,
    NConfigProvider,
    NIcon,
    NSpace,
    SunIcon,
    MoonIcon,
  },
  setup() {
    return {
      darkTheme,
      theme: ref(darkTheme),
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
    width 100%
    height 100%

    &.dark
      background-color #111122
</style>
