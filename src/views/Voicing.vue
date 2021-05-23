<template>
    <div>
        <form class="uk-margin-right uk-margin-top" @submit.prevent="voiceText">
            <fieldset class="uk-fieldset">

                <legend class="uk-legend">{{ $t('voicing.descr') }}</legend>

                <div class="uk-margin">
                    <div class="uk-form-label">{{ $t('voicing.choose') }}<sup style="color: darkred; font-size: 10pt">*</sup></div>
                    <div class="uk-form-controls">
                        <select v-model="chosen_voice" class="uk-select">
                            <option v-for="(v) in $store.state.voices" 
                            :key="v.public_id" :value="v">{{ v.name }}</option>
                        </select>
                    </div>
                </div>

                <ul class="uk-subnav uk-subnav-pill uk-margin-top" uk-switcher>
                    <li><a href="#">{{ $t('voicing.vt') }}</a></li>
                    <li><a href="#">{{ $t('voicing.fc') }}</a></li>
                </ul>

                <ul class="uk-switcher uk-margin">
                    <li>
                        <div class="uk-margin">
                            <div class="uk-form-label">{{ $t('demo.text') }}<sup style="color: darkred; font-size: 10pt">*</sup></div>
                            <textarea v-model="text" class="uk-textarea" rows="5" :placeholder="$t('demo.holder')"></textarea>
                        </div>
                    </li>
                    <li>
                        <div class="uk-margin" uk-margin>
                            <div uk-form-custom="target: true">
                                <input v-on:change="getContent" id="fileInp" type="file" accept=".txt">
                                <input class="uk-input uk-form-width-medium" type="text" :placeholder="$t('demo.file')" disabled>
                            </div>
                        </div>
                        <div>
                            {{ file_content }}
                        </div>
                    </li>
                </ul>

                <div class="uk-margin">
                    <button class="uk-button uk-button-default">
                        {{ $t('demo.submit') }}
                    </button>
                </div>

                <center class="uk-margin" v-if="state == 1">
                    <span uk-spinner="ratio: 3.9"></span>
                </center>
                <center class="uk-margin uk-align-center" v-if="state == 2">
                    <audio controls>
                        <source :src="result_link" type="audio/wav">
                    </audio>
                </center>

            </fieldset>
        </form>
    </div>    
</template>
<script>

export default {
    name: 'Voicing',
    data: function () {
        return {
            state: 0,
            result_link: "",
            chosen_voice: null,
            text: "",
            file_content: "",
            voices: null,
            player: null
        }
    },
    mounted: function () {
        this.$store.dispatch("getVoices", this.$store.state.organization.public_id)
    },
    methods: {
        getContent: function () {
            var file = document.querySelector('#fileInp').files[0];
            var textType = /text.*/;
            var _this = this;

            if (file.type.match(textType)) {
                var reader = new FileReader();
                
                reader.onload = function(e) {
                    var content = reader.result;
                    _this.file_content = content;
                }
                
                reader.readAsText(file);	
            } else {
                fileDisplayArea.innerText = "File not supported!"
            }
        },
        voiceText: async function () {
            var _this = this;
            if ((_this.text == "" && _this.file_content == "") || _this.chosen_voice == null) {
                UIkit.notification({
                    message: "Fill in the fields and choose the voice",
                    status: 'danger',
                    pos: 'top-right',
                    timeout: 5000
                });
                return;
            }
            _this.state = 1;
            
            var txt = '';
            if (this.file_content != '')
                txt = this.file_content
            else
                txt = this.text

            this.$http
                .post('http://34.118.9.73:8080/api/query/', {
                    voice: _this.chosen_voice.public_id,
                    organization: this.$store.state.organization.public_id,
                    text: txt
                })
                .then(resp => {
                    _this.result_link = resp.data.result;
                    _this.state = 2;
                    _this.file_content = "";
                    _this.text = "";
                })
        }
    }
}

</script>
