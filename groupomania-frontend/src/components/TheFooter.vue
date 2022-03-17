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
        >Mentions Légales</router-link>
      |
      <router-link
        aria-label="To rgpd"
        tag="a"
        to=""
        @click="navigate"
        custom
        v-slot="{ navigate }"
      >Politique de confidentialité</router-link>
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
<style scoped>
.footer{
  position: fixed;
  bottom: 0px;
  padding: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;

  width: 100%;
  font-family:Arial, Helvetica, sans-serif;
  font-size: .9rem;

  border-top: 2px solid black;

}
.legal-notice {
  margin-top: 1rem;
}
.copyright {
  margin-right: 5rem;
  font-style: italic;
}

</style>
