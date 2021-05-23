<template>
    <div class="uk-align-center uk-text-center">
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">{{ $t('voice_add.name') }}<sup style="color: darkred; font-size: 10pt">*</sup></label>
            <div class="uk-form-controls">
                <input class="uk-input" type="text" v-model="name" 
                :placeholder="$t('voice_add.name_holder')">
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">{{ $t('voice_add.descr') }}</label>
            <div class="uk-form-controls">
                <textarea class="uk-textarea" rows="3" v-model="description" 
                :placeholder="$t('voice_add.descr_holder')"></textarea>
            </div>
        </div>
        <ul class="uk-subnav uk-subnav-pill uk-margin-top" uk-switcher>
            <li><a href="#">{{ $t('voice_add.file') }}</a></li>
            <li><a href="#">{{ $t('voice_add.record') }}</a></li>
        </ul>

        <ul class="uk-switcher uk-margin">
            <li>
                <div class="uk-margin" uk-margin>
                    <div uk-form-custom="target: true">
                        <input v-on:change="encodeInput" id="fileInp" type="file" accept=".wav">
                        <input class="uk-input uk-form-width-medium" type="text" :placeholder="$t('voice_add.select')" disabled>
                    </div>
                </div>
            </li>
            <li>
                <button v-on:click="record" class="uk-button uk-button-default" uk-icon="icon: microphone"
                style="border-radius: 50%;" :uk-tooltip="'title: ' + $t('voice_add.tip') + '; pos: bottom'"> 
                </button>
                <progress v-if="progress != 0 && progress != 7"
                id="js-progressbar" class="uk-progress" :value="progress" max="5"></progress>
                <br>
                <audio class="uk-margin"
                v-if="progress == 7" controls="controls" autobuffer="autobuffer" autoplay="autoplay">
                    <source :src="'data:audio/wav;base64,' + voice_content" />
                </audio>
            </li>
        </ul>
        <button v-on:click="saveVoice" class="uk-button uk-button-default uk-margin-top">
            {{ $t('voice_add.save') }}
        </button>
    </div>
</template>
<script>
import {MediaRecorder, register} from 'extendable-media-recorder';
import { connect } from 'extendable-media-recorder-wav-encoder';

export default {
    name: 'VoiceAdd',
    data: function () {
        return {
            name: "",
            description: "",
            voice_content: "",
            progress: 0,
            registered: false
        }
    },
    methods: {
        saveVoice: function () {
            if (this.name == "" || this.voice_content == "") {
                UIkit.notification({
                    message: this.$t('voice_add.all'),
                    status: 'danger',
                    pos: 'top-right',
                    timeout: 5000
                });
                return;
            }
            var _this = this;
            this.$http
            .post('http://34.118.9.73:8080/api/voice/', {
                name: _this.name,
                description: _this.description,
                file: _this.voice_content,
                organization: _this.$store.state.organization.public_id
            })
            .then(resp => {
                UIkit.notification({
                    message: resp.data.message,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                });
                this.$store.dispatch("getVoices", this.$store.state.organization.public_id)
            })
        },
        toBase64: function (file) {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = () => resolve(reader.result);
                reader.onerror = error => reject(error);
            });
        },
        encodeInput: async function () {
            const file = document.querySelector('#fileInp').files[0];
            this.voice_content = await this.toBase64(file).slice(22);
        },
        record: async function () {
            if (!this.registered) {
                await register(await connect());
                this.registered = true;
            }

            var _this = this;
            _this.progress = 0;

            let recorder = null;

            const onsuccess = (stream) => {
                recorder = new MediaRecorder(stream, { audioBitsPerSecond: 16000, mimeType: 'audio/wav' });

                recorder.start();

                recorder.ondataavailable = (e) => {
                    let reader = new FileReader()
                    reader.onloadend = () => {
                        _this.voice_content = reader.result.slice(22);
                    }

                    reader.readAsDataURL(e.data);
                }
            }

            navigator.getUserMedia = (
                navigator.getUserMedia ||
                navigator.webkitGetUserMedia ||
                navigator.mozGetUserMedia ||
                navigator.msGetUserMedia
            );

            UIkit.util.ready(function () {
                var animate = setInterval(function () {

                    _this.progress += 1;

                    if (_this.progress >= 7) {
                        clearInterval(animate);
                    }
                }, 1000);
            });

            navigator.getUserMedia({
                audio: true
            }, onsuccess, (e) => {
                console.log(e);
            });

            setTimeout(() => {
                recorder.stop();
            }, 6000);
        }
    }
}
</script>
