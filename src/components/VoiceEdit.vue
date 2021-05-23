<template>
    <center>
        <div class="uk-text-bold">Edit voice information</div>
        <div class="uk-margin uk-width-large">
            <label class="uk-form-label" for="form-stacked-text">{{ $t('voice_add.name') }}</label>
            <div class="uk-form-controls">
                <input class="uk-input uk-text-center" type="text" v-model="$store.state.editVoice.name" 
                placeholder="Voice name...">
            </div>
        </div>
        <div class="uk-margin uk-width-large">
            <label class="uk-form-label" for="form-stacked-text">{{ $t('voice_add.descr') }}</label>
            <div class="uk-form-controls">
                <textarea class="uk-textarea" rows="3" v-model="$store.state.editVoice.description" 
                placeholder="Voice description..."></textarea>
            </div>
        </div>
        <button v-on:click="saveChanges" class="uk-button uk-button-default">
            {{ $t('voice_add.save') }}
        </button>
    </center>
</template>
<script>
export default {
    name: 'VoiceEdit',
    methods: {
        saveChanges: function () {
            if (this.$store.state.name == '') {
                UIkit.notification({
                    message: this.$t('fiilin'),
                    status: 'danger',
                    pos: 'top-right',
                    timeout: 5000
                });
                return;
            }
            var _this = this;
            this.$http
            .put('http://34.118.9.73:8080/api/voice/' + _this.$store.state.editVoice.public_id, {
                name: _this.$store.state.editVoice.name,
                description: _this.$store.state.editVoice.description
            })
            .then(resp => {
                UIkit.notification({
                    message: resp.data.message,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                });
                _this.$store.dispatch("getVoices", _this.$store.state.organization.public_id)
            })
        }
    }
}
</script>