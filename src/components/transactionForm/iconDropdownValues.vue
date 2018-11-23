<template>
    <div>
        <b-dropdown v-model="selectedValue"  variant="link" size="lg" no-caret class="dropdownValue">

            <template slot="button-content">
                <svg version="1.1"
                     xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                     xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/"
                     x="0px" y="0px" width="30px" height="30px"  viewBox="0 0 271 271"
                     xml:space="preserve">
                <path fill="#eee" d="M251,60h-24.9l7-36.2c2.1-10.8-5-21.3-15.8-23.5c-10.8-2.1-21.3,5-23.5,15.8L185.3,60h-70.2l7-36.2
    c2.1-10.8-5-21.3-15.8-23.5C95.5-1.7,85,5.3,82.9,16.2L74.3,60H41.6c-11,0-20,9-20,20s9,20,20,20h24.9l-13.8,71H20c-11,0-20,9-20,20
    s9,20,20,20h24.9l-7,36.2c-2.1,10.8,5,21.3,15.8,23.5c10.8,2.1,21.3-5,23.5-15.8l8.5-43.8h70.2l-7,36.2c-2.1,10.8,5,21.3,15.8,23.5
    c10.8,2.1,21.3-5,23.5-15.8l8.5-43.8h32.7c11,0,20-9,20-20s-9-20-20-20h-24.9l13.8-71H251c11,0,20-9,20-20S262,60,251,60z
    M163.7,171H93.5l13.8-71h70.2L163.7,171z"/>
                </svg>
                <span class="sr-only">Ценность</span>
            </template>
            <b-dropdown-item-button @click="selectedValue = cennost" :value="cennost.value" v-for="cennost in values"
                                    :key="cennost.value">
                {{ cennost.value }}
            </b-dropdown-item-button>
        </b-dropdown>
    </div>
</template>
<script>
    // import DropdownList from "./DropdownList";
    import values from '../../data/cennosti'


    export default {
        // components: {DropdownList},
        data() {
            return {
                values: values,
                cennost: '',
                selectedValue: '',
            }
        }

    }
</script>
<style>
    .dropdown-menu {
        border: none;
        padding: 10px;
        width: fit-content;
        box-shadow: 0 0px 40px -5px rgba(0,64,128,.2);
    }
    .dropdownValue button{
        padding: 0;
    }
    .dropdownValue:hover button svg path{
        fill: #007bff;
    }

</style>