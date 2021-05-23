<template>
    <center class="uk-margin uk-align-center">
        {{ $t('api.descr') }}
        <h2 class="uk-margin-top">{{ $t('api.key') }}</h2>
        <div v-on:click="copyKey" uk-tooltip="Copy the key by clicking on the block"
        id="key" style="transition: 1s filter linear; height: 5vh; border-radius: 10px"
        class="blured uk-card-default uk-card-body uk-width-large uk-text-middle uk-text-truncate uk-text-center">
            {{ api_key }}
        </div>
        <ul uk-accordion="multiple: true">
            <li class="uk-open">
                <a class="uk-accordion-title uk-text-left uk-padding-left" href="#">{{ $t('api.vt') }}</a>
                <div class="uk-accordion-content">
                    <span class="uk-label uk-margin-right">{{ $t('api.post') }}</span>
                    <a href="http://34.118.9.73:8080/api/query/" class="uk-link-heading">https://34.118.9.73:8080/api/query/</a>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">{{ $t('api.inp') }}</span>
                    <json-viewer class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="{voice: $t('api.vt_inp.pub_id'), text: $t('api.vt_inp.text'), organization: $t('api.vt_inp.org')}">
                    </json-viewer>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">{{ $t('api.out') }}</span>
                    <json-viewer class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="{status: $t('api.status'), message: $t('api.message'), result: $t('api.vt_json.result')}">
                    </json-viewer>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title uk-text-left uk-padding-left" href="#">{{ $t('api.av') }}</a>
                <div class="uk-accordion-content">
                    <span class="uk-label uk-margin-right">{{ $t('api.post') }}</span>
                    <a href="http://34.118.9.73:8080/api/voice/" class="uk-link-heading">https://34.118.9.73:8080/api/voice/</a>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">{{ $t('api.inp') }}</span>
                    <json-viewer class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="{name: $t('api.av_inp.name'), desciption: $t('api.av_inp.descr'), organization: $t('api.av_inp.org')}">
                    </json-viewer>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">{{ $t('api.out') }}</span>
                    <json-viewer class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="{status: $t('api.status'), message: $t('api.message')}">
                    </json-viewer>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title uk-text-left uk-padding-left" href="#">{{ $t('api.gvq') }}</a>
                <div class="uk-accordion-content">
                    <span class="uk-label uk-margin-right">{{ $t('api.get') }}</span>
                    <a :href="'http://34.118.9.73:8080/api/query/?organization=' + $store.state.organization.public_id" class="uk-link-heading">
                        https://34.118.9.73:8080/api/query/?organization={{ $store.state.organization.public_id }}
                    </a>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">{{ $t('api.out') }}</span>
                    <json-viewer :expand-depth=2
                    class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="[{text: $t('api.gvq_json.text'), date: $t('api.gvq_json.dt'), language: $t('api.gvq_json.lang'), time_processed: $t('api.gvq_json.tp'), voice: $t('api.gvq_json.voice'), url: $t('api.gvq_json.url')}]">
                    </json-viewer>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title uk-text-left uk-padding-left" href="#">{{ $t('api.gv') }}</a>
                <div class="uk-accordion-content">
                    <span class="uk-label uk-margin-right">{{ $t('api.get') }}</span>
                    <a :href="'http://34.118.9.73:8080/api/voice/?organization=' + $store.state.organization.public_id" 
                    class="uk-link-heading">
                        https://34.118.9.73:8080/api/voice/?organization={{ $store.state.organization.public_id }}
                    </a>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">{{ $t('api.out') }}</span>
                    <json-viewer :expand-depth=2
                    class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="[{name: $t('api.gv_json.name'), description: $t('api.gv_json.descr'), public_id: $t('api.gv_json.pub_id'), url: $t('api.gv_json.url')}]">
                    </json-viewer>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title uk-text-left uk-padding-left" href="#">{{ $t('api.oi') }}</a>
                <div class="uk-accordion-content">
                    <span class="uk-label uk-margin-right">{{ $t('api.get') }}</span>
                    <a href="http://34.118.9.73:8080/api/organization/" class="uk-link-heading">https://34.118.9.73:8080/api/organization/</a>
                    <br><br>
                    <span class="uk-text-bold uk-text-left uk-align-left">{{ $t('api.out') }}</span>
                    <json-viewer :expand-depth=4
                    class="uk-align-left uk-text-left uk-width-1-1" style="background: rgb(230, 230, 230)" 
                    :value="[{name: $t('api.oi_json.name'), description: $t('api.oi_json.descr'), public_id: $t('api.oi_json.pub_id'), api_key: $t('api.oi_json.key'), registration_date: $t('api.oi_json.date'), demo: $t('api.oi_json.demo'), tokens_left: $t('api.oi_json.tokens_left'), users: [{public_id: $t('api.oi_json.member.pub_id'), email: $t('api.oi_json.member.email'), first_name: $t('api.oi_json.member.first_name'), last_name: $t('api.oi_json.member.last_name'), username: $t('api.oi_json.member.username'), registration_date: $t('api.oi_json.member.date'), organization_admin: $t('api.oi_json.member.admin')}]}]">
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
