<template>
    <div>
        <b-dropdown class="dropdownSum" v-model="selectedSum" variant="link" size="lg" no-caret>

            <template slot="button-content">
                <svg  version="1.1"
                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                     x="0px" y="0px" width="30px" height="30px" viewBox="0 0 289.4 254.3"
                     xml:space="preserve">
<defs>
</defs>
                    <path class="dropdownIcon" fill="#eee" d="M145,254.3c-10.1,0-20.1-3.6-28.1-10.9c-13.1-11.8-38.8-35.1-85.3-77.4l-3.2-2.9c-0.2-0.2-0.5-0.4-0.7-0.7
	C9.8,144.5,0,120.7,0,95.3c0-25.2,9.8-49.1,27.6-67.2c0,0,0,0,0,0C49.3,6,73.4-3.1,99.3,1c15,2.4,30,9.2,45.4,20.7
	C160,10.2,175,3.4,190,1c25.9-4.2,50.1,4.9,71.9,27.1c17.8,18,27.6,41.8,27.6,67.1c0,25.4-9.8,49.2-27.7,67.2
	c-0.2,0.2-0.4,0.4-0.7,0.7c-37.7,34.6-61.1,55.9-76.6,70c-4.5,4.1-8.2,7.5-11.3,10.3C165.2,250.6,155.1,254.3,145,254.3z
	 M55.7,133.8l2.8,2.5c46.5,42.3,72.1,65.5,85.2,77.3c0.8,0.7,1.9,0.7,2.6,0.1c3-2.8,6.8-6.2,11.3-10.3
	c15.4-14.1,38.7-35.3,76.2-69.6c21-21.5,20.9-56.2-0.4-77.7c-16.8-17-37.5-28-75.2,6.4c-7.6,7-19.3,7-26.9,0
	c-37.8-34.3-58.5-23.4-75.2-6.5C34.9,77.8,34.7,112.5,55.7,133.8z"/>
</svg>

                <span class="sr-only">Ценность</span>
            </template>
            <b-dropdown-item-button class="dropdownItem" @click="pickedSum($event)" :value="sum.value" v-for="sum in sums" :key="sum.value">
                {{ sum.value }}
            </b-dropdown-item-button>
        </b-dropdown>
    </div>
</template>
<script>
    import sums from '../../data/amounts'


    export default {
        // components: {DropdownList},
        data() {
            return {
                sums: sums,
                sum: '',
                selectedSum: '',
            }
        },
        methods: {
            pickedSum($event){
                this.selectedSum = $event;
            }
        }
    }
</script>
<style>
    .dropdownSum button{
        padding: 0;
    }
    .dropdownSum:hover button svg path{
        fill: #007bff;
    }
</style>