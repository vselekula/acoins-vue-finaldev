<template>
    <div>
        <!--<NavBar></NavBar>-->

        <!--<sideBar/>-->

        <b-card no-body class="col-6 ml-auto mr-auto">
            <b-tabs pills card>
                <b-tab title="+ Users" active>
                    <userList/>
                </b-tab>
                <b-tab title="Money">
                    <initiate-button></initiate-button>
                </b-tab>
                <b-tab title="Shop">
                    <shoplist></shoplist>
                </b-tab>
                <b-tab title="transactionItem">
                    <transactionList></transactionList>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
    import UserList from "./UserList";
    import initiateButton from '../tabs/wallposts/initiateNewTransaction';
    // import NavBar from "../NavBar"
    import Shoplist from "./shoplist";
    import transactionList from "./test transaction/wallposts-listTest";
    // import SideBar from "./SideBar";

    export default {
        name: "mainAdmin",
        components: {
            // SideBar,
            Shoplist,
            UserList,
            initiateButton,
            // NavBar,
            transactionList
        }
    }
</script>

