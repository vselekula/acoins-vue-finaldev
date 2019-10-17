<template>
    <div class=" purchase-wrapper mb-4 px-2">
        <div class="col d-flex flex-column align-self-center">
            <div class="text-muted px-1">
                {{ purchase.created_at.substring(5, 10).replace("-", ".") }}
            </div>
            <div class="text-muted px-3">
                {{purchase.id}}
            </div>
        </div>
        <div class=" d-flex align-items-center profile">
            <div class="d-flex flex-column">
                <b-img-lazy v-if="'image_file' in purchase.relations.good.data.relations"
                            :src="'http://192.168.99.100:8000' + purchase.relations.good.data.relations.image_file.data.full_path"
                            rounded="circle" blank blank-color="#fff" alt="left img"
                            class="rounded-circle good-img"/>
            </div>
            <div class="col">
                <div class="mb-4">
                    <div class="user_firstName"><b>{{ purchase.relations.good.data.name }}</b>
                    </div>
                    <div class="text-muted"> {{ purchase.relations.user.data.first_name }} {{
                        purchase.relations.user.data.last_name }}
                    </div>
                </div>
            </div>
            <div>
                <b-dropdown id="dropdown-buttons"
                            :text="purchase.status === 'ready' ? 'выполнена' : purchase.status === 'in_work' ? 'в работе' : 'новый'"
                            :variant="purchase.status === 'ready' ? 'success' : purchase.status === 'in_work' ? 'primary' : 'secondary'"
                            class="m-2">
                    <b-dropdown-item-button
                            @click="changePurchaseStatus(purchase.id, status.value)"
                            v-for="status in statuses"
                            :key="status.id"
                            :variant="status.variant">{{status.text}}>
                    </b-dropdown-item-button>
                </b-dropdown>
            </div>
        </div>
    </div>
</template>
<script>
  import statuses from "./statuses"
  import {sendPatchRequest} from "../../../api/request";

  export default {
    components: {},
    props: {
      purchase: {
        required: true
      }
    },
    data() {
      return {
        statuses: statuses,
      }
    },
    methods: {
      changePurchaseStatus(purchaseId, newStatus) {
        window.console.log(newStatus);
        return sendPatchRequest('purchases/' + purchaseId, {status: newStatus})
          .then(resp => {
            window.console.log(resp);
            this.$emit('changeStatus', resp);
          })
      }
    }
  }
</script>

<style scoped>
    .user_firstName {
        cursor: pointer;
    }


    .good-img {
        width: 100px;
        height: 100px;
    }

    .purchase-wrapper {
        height: fit-content;
        position: relative;
        display: flex;
        box-shadow: 0 5px 50px -4px rgba(0, 64, 128, 0.2);
        margin-bottom: 20px;
        background-color: white;
        border-radius: 10px;
    }

    .dropdown-toggle::after{
        visibility: visible !important;
    }

    .profile {
        width: 100%;
        color: black
    }
</style>