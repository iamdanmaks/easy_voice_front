<template>
    <div style="overflow: hidden">
        <div v-if="$store.state.organization.demo" class="uk-text-large uk-width-4-5 uk-margin-top uk-align-center uk-text-center">
            Your organization is in demo mode now. Add billing info to upgrade it for unlimited usage.
            You can check the remaining voicing tokens below. They will be saved after upgrade.
        </div>
        <div uk-tooltip="title: One token is equal to one symbol" 
        class="uk-width-4-5 uk-align-center uk-text-center" v-if="$store.state.organization.demo">
            <span class="uk-text-bold">{{ formatted }} / 300,000</span>
            <progress
            class="uk-progress" :value="$store.state.organization.tokens_left" max="300000"></progress>
        </div>
        <div class="uk-margin-top">
            <button v-on:click="csv"
            class="uk-button uk-button-text uk-align-right uk-margin-large-bottom uk-margin-large-right">
                Save queries as .csv
            </button>
        </div>
        <div class="uk-margin-large-top uk-margin-right uk-margin-medium-bottom">
            <center class="uk-margin-medium-right" id="date_tokens"></center>
            <center class="uk-margin-medium-right" id="query_time"></center>
            <center class="uk-margin-medium-right" id="lang_count"></center>
            <center class="uk-text-large">Most common words</center>
            <vue-word-cloud
            id="wcloud"
            style="
                width: 75vw;
                height: 30vh;
            "
            spacing="0.1"
            :words="word_list"
            :color="([, weight]) => weight > 5 ? 'DeepPink' : weight > 2 ? 'RoyalBlue' : 'Indigo'"
            font-family="Roboto"
            />
        </div>
        <article v-for="v in queries.reverse()" :key="v.public_id" class="uk-comment uk-comment-primary uk-margin-right uk-margin-small-top">
            <header class="uk-comment-header">
                <div class="uk-grid-medium uk-flex-middle" uk-grid>
                    <div class="uk-width-expand">
                        <h4 class="uk-comment-title uk-margin-remove"><a class="uk-link-reset" href="#">
                            Voiced with: {{ v.voice }}
                        </a></h4>
                        <ul class="uk-comment-meta uk-subnav uk-subnav-divider uk-margin-remove-top">
                            <li><a href="#">{{ v.date.split(' ')[0] }}</a></li>
                        </ul>
                    </div>
                </div>
            </header>
            <div class="uk-comment-body">
                <p>{{ v.text }}</p>
                <audio :src="v.url" controls></audio>
            </div>
        </article>
    </div>
</template>
<script>
import VueWordCloud from 'vuewordcloud';

export default {
    name: 'SignedHome',
    components: {
        VueWordCloud
    },
    data() {
        return {
            langCodes: {
                'uk': 'Ukrainian',
                'en': 'English'
            },
            queries: [],
            word_list: []
        };
    },
    methods: {
        csv: function () {
            var keys = Object.keys(this.queries[0]);
            const index = keys.indexOf('url');
            if (index > -1) {
                keys.splice(index, 1);
            }
            var result = keys.join("\t") + "\n";

            this.queries.forEach(function(obj){
                result += keys.map(k => obj[k]).join("\t") + "\n";
            });

            var a = document.createElement('a');
            a.href = 'data:attachment/csv,' +  encodeURIComponent("\ufeff" + result);
            a.target = '_blank';
            a.download = 'Queries.csv';

            document.body.appendChild(a);
            a.click();
        }
    },
    mounted: function () {
        var _this = this;
        this.$http
        .get('http://34.118.9.73:8080/api/query/?organization=' + this.$store.state.organization.public_id)
        .then(resp => {
            _this.queries = resp.data

            const queriesByDate = resp.data.reduce((acc, value) => {
                if (!acc[value.date.split(' ')[0]]) {
                    acc[value.date.split(' ')[0]] = [];
                }
                
                // Grouping
                acc[value.date.split(' ')[0]].push(value);
                
                return acc;
            }, {});

            const queriesByLang = resp.data.reduce((acc, value) => {
                if (!acc[value.language]) {
                    acc[value.language] = [];
                }
                
                // Grouping
                acc[value.language].push(value);
                
                return acc;
            }, {});

            function plot_timeseries (traces, name, div_id) {
                var data = traces;
                var layout = {
                    title: name,
                    xaxis: {
                        autorange: true,
                        type: 'date'
                    },
                    yaxis: {
                        autorange: true,
                        type: 'linear'
                    }
                };
                Plotly.newPlot(div_id, data, layout);
            }

            var trace11 = {
                x: Object.keys(queriesByDate),
                y: Object.values(queriesByDate).map(v => v.map(x => x.text.length).reduce((a, b) => a + b, 0)),
                name: 'Sum of tokens per date',
                type: 'scatter'
            };
            var trace12 = {
                x: Object.keys(queriesByDate),
                y: Object.values(queriesByDate).map(v => (v.map(x => x.text.length).reduce((a, b) => a + b, 0) / v.length).toFixed(2)),
                name: 'Average tokens per date',
                type: 'scatter'
            };
            var trace13 = {
                x: Object.keys(queriesByDate),
                y: Object.values(queriesByDate).map(v => v.length),
                name: 'Number of queries per date',
                type: 'scatter'
            };

            plot_timeseries([trace11, trace12, trace13], 'Queries per date', 'date_tokens');

            var trace21 = {
                x: Object.keys(queriesByDate),
                y: Object.values(queriesByDate).map(v => v.map(x => x.time_processed).reduce((a, b) => a + b, 0)),
                name: 'General spent query time per date',
                type: 'scatter'
            };
            var trace22 = {
                x: Object.keys(queriesByDate),
                y: Object.values(queriesByDate).map(v => (v.map(x => x.time_processed).reduce((a, b) => a + b, 0) / v.length).toFixed(2)),
                name: 'Average spent query time per date',
                type: 'scatter'
            };

            plot_timeseries([trace21, trace22, trace13], 'Query Time per date', 'query_time');

            var data = [{
                values: Object.values(queriesByLang).map(v => v.length),
                labels: Object.keys(queriesByLang).map(v => _this.langCodes[v]),
                type: 'pie'
            }];

            var layout = {
                title: 'Quries per language'
            }

            Plotly.newPlot('lang_count', data, layout);

            function words(str) { 
                return str.split(" ").reduce(function(count, word) {
                    count[word] = count.hasOwnProperty(word) ? count[word] + 1 : 1;
                    
                    return count;
                }, {});
            }

            var wordCount = words(resp.data.map(v => v.text).join(' '));
            _this.word_list = Object.keys(wordCount).map(
                key => [key, wordCount[key]]
            ).sort(function(a, b) { return b[1] - a[1]; }).slice(0, 35);
            document.getElementById('wcloud').style = "width: 70vw; height: 35vh"
        });
    },
    computed: {
        formatted: function() {
            var nStr = this.$store.state.organization.tokens_left.toString() + '';
            var x = nStr.split('.');
            var x1 = x[0];
            var x2 = x.length > 1 ? '.' + x[1] : '';
            var rgx = /(\d+)(\d{3})/;
            while (rgx.test(x1)) {
                x1 = x1.replace(rgx, '$1' + ',' + '$2');
            }
            return x1 + x2;
        }
    }
}
</script>
<style scoped>

</style>