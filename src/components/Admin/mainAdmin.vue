<template>
    <div>
        <b-card no-body class="col-6 ml-auto mr-auto wrapper_admin p-0">
            <b-tabs pills card>
                <b-tab title="+ Users" active>
                    <userList/>
                </b-tab>
                <b-tab title="Shop">
                    <shoplist></shoplist>
                </b-tab>
                <b-tab ref="trans" title="transactionItem" active>
                    <transactionList></transactionList>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
    import UserList from "./UserList";
    import Shoplist from "./shoplist";
    import transactionList from "./transactions/wallposts-listTest";

    export default {
        name: "mainAdmin",
        data() {
            return {
                // temp: this.$refs.trans.localActive,
                temp1: ''
            }
        },
        components: {
            Shoplist,
            UserList,
            transactionList
        }
    }
</script>
<style>
    .wrapper_admin {
        background: transparent;
    }
</style>

