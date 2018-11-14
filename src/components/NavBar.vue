<template>
    <div class="main-navbar col-6 ml-auto mr-auto">
        <b-navbar toggleable="md" type="light" variant="light">
            <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>
            <b-navbar-brand href="#">Avito+</b-navbar-brand>
            <b-collapse is-nav id="nav_collapse">
                <b-navbar-nav class="ml-auto">
                    <b-nav-form>
                      <SendMoneyTmpl></SendMoneyTmpl> 
                    </b-nav-form>
                   
                </b-navbar-nav>
            </b-collapse>
        </b-navbar>
    </div>
</template>
<script>
import Autocomplete from "v-autocomplete";
import SendMoneyTmpl from "./transactionForm/transactionForm";

export default {
  components: {
    "v-autocomplete": Autocomplete,
    SendMoneyTmpl
  }
};


</script>

<style scoped>
.card-wrapper {
  background-color: #eee;
}
h1 {
  color: #42b983;
}
.title {
  width: 100px;
}
</style>
