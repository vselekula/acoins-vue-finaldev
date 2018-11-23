<template>
    <div class="searchResultItemWrapper">
        <img src="item.photo" alt="">
        <span>{{ item.name }}</span>
        <abbr>{{item.description}}</abbr>
    </div>
</template>

<script>
    export default {
        props: {
            item: { required: true },
            searchText: { required: true }
        }
    }
</script>
<style>
    .searchResultItemWrapper{
        z-index: 100
    }

</style>