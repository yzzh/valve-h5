<template>
    <header>
        <h2 class="show-name">{{name}}</h2>
        <span class="show-more">更多</span>
    </header>
</template>

<script>
    export default {
        name: 'section-header',
        props: ['name'],

    }
</script>
