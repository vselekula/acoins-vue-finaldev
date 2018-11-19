<template>
<div class="top_sended">
  <b-table striped hover :items="items" :fields="fields" :sort-by.sync="sortBy"></b-table>
</div>
</template>

<script>

import People from '../../../data/People.js'

export default {
  data () {
    return {
        sortBy: 'total_sended',
        fields: [
        {
          key: 'name',
          label: 'Имя',
          sortable: true
        },
        {
          key: 'total_recieved',
          label: 'Получил',
          sortable: true
        },
        {
          key: 'total_sended',
          label: 'Отдал',
          sortable: true,
        }
      ],
      items: People,
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