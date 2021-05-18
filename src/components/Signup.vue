<template>
    <center>
        <form class="uk-form-stacked" @submit.prevent="register">
            <h1>{{ $t('signup.title') }}</h1>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Email</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-text-center" name="mail" 
                        type="email" :placeholder="$t('signup.email')" v-model="email" />
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Username</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-text-center" name="username" 
                        type="text" :placeholder="$t('signup.username')" v-model="username" />
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">First Name</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-text-center" name="first_name" 
                        type="text" :placeholder="$t('signup.first_name')" v-model="first_name" />
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Last Name</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-text-center" name="last_name" 
                        type="text" :placeholder="$t('signup.last_name')" v-model="last_name" />
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Organization Name</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-text-center" name="org_name" 
                        type="text" :placeholder="$t('signup.org_name')" v-model="org_name" />
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Apply Reason</label>
                <div class="uk-form-controls uk-width-medium">
                    <textarea v-model="apply_reason" class="uk-textarea uk-text-center" rows="3" 
                    :placeholder="$t('signup.apply')"></textarea>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Password</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-width-medium uk-text-center" name="password" 
                        type="password" :placeholder="$t('signup.password')" v-model="password" />
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">Password Repeat</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-width-medium uk-text-center" name="password" 
                        type="password" :placeholder="$t('signup.password_repeat')" v-model="password_repeat" />
                </div>
            </div>

            <div class="uk-margin">
                <div class="uk-form-controls">
                  <button class="uk-button uk-button-default" type="submit">{{ $t('signup.signup') }}</button>  
                </div>
            </div>
        </form>
    </center>
</template>

<script>
export default {
    name: "Signup",
    data() {
        return {
            email: "",
            username: "",
            first_name: "",
            last_name: "",
            org_name: "",
            apply: "",
            password: "",
            password_repeat: ""
        };
    },
    methods: {
        register: function() {
            let email = this.email_username;
            let password = this.password;
            this.$store
                .dispatch("register", { email, username, first_name, last_name, org_name, apply_reason, password })
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
