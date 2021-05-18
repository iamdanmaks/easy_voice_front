<template>
    <center>
        <form class="uk-form-stacked" @submit.prevent="login">
            <h1>{{ $t('signin.title') }}</h1>
            <div class="uk-margin">
                <div class="uk-inline">
                    <span class="uk-form-icon" uk-icon="icon: user"></span>
                    <input class="uk-input" name="mail" 
                    type="text" :placeholder="$t('signin.email_username')" v-model="email_username" />
                </div>
            </div>

            <div class="uk-margin">
                <div class="uk-inline">
                    <span class="uk-form-icon" uk-icon="icon: lock"></span>
                    <input class="uk-input" name="password" 
                    type="password" :placeholder="$t('signin.password')" v-model="password" />
                </div>
            </div>

            <div class="uk-margin">
                <div class="uk-form-controls">
                  <button class="uk-button uk-button-default" type="submit">{{ $t('signin.login') }}</button>  
                </div>
            </div>
        </form>
    </center>
</template>

<script>
export default {
    name: "Login",
    data() {
        return {
            email_username: "",
            password: ""
        };
    },
    methods: {
        login: function() {
            if (this.email_username == "" || this.password == "") {
                UIkit.notification({
                    message: "Fields have to be filled in",
                    status: 'danger',
                    pos: 'top-right',
                    timeout: 5000
                });
                return;
            }

            let email_username = this.email_username;
            let password = this.password;

            this.$store
                .dispatch("login", { email_username, password })
                .then(() => {
                    this.$router.push("/");
                    window.location.reload(true);
                })
                .catch(err => UIkit.notification({
                    message: err.response.data.message,
                    status: 'danger',
                    pos: 'top-right',
                    timeout: 5000
                }));
        }
    }
}
</script>

