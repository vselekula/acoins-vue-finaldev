<template> 
    <form class="send-wrapper">
        <user-search-input @pickedUser="user = $event"></user-search-input>
        <amount-dropdown @pickedAmount="amount = $event"></amount-dropdown>
        <cennost-dropdown @pickedCennost="cennost = $event"></cennost-dropdown>
        <b-button size="sm" v-b-modal.modallg variant="primary">Спасибо</b-button>
        <b-modal id="modallg" size="lg" title="Напиши сообщение коллеге!">
            <div class="float-left">
                <h2>{{ user.name }}</h2><br>
                <h5>{{ user.position }}</h5> <br>
                {{ user.mail }} <br>
                <img :src="user.photo" alt="" class="rounded-circle">
            </div>
            <div class="float-left">
                {{ amount }} <br>
                {{ cennost }} <br>
            </div>
        </b-modal>
    </form>
</template>
<script>
import UserSearchInput from '../transactionForm/user-search-input/UserSearchInput'
import Autocomplete from 'v-autocomplete'
import AmountDropdown from './AmountDropdown'
import CennostDropdown from './CennostDropdown.vue'

export default {
    components: {
    'v-autocomplete': Autocomplete,
    UserSearchInput,
    AmountDropdown,
    CennostDropdown,
    },
    data(){
        return{
            amount: 'сколько то',
            cennost: 'какая-то ценность',
            user: 'какой-то юзер',
        }
    }
}
</script>
<style>
</style>
