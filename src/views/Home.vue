<template>
  <div class="home" style="max-width: 100vw; width: 100vw; overflow-x: hidden">
    <UnsignedHome v-if="!isLoggedIn" />
    <SignedHome v-else />
  </div>
</template>

<script>
import UnsignedHome from '../components/UnsignedHome.vue'
import SignedHome from '../components/SignedHome.vue'

export default {
  name: 'Home',
  components: {
    UnsignedHome, SignedHome
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>
