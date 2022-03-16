<template>
    <div id="auth">
   <LoginForm />
    </div>
</template>
<script>

import LoginForm from "../components/LoginForm.vue";


export default {
    name: "AuthView",
    data() {
        return {
            component: ""
        };
    },
    compoents: {
        LoginForm
    },
    components: { LoginForm }
}
</script>