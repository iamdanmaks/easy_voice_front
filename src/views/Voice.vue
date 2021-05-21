<template>
    <div>
        <article v-for="(v, i) in voices" class="uk-comment uk-comment-primary uk-margin-right uk-margin-top">
            <header class="uk-comment-header">
                <div class="uk-grid-medium uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                        <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">{{ v.name }}</a></h4>
                        <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                            <li><button class="uk-button uk-button-text" v-on:click="buildSpectro(v)">
                                Play
                            </button></li>
                            <li><a href="#">Edit</a></li>
                            <li><button class="uk-button uk-button-text" v-on:click="deleteVoice(v.public_id)">
                                Delete
                            </button></li>
                        </ul>
                    </div>
                </div>
            </header>
            <div class="uk-comment-body">
                <p>{{ v.description }}</p>
                <div :id="'wave-' + v.public_id"></div>
            </div>
        </article>    
    </div>    
</template>
<script>
import WaveSurfer from 'wavesurfer.js';

export default {
    name: 'Voice',
    data: function () {
        return {
            voices: [],
            players: {}
        }
    },
    mounted: function () {
        var _this = this;
        this.$http
        .get('http://34.118.9.73:8080/api/voice/?organization=' + _this.$store.state.organization.public_id)
        .then(resp => {
            var flags = [], output = [], l = resp.data.length, i;
            for(i = 0; i < l; ++i) {
                if( flags[resp.data[i].public_id])
                    continue;

                flags[resp.data[i].public_id] = true;
                output.push(resp.data[i]);
            }
            _this.voices = output;
        })
    },
    methods: {
        buildSpectro: function (voice) {
            if (voice.public_id in this.players) {
                this.players[voice.public_id].play()
            }
            else {
                var wavesurfer = WaveSurfer.create({
                    container: '#wave-' + voice.public_id,
                    waveColor: 'violet',
                    progressColor: 'transparent'
                });

                wavesurfer.load(voice.url);

                wavesurfer.on('ready', function () {
                    wavesurfer.play();
                });

                this.players[voice.public_id] = wavesurfer;
            }
        },
        deleteVoice: function (public_id) {
            this.$http
            .delete('http://34.118.9.73:8080/api/voice/' + public_id)
            .then(resp => {
                UIkit.notification({
                    message: resp.data.message,
                    status: 'success',
                    pos: 'top-right',
                    timeout: 5000
                });

                var _this = this;
                this.$http
                .get('http://34.118.9.73:8080/api/voice/?organization=' + _this.$store.state.organization.public_id)
                .then(resp => {
                    var flags = [], output = [], l = resp.data.length, i;
                    for(i = 0; i < l; ++i) {
                        if( flags[resp.data[i].public_id])
                            continue;

                        flags[resp.data[i].public_id] = true;
                        output.push(resp.data[i]);
                    }
                    _this.voices = output;
                })
            })
        }
    }
}
</script>
