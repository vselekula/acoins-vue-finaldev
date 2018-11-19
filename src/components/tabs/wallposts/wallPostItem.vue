<template>
    <div class="transaction-item pt-4 mb-4">
            <div class="transaction-item_info mx-4">
                <div class="transactionHeadline row m-1 my-3">
                    <div>
                        <img src="../../../assets/avatars/aklochkova.png" width="50" height="50" alt="..." class="rounded-circle">
                    </div>
                    <div class="amount d-flex flex-grow-1 flex-row ml-3">
                        <div class="d-flex flex-column">
                            <div>
                                <span class="badge badge-pill badge-primary">
                                    <font-awesome-icon icon="heart" size="lg" /> + {{ transaction.sum }}</span>
                            </div>
                            <div class="mt-1">
                                <b>{{ transaction.relations.value.data.name }}</b>
                            </div>
                        </div>
                        <div class="d-flex ml-auto">{{ transaction.created_at }}</div>
                    </div>
                </div> 

                <div class="row m-1 my-3">
                    <b>{{ transaction.relations.from_user.data.first_name }}:</b> {{ transaction.title }}
                </div>
            </div>
            <wall-post-reply v-for="message in messages" :key="message.id" :message="message"></wall-post-reply>
            <div class="add-answer_wrapper">
                <textarea-autosize @focus.native="seen = !seen" @blur.native="seen = !seen" name="" id="add-answer" cols="1" rows="1" :placeholder="placeholder" class="mx-4 mt-2 p-2 message"></textarea-autosize>
                <button v-if="seen" type="button" class="btn btn-primary ml-4 mb-4">Отправить</button>
            </div>
    </div>
</template>
<script>
import WallPostReply from "../wallposts/wallPostReply";

export default {
  components: {
    WallPostReply
  },
  props: {
    transaction: {
      required: true
    }
  },
  data() {
    return {
      messages: [],
      seen: false,
      placeholder: "Добавить комментарий"
    };
  },
  created: function() {
    this.messages = JSON.parse(JSON.stringify(this.transaction.relations.messages.data));
    // this.messages = this.transaction.relations.messages.data.slice()
  }
};
</script>
<style>
.button-send {
  border-radius: 50%;
}
textarea {
  resize: none;
}
textarea:focus {
  outline: none;
}
.transaction-item {
  box-shadow: 0 5px 40px -5px rgba(0, 64, 128, 0.2);
  border-radius: 10px;
}

.amount {
  background-color: white;
}
.answer {
  background-color: #f6f7f9;
}
.add-answer_wrapper {
  background-color: #f6f7f9;
  border-top: solid 1px rgb(220, 220, 220);
  overflow: hidden;
}
#add-answer {
  height: 55px;
  overflow: hidden;
  overflow-wrap: break-word;
  width: 96%;
  border: none;
  background-color: #f6f7f9;
  font-size: 18px;
}
</style>