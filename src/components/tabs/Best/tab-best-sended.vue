<template>
<div class="top_sended">
  <b-table v-if="items !== null" striped hover :items="items" :fields="fields" :sort-by.sync="sortBy" :sort-direction="sortDirection"> </b-table>
</div>
</template>

<script>
  import {HTTP} from '../../../data/common'

export default {
  mounted: function () {

    HTTP.get('tops/donators?include=user')
            .then(response => {
              this.items = response.data.data;
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
          label: 'Отдал',
          sortable: true,
        }
      ],
      items: null,
      sortDirection: 'desc'
    }
  }
}
</script>
<style>
  .top_sended {
    box-shadow: 0 5px 40px -5px rgba(0, 64, 128, .2);
    border-radius: 10px;
    overflow: hidden
  }
</style>