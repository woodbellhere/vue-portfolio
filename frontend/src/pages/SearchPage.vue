<template>
  <div>
    <h2 class="title">搜索结果: {{ term }}</h2>
    <PostList>
      <PostItem v-for="post in searchResult" :post="post" />
    </PostList>
    <!-- <PostDetails /> -->
    <!-- <PostUpload></PostUpload> -->
  </div>
</template>

<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";

import { computed } from "vue";
import { useStore } from "vuex";
import { useRoute } from "vue-router";

const store = useStore();
const router = useRoute();
const searchResult = computed(() => {
  store.state.post.searchResult;
});
const term = computed(() => router.params.term);
</script>

<style scoped>
.title {
  font-weight: 600;
  font-size: 24px;
  margin-bottom: 44px;
}
</style>
