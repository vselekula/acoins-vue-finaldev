<template>
    <b-card no-body class="col-6 ml-auto mr-auto">
        <b-tabs pills card>
            <b-tab title="+ Users" active>
                <userList/>
            </b-tab>
            <b-tab title="Money">
                <initiate-button></initiate-button>
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
    import UserList from "./UserList";
    import initiateButton from '../tabs/wallposts/initiateNewTransaction';

    export default {
        name: "mainAdmin",
        components: {
            UserList,
            initiateButton
        }
    }
</script>

