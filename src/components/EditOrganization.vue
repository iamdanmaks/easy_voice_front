<template>
    <center>
        <div class="uk-text-large">Edit organization</div>
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Desciption</label>
            <div class="uk-form-controls">
                <textarea class="uk-textarea" rows="5" placeholder="Organization description..." v-model="description"></textarea>
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Card</label>
            <span v-if="!rendered" uk-spinner="ratio: 3.5"></span>
            <div id="card-form-edit"></div>
        </div>
        <button class="uk-button uk-button-default" v-on:click="edit">Submit</button>
    </center>
</template>
<script>
export default {
    name: 'EditOrganization',
    data: function () {
        return {
            description: "",
            stripe: new Stripe('pk_test_gpmWaDrMw3A2d2q8T4AGxYYm00P28mEIyX'),
            elements: undefined,
            card: undefined,
            style: {
                base: {
                    color: '#32325d',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                        color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
            },
            rendered: false
        }
    },
    mounted: function () {
        var _this = this;
        _this.description = this.$store.state.organization.description;
        this.elements = this.stripe.elements({ locale: _this.$i18n.locale });
        this.card = this.elements.create('card', {
            hidePostalCode: true, 
            style: this.style
        });
        this.card.mount('#card-form-edit');
        this.rendered = true;
    },
    methods: {
        edit: function () {
            if (this.description != this.$store.state.organization.description) {
                var _this = this;
                this.$http
                .put('http://34.118.9.73:8080/api/organization/', {
                    description: _this.description
                })
                .then(resp => {
                    UIkit.notification({
                        message: resp.data.message,
                        status: 'success',
                        pos: 'top-right',
                        timeout: 5000
                    });
                    _this.$store.dispatch("getOrg")
                })
            }
            this.getCardToken();
        },
        getCardToken: function () {
            var _this = this;
            this.stripe
            .createToken(this.card)
            .then(result => {
                if (result.token != undefined) {
                    _this.send(result.token.id);
                }
                else {
                    _this.card_error = result.error.message;
                }
            });
        },
        send: function (token) {
            var _this = this;
            this.$http
            .put('http://34.118.9.73:8080/api/organization/', {
                card_token: token
            })
            .then(resp => {
                UIkit.notification({
                    message: resp.data.message,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                });
                _this.$store.dispatch("getOrg")
            })
            .catch(err => {
                UIkit.notification({
                    message: err.response.data.message,
                    status: 'danger',
                    pos: 'top-right',
                    timeout: 5000
                });
            })
        }
    }
}
</script>
