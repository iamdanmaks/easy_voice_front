<template>
    <center class="uk-margin uk-align-center">
        Do not pass your API key to anyone else. Change it at least once a month to keep everything secured.
        <h2 class="uk-margin-top">ORGANIZATION API KEY</h2>
        <div v-on:click="copyKey" uk-tooltip="Copy the key by clicking on the block"
        id="key" style="transition: 1s filter linear; height: 5vh; border-radius: 10px"
        class="blured uk-card-default uk-card-body uk-width-large uk-text-middle uk-text-truncate uk-text-center">
            {{ api_key }}
        </div>
        <ul uk-accordion="multiple: true">
            <li class="uk-open">
                <a class="uk-accordion-title uk-text-left uk-padding-left" href="#">Voice the text</a>
                <div class="uk-accordion-content">
                    <span class="uk-label uk-margin-right">POST</span>
                    <a href="http://34.118.9.73:8080/api/query/" class="uk-link-heading">https://34.118.9.73:8080/api/query/</a>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">INPUT:</span>
                    <json-viewer class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="{voice: 'voice public id', text: 'text to voice', organization: 'organization public id'}">
                    </json-viewer>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">OUTPUT:</span>
                    <json-viewer class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="{status: 'result status', message: 'result message', result: 'output file link'}">
                    </json-viewer>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title uk-text-left uk-padding-left" href="#">Add voice</a>
                <div class="uk-accordion-content">
                    <span class="uk-label uk-margin-right">POST</span>
                    <a href="http://34.118.9.73:8080/api/voice/" class="uk-link-heading">https://34.118.9.73:8080/api/voice/</a>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">INPUT:</span>
                    <json-viewer class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="{name: 'voice name', desciption: 'voice description', organization: 'organization public id'}">
                    </json-viewer>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">OUTPUT:</span>
                    <json-viewer class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="{status: 'result status', message: 'result message'}">
                    </json-viewer>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title uk-text-left uk-padding-left" href="#">Get voicing queries</a>
                <div class="uk-accordion-content">
                    <span class="uk-label uk-margin-right">GET</span>
                    <a href="http://34.118.9.73:8080/api/query/" class="uk-link-heading">https://34.118.9.73:8080/api/query/</a>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">OUTPUT:</span>
                    <json-viewer :expand-depth=2
                    class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="[{text: 'voiced text', date: 'query datetime', language: 'text language code', time_processed: 'seconds to voice the text', voice: 'used voice name', url: 'output file url'}]">
                    </json-viewer>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title uk-text-left uk-padding-left" href="#">Get voices</a>
                <div class="uk-accordion-content">
                    <span class="uk-label uk-margin-right">GET</span>
                    <a href="http://34.118.9.73:8080/api/voice/" class="uk-link-heading">https://34.118.9.73:8080/api/voice/</a>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">OUTPUT:</span>
                    <json-viewer :expand-depth=2
                    class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="[{name: 'voice name', description: 'voice description', public_id: 'voice public id', url: 'voice file url'}]">
                    </json-viewer>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title uk-text-left uk-padding-left" href="#">Get organization information</a>
                <div class="uk-accordion-content">
                    <span class="uk-label uk-margin-right">GET</span>
                    <a href="http://34.118.9.73:8080/api/organization/" class="uk-link-heading">https://34.118.9.73:8080/api/organization/</a>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">OUTPUT:</span>
                    <json-viewer :expand-depth=4
                    class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="[{name: 'organization name', description: 'organization description', public_id: 'organization public id', api_key: 'organization API key', registration_date: 'organization registration date', demo: 'demo version status', tokens_left: 'demo tokens left', users: [{public_id: 'user public id', email: 'user email', first_name: 'user first name', last_name: 'user last name', username: 'user username', registration_date: 'user registration date', organization_admin: 'user organization admin'}]}]">
                    </json-viewer>
                </div>
            </li>
        </ul>
    </center>
</template>
<script>
export default {
    name: 'Api',
    data() {
        return {
            api_key: ""
        };
    },
    mounted: function () {
        var _this = this;
        this.$http
            .get('http://34.118.9.73:8080/api/organization/key')
            .then(resp => {
                _this.api_key = resp.data.token
            });
    },
    methods: {
        copyKey: function () {
            var key_container = document.getElementById('key');
            key_container.classList.remove('blured');
            
            const el = document.createElement('textarea');
            el.value = this.api_key;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);

            UIkit.notification({
                message: 'Key was copied to clipboard',
                status: 'primary',
                pos: 'top-right',
                timeout: 5000
            });
        }
    }
}
</script>
<style scoped>
.blured {
    -webkit-filter: blur(5px);
    -moz-filter: blur(5px);
    -o-filter: blur(5px);
    -ms-filter: blur(5px);
    filter: blur(5px);
}
</style>
