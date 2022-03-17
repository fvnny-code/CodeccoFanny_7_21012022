<template>
  <footer class="footer">
    <nav class="legal-notice">
      <router-link
        aria-label="To legal notice"
        tag="a"
        to=""
        @click="navigate"
        custom
        v-slot="{ navigate }"
        >Mentions Légales</router-link
      >
      <router-link
        aria-label="To rgpd"
        tag="a"
        to=""
        @click="navigate"
        custom
        v-slot="{ navigate }"
      ></router-link>
    </nav>
    <div class="copyright">
      <p class="footer__text">{{ footer__text }}</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
  data() {
    return { footer__text: "© Groupamania 2022, tous droits réservés" };
  },
};
</script>
<style></style>
