<template>
    <center>
        <form class="uk-form-stacked" @submit.prevent="register">
            <h1>{{ $t('signup.title') }}</h1>
            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('signup.email') }}</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-text-center" name="mail" v-validate="'required|email|max:50'" data-vv-as="mail"
                        type="email" :placeholder="$t('signup.email')" v-model="email" />
                    <br><span class="uk-text-danger">{{ errors.first('mail') }}</span>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('signup.username') }}</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-text-center" name="username" v-validate="'required|min:5|max:30'" data-vv-as="username" 
                        type="text" :placeholder="$t('signup.username')" v-model="username" />
                    <br><span class="uk-text-danger">{{ errors.first('username') }}</span>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('signup.first_name') }}</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-text-center" name="first_name" v-validate="'required|max:30'" data-vv-as="fname" 
                        type="text" :placeholder="$t('signup.first_name')" v-model="first_name" />
                    <br><span class="uk-text-danger">{{ errors.first('fname') }}</span>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('signup.last_name') }}</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-text-center" name="last_name" v-validate="'required|max:30'" data-vv-as="lname"
                        type="text" :placeholder="$t('signup.last_name')" v-model="last_name" />
                    <br><span class="uk-text-danger">{{ errors.first('lname') }}</span>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('signup.org') }}</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-text-center" name="org_name" v-validate="'required|max:30'" data-vv-as="oname"
                        type="text" :placeholder="$t('signup.org_name')" v-model="org_name" />
                    <br><span class="uk-text-danger">{{ errors.first('oname') }}</span>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('signup.apply') }}</label>
                <div class="uk-form-controls uk-width-medium">
                    <textarea v-model="apply_reason" class="uk-textarea uk-text-center" rows="3" v-validate="'required|min:20|max:100'" data-vv-as="apply"
                    :placeholder="$t('signup.apply')"></textarea>
                    <br><span class="uk-text-danger">{{ errors.first('apply') }}</span>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('signup.password') }}</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-width-medium uk-text-center" name="password" v-validate="'required|alpha_num|regex:(?=.*[0-9])|max:30|min:6'" data-vv-as="password"
                        type="password" :placeholder="$t('signup.password')" v-model="password" />
                    <br><span class="uk-text-danger">{{ errors.first('password') }}</span>
                </div>
            </div>

            <div class="uk-margin">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('signup.repeat') }}</label>
                <div class="uk-form-controls uk-width-medium">
                    <input class="uk-input uk-width-medium uk-text-center" name="repeat" v-validate="'required'" data-vv-as="repeat"
                        type="password" :placeholder="$t('signup.password_repeat')" v-model="password_repeat" />
                    <br><span class="uk-text-danger">{{ errors.first('repeat') }}</span>
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
            var _this = this;
            this.$validator.validate().then(valid => {
                if (valid) {
                    _this.$store
                    .dispatch("register", { 
                        email: _this.email, 
                        username: _this.username, 
                        first_name: _this.first_name, 
                        last_name: _this.last_name, 
                        organization_name: _this.org_name, 
                        apply_reason: _this.apply, 
                        password: _this.password 
                    })
                    .then(resp => {
                        UIkit.notification({
                            message: resp.data.message + _this.$t('check_email'),
                            status: 'success',
                            pos: 'top-right',
                            timeout: 5000
                        })
                    })
                    .catch(err => UIkit.notification({
                        message: err.response.data.message,
                        status: 'danger',
                        pos: 'top-right',
                        timeout: 5000
                    }));
                }
            })
        }
    }
}
</script>
