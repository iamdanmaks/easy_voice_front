<template>
    <form>
        <fieldset class="uk-fieldset">

            <legend class="uk-legend">Try voice the text with some default voices</legend>

            <div class="uk-margin">
                <div class="uk-form-label">Choose the voice</div>
                <div class="uk-form-controls">
                    <select class="uk-select">
                        <option>Option 01</option>
                        <option>Option 02</option>
                    </select>
                </div>
            </div>

            <div class="uk-margin">
                <div class="uk-form-label">Text to voice</div>
                <textarea class="uk-textarea" rows="5" placeholder="Your text..."></textarea>
            </div>

            <div class="uk-margin">
                <button class="uk-button uk-button-default">
                    Submit
                </button>
            </div>

            <center class="uk-margin" v-if="state == 1">
                <span uk-spinner="ratio: 4.5"></span>
            </center>
            <div class="uk-margin" v-if="state == 2">
                
            </div>

        </fieldset>
    </form>
</template>

<script>
export default {
    name: 'DemoVoiceOverForm',
    data: function () {
        return {
            state: 0,
            link: ""
        }
    }
}
</script>
