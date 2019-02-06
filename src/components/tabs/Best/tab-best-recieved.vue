<template>
  <div v-if="items !== null" class="top_recieved">
  <b-table striped hover :items="items" :fields="fields" :sort-by="sortBy" :sort-direction="sortDirection"></b-table>
  </div>
</template>

<script>

import {HTTP} from '../../../data/common'
export default {
  mounted: function () {
    HTTP.get('tops/receivers?include=user')
            .then(response => {
              this.items = response.data.data
            })
  },
  data () {
    return {
        sortBy: 'sum',
        fields: [
        {
          key: 'relations.user.data.first_name',
          label: 'Имя',
          sortable: true
        },
        {
          key: 'sum',
          label: 'Получил',
          sortable: true
        },
      ],
      items: null,
      sortDirection: 'desc'
    }
  }
}
</script>
<style>
  .top_recieved {
    box-shadow: 0 5px 40px -5px rgba(0, 64, 128, .2);
    border-radius: 10px;
    overflow: hidden
  }
</style>