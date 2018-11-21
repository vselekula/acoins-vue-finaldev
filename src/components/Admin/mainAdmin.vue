<template>
    <b-card no-body class="col-6 ml-auto mr-auto">
        <b-tabs pills card>
            <b-tab title="+ Users" active>
                <userList/>
            </b-tab>
            <b-tab title="Money">
                Tab Contents 2
            </b-tab>
        </b-tabs>
    </b-card>
</template>

<script>
    import UserList from "./UserList";

    export default {
        name: "mainAdmin",
        components: {
            UserList
        }
    }
</script>

