<template>
    <div>
        <h1>{{ $t('card.insert') }}</h1>
        <br>
        <div id="card-form">
        </div>
        <span v-if="!rendered" uk-spinner="ratio: 3.5"></span>
        <br><button v-if="rendered" v-on:click="getCardToken"
        class="uk-button uk-button-default">
            {{ $t('card.submit') }}
        </button>
    </div>
</template>
<script>
export default {
    name: 'UpgradeModal',
    data: function () {
        return {
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
        this.elements = this.stripe.elements({ locale: _this.$i18n.locale });
        this.card = this.elements.create('card', {
            hidePostalCode: true, 
            style: this.style
        });
        this.card.mount('#card-form');
        this.rendered = true;
    },
    methods: {
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
                demo_status: false,
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
