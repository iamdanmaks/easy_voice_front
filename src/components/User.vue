<template>
    <div>
        <center v-if="!editing">
            <avatar :username="$store.state.user.first_name + ' ' + $store.state.user.last_name"
                :size="120"></avatar>
            <h3 class="uk-text-lead" style="font-size: 16pt">
                {{ $store.state.user.first_name + ' ' + $store.state.user.last_name }} 
                <sup v-if="$store.state.user.organization_admin" 
                uk-icon="icon: bolt" :uk-tooltip="'title: ' + $store.state.organization.name + ' Admin'"></sup>
                <br>
                <span style="font-size: 14pt" class="uk-text-meta">
                    {{ '@' + $store.state.user.username }}  
                </span>
            </h3>
            <h5>
                <b>{{ $t('user.email') }}</b> {{ $store.state.user.email }}
                <br>
                <b>{{ $t('user.date') }}</b> {{ $store.state.user.registration_date.split(' ')[0] }}
            </h5>

            <div class="uk-button-group">
                <button v-on:click="editing = true" class="uk-button uk-button-text uk-margin-right">{{ $t('user.edit') }}</button>
                <button v-on:click="deleteProfile" class="uk-button uk-button-text uk-text-danger">{{ $t('user.del') }}</button>
            </div>
        </center>
        <center v-else>
            <div class="uk-text-bold">{{ $t('user.basic') }}</div>
            <div class="uk-margin uk-width-large">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('user.first') }}</label>
                <div class="uk-form-controls">
                    <input class="uk-input uk-text-center" type="text" v-model="first_name" 
                    :placeholder="$t('user.first') + '...'">
                </div>
            </div>
            <div class="uk-margin uk-width-large">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('user.last') }}</label>
                <div class="uk-form-controls">
                    <input class="uk-input uk-text-center" type="text" v-model="last_name" 
                    :placeholder="$t('user.last') + '...'">
                </div>
            </div>
            <div class="uk-text-bold">{{ $t('user.change') }}</div>
            <div class="uk-margin uk-width-large">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('user.old') }}</label>
                <div class="uk-form-controls">
                    <input class="uk-input uk-text-center" type="password" v-model="old_password" 
                    :placeholder="$t('user.old')">
                </div>
            </div>
            <div class="uk-margin uk-width-large">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('user.new') }}</label>
                <div class="uk-form-controls">
                    <input class="uk-input uk-text-center" type="password" v-model="new_password" 
                    :placeholder="$t('user.new')">
                </div>
            </div>
            <div class="uk-margin uk-width-large">
                <label class="uk-form-label" for="form-stacked-text">{{ $t('user.repeat') }}</label>
                <div class="uk-form-controls">
                    <input class="uk-input uk-text-center" type="password" v-model="repeat" 
                    :placeholder="$t('user.repeat')">
                </div>
            </div>
            <button v-on:click="editProfile" class="uk-button uk-button-default">{{ $t('user.save') }}</button>
        </center>
        <span v-if="editing" 
        class="uk-margin-small-top uk-margin-left uk-text-bold uk-position-top-left"
        uk-icon="icon: chevron-left" style="cursor: pointer" v-on:click="editing = false"></span>
    </div>
</template>
<script>
import Avatar from 'vue-avatar'

export default {
    name: 'User',
    components: {
        Avatar
    },
    data: function () {
        return {
            editing: false,
            first_name: "",
            last_name: "",
            old_password: "",
            new_password: "",
            repeat: ""
        }
    },
    mounted: function () {
        this.first_name = this.$store.state.user.first_name
        this.last_name = this.$store.state.user.last_name
    },
    methods: {
        editProfile: function () {
            var input = {};
            if (this.first_name != this.$store.state.user.first_name 
                || this.first_name != '') {
                    input['first_name'] = this.first_name;
            }
            if (this.last_name != this.$store.state.user.larst_name 
                || this.last_name != '') {
                    input['last_name'] = this.last_name;
            }
            if (this.new_password != '') {
                    if (this.new_password == this.repeat) {
                        input['old_password'] = this.old_password;
                        input['new_password'] = this.new_password;
                    }
                    else {
                        UIkit.notification({
                            message: this.$t('match'),
                            status: 'danger',
                            pos: 'top-right',
                            timeout: 5000
                        });
                        return;
                    }
            }

            var _this = this;
            this.$http
            .put('http://34.118.9.73:8080/api/user/', input)
            .then(resp => {
                UIkit.notification({
                    message: resp.data.message,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                });
                _this.$store.dispatch("getUser");
            })
        },
        deleteProfile: function () {
            this.$http
            .delete('http://34.118.9.73:8080/api/user/')
            .then(resp => {
                UIkit.notification({
                    message: resp.data.message,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                });
                this.$store.dispatch("logout")
                this.$router.push("/");
                window.location.reload(true);
            })
        }
    }
}
</script>