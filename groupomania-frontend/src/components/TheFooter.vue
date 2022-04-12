<template>

  <footer class="footer">
   
    <nav class="legal-notice">
      <router-link
        aria-label="To legal notice"
        to=""
        custom v-slot="{ navigate }"> 
        <span @click ="navigate" @keypress.enter="navigate" role="link">Mentions légales</span> 
      </router-link>
      |
      <router-link
        aria-label="To rgpd"
        to=""
        custom v-slot="{ navigate }"
      >
       <span @click ="navigate" @keypress.enter="navigate" role="link">Politique de confidentialité</span>
      </router-link>
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
  padding: 0 1rem;
  margin-top: 1rem;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;

  width: 100%;
  font-family:Arial, Helvetica, sans-serif;
  font-size: .8rem;

  border-top: 2px solid black;
  background-color: white;
}

.legal-notice,
.copyright {
  padding: 1rem;
}

</style>
