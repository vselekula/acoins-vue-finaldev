<template>
    <div class="send-wrapper">
        <user-search-input></user-search-input>
        <amount-dropdown></amount-dropdown>
        <cennost-dropdown></cennost-dropdown>
        <b-button size="sm" v-b-modal.modallg variant="primary">Спасибо</b-button>
        <b-modal id="modallg" size="lg" title="Напиши сообщение коллеге!"></b-modal>
    </div>
</template>
<script>

import UserSearchInput from './UserSearchInput.vue'
import Autocomplete from 'v-autocomplete'
import AmountDropdown from './AmountDropdown.vue'
import CennostDropdown from './CennostDropdown.vue'

export default {
    components: {
    'v-autocomplete': Autocomplete,
    UserSearchInput,
    AmountDropdown,
    CennostDropdown,
    },
}
</script>
<style>
</style>
