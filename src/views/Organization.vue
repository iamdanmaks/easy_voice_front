<template>
    <div>
        <article class="uk-comment uk-margin-medium-top">
            <header class="uk-comment-header">
                <div class="uk-grid-medium uk-flex-middle" uk-grid>
                    <div class="uk-width-auto">
                        <avatar class="uk-comment-avatar" :username="$store.state.organization.name"></avatar>
                    </div>
                    <div class="uk-width-expand">
                        <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">
                            {{ $store.state.organization.name }}
                        </a></h4>
                        <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                            <li><a href="#">{{ $store.state.organization.registration_date.split(' ')[0] }}</a></li>
                            <li><a href="#org-edit-modal" uk-toggle class="uk-button uk-button-text">
                                {{ $t('org.edit') }}
                            </button></a>
                            <li v-if="$store.state.organization.demo"><a href="#upgrade-modal" uk-toggle
                            class="uk-button uk-button-text">
                                {{ $t('org.upgrade') }}
                            </a></li>
                            <li>
                                <button class="uk-button uk-button-text">
                                    {{ $t('org.delete') }}
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </header>
            <div class="uk-comment-body">
                <p>
                    {{ $store.state.organization.description }}
                </p>
            </div>
        </article>

        <form @submit.prevent="inviteUser" class="uk-margin uk-card uk-card-default uk-card-body uk-width-5-6 uk-align-center">
            <fieldset class="uk-fieldset">

                <legend class="uk-legend">{{ $t('org.invite') }}</legend>

                <div class="uk-margin">
                    <label class="uk-form-label" for="form-stacked-text">{{ $t('org.email') }}</label>
                    <div class="uk-form-controls">
                        <input v-model="invite_email" class="uk-input" id="form-stacked-text" type="text" :placeholder="$t('org.holder')">
                    </div>
                </div>

                <div class="uk-margin">
                    <button class="uk-button uk-button-default">
                        {{ $t('org.inv') }}
                    </button>
                </div>

            </fieldset>
        </form>

        <div class="uk-text-large">
            {{ $t('org.mems') }}
        </div>

        <article v-for="u in $store.state.organization.users.sort(function(a,b){return new Date(a.registration_date) - new Date(b.registration_date);}).slice(1)" 
        class="uk-margin uk-comment uk-comment-primary uk-margin-large-right">
            <header class="uk-comment-header">
                <div class="uk-grid-medium uk-flex-middle" uk-grid>
                    <div class="uk-width-auto">
                        <avatar class="uk-comment-avatar" 
                        :username="u.first_name + ' ' + u.last_name"></avatar>
                    </div>
                    <div class="uk-width-expand">
                        <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">
                            {{ u.first_name + ' ' + u.last_name }}<sup class="uk-margin-small-left"
                             v-if="u.organization_admin" 
                             uk-icon="icon: bolt" :uk-tooltip="'title: ' + $store.state.organization.name + $t('user.status')"></sup>
                        </a></h4>
                        <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                            <li><a href="javascript:void(0)">{{ u.registration_date.split(' ')[0] }}</a></li>
                            <li><a href="javascript:void(0)">{{ '@' + u.username }}</a></li>
                            <li><a href="javascript:void(0)">{{ u.email }}</a></li>
                        </ul>
                    </div>
                </div>
            </header>
            <div class="uk-comment-body">
                <div class="uk-button-group">
                    <button v-on:click="changeStatus(u.public_id)" class="uk-button uk-button-default">{{ $t('org.change') }}</button>
                    <button v-on:click="removeUser(u.public_id)" class="uk-button uk-button-default">{{ $t('org.remove') }}</button>
                </div>
            </div>
        </article>
    </div>
</template>
<script>
import Avatar from 'vue-avatar'

export default {
    name: 'Organization',
    data() {
        return {
            invite_email: ""
        };
    },
    components: {
        Avatar
    },
    methods: {
        deleteOrganization: function () {
            var _this =this;
            this.$http.delete('http://34.118.9.73:8080/api/organization/')
            .then(resp => {
                UIkit.notification({
                    message: resp.data.message,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                });
                this.$store.dispatch("logout");
                this.$router.push("/");
            })
        },
        changeStatus: function (public_id) {
            this.$http.post('http://34.118.9.73:8080/api/organization/members/access/' + public_id)
            .then(resp => {
                UIkit.notification({
                    message: resp.data.message,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                })
                this.$store.dispatch("getOrg")
            })
        },
        removeUser: function (public_id) {
            var _this = this;
            this.$http.delete('http://34.118.9.73:8080/api/organization/members/access/' + public_id)
            .then(resp => {
                UIkit.notification({
                    message: resp.data.message,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                })
                this.$store.dispatch("getOrg")
            })
        },
        inviteUser: function () {
            var _this = this;
            this.$http.post('http://34.118.9.73:8080/api/user/invite', {
                email: _this.invite_email
            })
            .then(resp => {
                UIkit.notification({
                    message: resp.data.message,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                })
            })
        }
    }
}
</script>
