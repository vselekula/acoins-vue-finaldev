<template>
    <v-autocomplete
            aria-label="Поиск коллег"
            placeholder="Поиск коллег"
            :search="search"
            :get-result-value="getResultValue"
            @submit="handleSubmit"
    >
        <template v-slot:result="{ result, props }">
            <li
                    v-bind="props"
                    class="autocomplete-result wiki-result"
            >
                <div class="wiki-title">
                    123
                </div>
                <div class="wiki-snippet" v-html="result.last_name" />
            </li>
        </template>

<!--        <template v-slot:result="{ result }">-->
<!--            <li>-->
<!--                    v-bind="props"-->
<!--                    class="autocomplete-result"-->
<!--            >-->
<!--                <div >-->
<!--                    {{ result.first_name }}-->
<!--                    123-->
<!--                </div>-->
<!--                <div class="wiki-snippet" v-html="result.last_name" />-->
<!--            1111-->
<!--            </li>-->
<!--        </template>-->
    </v-autocomplete>
</template>

<script>
  import {HTTP} from '../../data/common';
  import Vue from 'vue'
  import Autocomplete from '@trevoreyre/autocomplete-vue'
  import '@trevoreyre/autocomplete-vue/dist/style.css'

  Vue.use(Autocomplete);
  export default {
    components: {
      'v-autocomplete': Autocomplete
    },
    data() {
      return {
        result: '',
        props: ''
      }
    },
    methods: {

      search(input) {
        return new Promise(resolve => {
          const url = `users?q=${(input)}&include=position,avatar_file`;

          if (input.length < 1) {
            return resolve([])
          }

          HTTP.get(url)
            .then(response => resolve(response.data.data))
            })
        },

      getResultValue(result) {
        return result.first_name
      },

      handleSubmit(result)  {
        this.$emit('input', result);
        window.console.log(`сюда зырь ${result.id}`);
        this.$router.push({name: 'user', params: {userId: result.id}});
      }
    }
  }
</script>
<style>

    .autocomplete-result-list{
        color: black
    }
</style>
<style scoped>
    img {
        height: auto;
        max-width: 2.5rem;
        margin-right: 1rem;
    }

</style>