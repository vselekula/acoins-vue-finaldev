<template>
    <div class="admin_users_wrapper">
        <div class="p-2">
            Фильтры:
            <b-button pill
                      size="sm"
                      v-for="filter in statuses"
                      :key="filter.id"
                      :variant="filter.variant"
                      @click="filterOn(filter.value)">{{filter.text}}
            </b-button>
            <b-button pill
                      v-if="filterTrigger"
                      size="sm"
                      variant="outline-secondary"
                      @click="filterOn">X
            </b-button>
        </div>
        <b-pagination align="center"
                      :total-rows="all_purchases_count"
                      v-model="currentPage"
                      size="sm"
                      :per-page="limit"/>
        <div v-if='loading === true'
             class="text-center">
            <b-spinner variant="primary"
                       label="Text Centered"></b-spinner>
        </div>
        <purchase-item v-for="purchase in all_purchases"
                       @changeStatus="changeStatus"
                       :key="purchase.id"
                       :purchase="purchase"
        ></purchase-item>
        <b-pagination align="center"
                      v-model="currentPage"
                      :total-rows="all_purchases_count"
                      :per-page="limit"
                      size="sm"/>
    </div>
</template>

<script>
  import purchaseItem from './purchaseItem'
  import statuses from "../purchases/statuses"
  import {sendGetRequest} from "../../../api/request";

  export default {

    name: "purchasesList",
    components: {
      purchaseItem,
    },
    data() {
      return {
        currentPage: 1,
        howManyPurchasesGet: 0,
        localOffset: 0,
        searchPurchases: '',
        loading: false,
        statuses: statuses,
        all_purchases: null,
        filterTrigger: false,
        all_purchases_count: null
      }
    },
    props: ['limit', 'offset', 'current'],
    methods: {
      changeStatus(changedPurchase) {
        let i = this.all_purchases.findIndex(obj => obj.id === changedPurchase.data.data.id);
        this.all_purchases[i].status = changedPurchase.data.data.status
      },
      filterOn(status = null) {
        this.loading = true;
        this.filterTrigger = true;
        window.console.log(typeof status);
        return sendGetRequest('purchases?include=user.avatar_file,good.image_file')
          .then(resp => {
            if (typeof status === 'object') {
              window.console.log(resp);
              this.all_purchases = resp.data.data;
              this.loading = false;
            } else {
              this.all_purchases = resp.data.data.filter(obj => obj.status === status);
              this.loading = false;
            }
          })
      }
    },
    watch: {
      current(nV) {
        if (nV === 3) {
          this.loading = true;
          this.howManyPurchasesGet = this.limit;
          return sendGetRequest('purchases?include=good.image_file,user')
            .then(resp => {
              this.all_purchases = resp.data.data;
              this.all_purchases_count = resp.data.meta.count;
              this.loading = false;
            });
        }
      },
      currentPage(newValue) {
        this.loading = true;
        window.console.log('LocalOffset: ', this.localOffset, 'usersCount: ', this.all_purchases_count, 'howManyPurchasesGet', this.howManyPurchasesGet, newValue);
        if (this.localOffset < this.all_purchases_count) {
          this.localOffset = newValue * this.howManyPurchasesGet - this.howManyPurchasesGet;
          window.console.log('пошел GET!');
          return sendGetRequest(`purchases?include=user.avatar_file,good.image_file&limit=${this.howManyPurchasesGet}&offset=${this.localOffset}`)
            .then((resp)=> {
              this.all_purchases = resp.data.data;
              this.loading = false
            })
        }
      }
    }
  }
</script>
<style lang="stylus">
    .admin_users_wrapper {
        background: transparent
    }

    .searchWrapper {
        background: white
    }

</style>