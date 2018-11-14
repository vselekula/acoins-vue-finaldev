<template>
  <b-table striped hover :items="items" :fields="fields" :sort-by.sync="sortBy"></b-table>
</template>

<script>

import People from '../../../data/People.js'

export default {
  data () {
    return {
        sortBy: 'total_recieved',
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
