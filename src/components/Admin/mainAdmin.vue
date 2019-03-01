<template>
    <div>
        <b-card no-body class="container ml-auto mr-auto wrapper_admin">
            <b-tabs ref="tabs" pills card v-model="tabIndex">
                <b-tab ref="tab" title="Пользователи" style="background: white" active>
                    <userList :current="tabIndex" :limit="10" :offset="0" class="px-0"/>
                </b-tab>
                <b-tab title="Магазин" class="px-0">
                    <shoplist :current="tabIndex" class="px-0"></shoplist>
                </b-tab>
                <b-tab ref="trans"  title="Транзакции" active class="px-0">
                    <transactionList :current="tabIndex" :transactionsInOneRequest="10"></transactionList>
                </b-tab>
            </b-tabs>
        </b-card>
    </div>
</template>

<script>
  import UserList from "./users/UserList";
  import Shoplist from "./shoplist";
  import transactionList from "./transactions/wallposts-listTest";

  export default {
    name: "mainAdmin",
    data() {
      return {
        // temp: this.$refs.trans.localActive,
        tabIndex: 1,
        temp1: '',
        isMounted: false
      }
    },
    components: {
      Shoplist,
      UserList,
      transactionList
    },
    // computed: {
    //   tabIs() {
    //     if(!this.isMounted) {
    //       window.console.log ('!!!!', this.$refs.tabs.currentTab)
    //     }
    //   },
    // },
    mounted(){
      this.isMounted = true;
      window.console.log('ref', this.$refs.tab)
    }
  }
</script>
<style>
    .wrapper_admin {
        background: transparent;
    }
    .card-header{
        padding: 10px 0;
    }
</style>

