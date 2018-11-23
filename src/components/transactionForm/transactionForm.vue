<template>
        <form class="send-wrapper">
            <user-search-input @pickedUser="user = $event"></user-search-input>
            <amount-dropdown @pickedAmount="amount = $event"></amount-dropdown>
            <cennost-dropdown @pickedCennost="cennost = $event"></cennost-dropdown>
            <b-button size="md" v-b-modal.modallg variant="primary">Спасибо</b-button>
        </form>
</template>
<script>
    import UserSearchInput from './user-search-input/UserSearchInput'
    import AmountDropdown from './AmountDropdown'
    import CennostDropdown from './CennostDropdown.vue'

    export default {
        components: {
            UserSearchInput,
            AmountDropdown,
            CennostDropdown,
        }
    }
</script>
<style>
</style>
