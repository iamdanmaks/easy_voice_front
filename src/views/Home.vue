<template>
  <div class="home" style="max-width: 100vw; width: 100vw; overflow-x: hidden">
    <UnsignedHome v-if="!isLoggedIn" />
  </div>
</template>

<script>
import UnsignedHome from '../components/UnsignedHome.vue'

export default {
  name: 'Home',
  components: {
    UnsignedHome
  },
  computed: {
    isLoggedIn: function() {
      return this.$store.getters.isLoggedIn;
    }
  }
}
</script>
