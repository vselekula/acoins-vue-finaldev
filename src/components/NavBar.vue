<template>
    <div class="main-navbar">
        <b-navbar toggleable="md" type="light" variant="light">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">Avito+</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                        <v-autocomplete 
                            :items="items" 
                            v-model="item" 
                            :get-label="getLabel" 
                            :min-len="0" 
                            @update-items="update"
                            :component-item="userlist" 
                            @item-selected="itemSelected" 
                            @item-clicked="itemClicked"
                            :input-attrs="{name: 'input-test', id: 'v-my-autocomplete', placeholder: 'Кому спасибо?'}">
                        </v-autocomplete>
                        <b-form-select v-model="selectedAmount" :options="amount" size="sm" class="amount mr-2" />
                        <b-form-select v-model="selectedCennost" :options="cennosti" size="sm" class="title mr-2" />
                        <b-button size="sm" v-b-modal.modallg variant="primary">Спасибо</b-button>
                    </b-nav-form>
                </b-navbar-nav>
            </b-collapse>
            <b-modal id="modallg" size="lg" title="Hej!">
                    {{ selectedAmount }}
                    {{ selectedCennost }}
            </b-modal>
        </b-navbar>
    </div>
</template>
<script>
import userlist from './userlist.vue'
import People from '../data/People.js'
import Cennosti from '../data/cennosti.js'
import Amounts from '../data/amounts.js'
import Autocomplete from 'v-autocomplete'

export default {
    components: {
    'v-autocomplete': Autocomplete
    },
    methods: {
    getLabel (item) {
        return item.name;
    },
    // getAmount (amount) {
    //     return amount.value;
    // },
    update (text) {
      this.items = People.filter((item) => {
        let re = new RegExp(text, "i");
        return re.test(item.name) || re.test(item.mail);
      })
    }
  },
  data () {
    return {
      selectedCennost: null,
      cennosti: Cennosti,
      selectedAmount: null,
      amount: Amounts,
      itemsApi: [],
      item: '',
      items: [],
      userlist: userlist
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.card-wrapper {
  background-color: #eee;
}
h1 {
  color: #42b983;
}
.title{
 width: 100px;   
}
</style>
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
    z-index 10
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

