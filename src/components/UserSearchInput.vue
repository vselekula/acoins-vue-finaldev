<template>
  <div class="float-left">
    <v-autocomplete  
    :items="items" v-model="item" :get-label="getLabel" :min-len="0" :component-item="userlist"
    @update-items="update" @input="pickedUser"
    autocomplete="off"
    :input-attrs="{name: 'input-test', id: 'v-my-autocomplete', placeholder: 'Кому спасибо?'}" >
    </v-autocomplete>
    </div>
</template>

<script>
import userlist from './userlist.vue'
import People from '../data/People.js'
import Autocomplete from 'v-autocomplete'

export default {
  name: 'demo',
  components: {'v-autocomplete': Autocomplete},
  data () {
    return {
      itemsApi: [],
      item: '',
      items: [],
      userlist: userlist
    }
  },
  methods: {
    getLabel (item) {
      if (item) {
        return item.name;
        // this.$emit("recieverInfo", 'хуй');
      }
      return ''
    },
    update (text) {
      this.items = People.filter((item) => {
        let re = new RegExp(text, "i");
        if (re.test(item.name) || re.test(item.mail)){
          return item;
        }
      })
    },
    pickedUser () {
      this.$emit('pickedUser', this.item)
    }
    }
  }

</script>
<style lang="stylus">
.v-autocomplete
  margin-right 10px
  .v-autocomplete-input-group
    .v-autocomplete-input
      box-shadow none
      border none
      width 200px
      outline none
      background-color #eee
      padding 5px 10px
    &.v-autocomplete-selected
      .v-autocomplete-input
        background-color #f2fff2
  .v-autocomplete-list
    z-index 1
    width 100%
    text-align left
    border none
    border-top none
    max-height 400px
    overflow-y auto
    border-bottom none
    .v-autocomplete-list-item
      font-size 14px
      cursor pointer
      background-color #fff
      padding 10px
      &:last-child
        border-bottom none
      &:hover
        background-color #eee
      abbr
        opacity 0.8
        font-size 0.8em
        display flex
        font-family sans-serif
pre
  text-align left
  white-space pre-wrap
  background-color #eee
  border 1px solid silver
  padding 20px !important
  border-radius 10px
  font-family monospace !important
.left
  text-align left
.note
  border-left 5px solid #ccc
  padding 10px
</style>
