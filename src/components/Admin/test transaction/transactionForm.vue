<template>
        <div class="send-wrapper d-flex">
            <user-search-input @pickedUser="user = $event"></user-search-input>
            <amount-icon></amount-icon>
            <cennosti-icon></cennosti-icon>
        </div>
</template>
<script>
    import UserSearchInput from '../../transactionForm/user-search-input/UserSearchInput'
    import amountIcon from '../../transactionForm/iconDropdownAmount'
    import cennostiIcon from '../../transactionForm/iconDropdownValues'

    export default {
        components: {
            UserSearchInput,
            amountIcon,
            cennostiIcon
        }
    }
</script>
<style>
</style>
