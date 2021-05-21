<template>
    <center class="uk-align-center uk-margin-large-top">
        <form class="uk-form-stacked" @submit.prevent="modifyInvitedUser">
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
    name: "InviteSignUp",
    data() {
        return {
            username: "",
            first_name: "",
            last_name: "",
            password: "",
            password_repeat: ""
        };
    },
    mounted: function () {
        var _this = this;
        this.$http
        .get('http://34.118.9.73:8080/api/user/confirm?token=' + this.$route.query.token)
        .then(resp => {
            _this.$store.dispatch("setToken", resp.data.Authorization)
        })
    },
    methods: {
        modifyInvitedUser: function () {
            var _this = this;
            this.$http.put('http://34.118.9.73:8080/api/user/', {
                username: _this.username,
                first_name: _this.first_name,
                last_name: _this.last_name,
                password: _this.password
            })
            .then(resp => {
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
