<template>
    <div></div>
</template>
<script>
  import {mapActions, mapState} from 'vuex'

  export default {
    data() {
      return {
        count: 0
      }
    },
    computed: {
      ...mapState('notifications', [
        'notificationText',
        'notificationTitle',
        'show',
        'variant',
      ]),
    },
    watch: {
      show(nV, oV) {
        window.console.log(`новое значени show: ${nV}, старое ${oV}`);
        if (nV === true && nV !== oV) {
          this.popToast()
        }
      }
    },
    methods: {
      ...mapActions('notifications', [
        'hideMessage', 'showSuccessMessage','showErrorMessage'
      ]),
      popToast() {
        const h = this.$createElement;
        this.count++;
        const vNodesMsg = h(
          'p',
          {class: ['text-left', 'mb-0']},
          [
            // h('strong', {}, 'toast'),
            ` ${this.notificationText} `
          ]
        );
        // Create the title
        const vNodesTitle = h(
          'div',
          {class: ['d-flex', 'flex-grow-1', 'align-items-baseline', 'mr-2']},
          [
            h('strong', {class: 'mr-2'}, this.notificationTitle),
            // h('small', { class: 'ml-auto text-italics' }, '5 minutes ago')
          ]
        );
        this.$bvToast.toast([vNodesMsg], {
          title: [vNodesTitle],
          solid: true,
          variant: this.variant
        })
      }
    }
  }
</script>

<style>
    .notificationContainer {
        position: absolute;
        top: 0;
        padding: 0 20%;
    }
</style>