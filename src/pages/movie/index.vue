<template>
  <div class="root">
    这是movie页面
  </div>
</template>

<script>
  import { getMovieShow } from '../../fetchs/movie/index.js'

  export default {
    name: 'movie',
    data() {
      return {
        movieShow: {}
      }
    },
    created() {
      getMovieShow({
          success: (res) => {
            console.log(res);
          }
      })
    }
  }
</script>
