<template>
    <div>
        <NavBar></NavBar>
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
    </div>
</template>

<script>
    import UserList from "./UserList";
    import initiateButton from '../tabs/wallposts/initiateNewTransaction';
    import NavBar from "../NavBar"

    export default {
        name: "mainAdmin",
        components: {
            UserList,
            initiateButton,
            NavBar
        }
    }
</script>

