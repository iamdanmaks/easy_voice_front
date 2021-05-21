<template>
    <div class="uk-align-center uk-text-center">
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Name</label>
            <div class="uk-form-controls">
                <input class="uk-input" type="text" v-model="name" 
                placeholder="New voice name...">
            </div>
        </div>
        <div class="uk-margin">
            <label class="uk-form-label" for="form-stacked-text">Description</label>
            <div class="uk-form-controls">
                <textarea class="uk-textarea" rows="3" v-model="description" 
                placeholder="New voice description..."></textarea>
            </div>
        </div>
        <ul class="uk-subnav uk-subnav-pill uk-margin-top" uk-switcher>
            <li><a href="#">Load from file</a></li>
            <li><a href="#">Record voice</a></li>
        </ul>

        <ul class="uk-switcher uk-margin">
            <li>Hello!</li>
            <li>
                <button v-on:click="record" class="uk-button uk-button-default">Record</button>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'VoiceAdd',
    data: function () {
        return {
            name: "",
            description: ""
        }
    },
    methods: {
        record: function () {
            let recorder = null;

            const onsuccess = (stream) => {
                var options = {
                    audioBitsPerSecond : 16000,
                    type: 'audio/ogg; codecs=opus',
                }
                recorder = new MediaRecorder(stream, options);

                recorder.start(); // Starting the record

                recorder.ondataavailable = (e) => {
                    // Converting audio blob to base64
                    let reader = new FileReader()
                    reader.onloadend = () => {
                        console.log(reader.result);
                        // You can upload the base64 to server here.
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

            navigator.getUserMedia({
                audio: true
            }, onsuccess, (e) => {
                console.log(e);
            });

            setTimeout(() => {
                recorder.stop();
            }, 5000);
        }
    }
}
</script>
