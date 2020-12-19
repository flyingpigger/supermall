<template>
  <div class="recommend">
    <div v-for="(item, index) in recommends" :key="index">
      <a :href="item.link" class="recommend-item">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "HomeRecommendView",
    props: {
      recommends: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>

<style scoped>
  .recommend {
    display: flex;
    justify-content: space-around;
    width: 100%;
    text-align: center;
    font-size: small;

    padding: 10px 0 20px;
    border-bottom: 8px solid #eee;
  }
  .recommend-item img {
    width: 90%;
  }
</style>