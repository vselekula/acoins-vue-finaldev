<template>
    <div>
        <at at="@" :members="members" name-key="mail" v-model="inputs">
            <at at="#" :members="values" name-key="value">
                <at at="$" :members="amounts" name-key="text">
                    <div class="editor" contenteditable ></div>
                </at>
            </at>
        </at>
        <button @click="confirm">
            ff
        </button>
    </div>

</template>

<script>
    // import AtTa from 'vue-at/dist/vue-at-textarea'
    import At from 'vue-at'
    import users from '../../../data/People'
    import values from '../../../data/cennosti'
    import amounts from '../../../data/amounts'

    export default {
        name: "textareaWithAllYouNeedToSendMoney",
        components: {At},
        data() {
            return {
                inputs: '',
                members: users,
                values: values,
                item: "",
                amounts: amounts
            }
        },
            methods: {
                confirm() {
                    // let firstHash = (this.inputs.match(/#/).index);
                    // let firstAt = (this.inputs.match(/@/).index);
                    // let hashTagText = this.inputs.slice(firstHash, i.indexOf(' '));
                    // window.console.log(hashTagText);
                    //
                    // window.console.log('первый хэштег ' + firstHash);
                    // window.console.log('первая собачка на ' + firstAt)
                    // let firstAt = this.inputs.match()
                    // this.item = this.inputs.split(' ');
                }
                // handleData () {
                //     var test_str =
                //     var start_pos = test_str.indexOf('|') + 1;
                //     var end_pos = test_str.indexOf('|',start_pos);
                //     var text_to_get = test_str.substring(start_pos,end_pos)
                //     alert(text_to_get);
                // }
            }
    }
</script>

<style scoped>

</style>