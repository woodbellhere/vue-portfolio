<template>
  <div>
    <PostList>
      <PostItem v-for="post in posts" :post="post" :key="post.id" />
    </PostList>
    <PostDetails v-if="showPostDetails" />
    <PostUpload v-if="showPostUpload" />
  </div>
</template>

<script setup>
import PostList from "../components/PostList.vue";
import PostItem from "../components/PostItem.vue";
import PostUpload from "../components/PostUpload.vue";
import PostDetails from "../components/PostDetails.vue";
import { computed, onMounted } from "vue";
import { useStore } from "vuex";

// 发帖弹窗的状态，其实可以画点图展示这个状态怎么流动的
const store = useStore();
const showPostUpload = computed(() => store.state.showPostUpload);
const showPostDetails = computed(() => store.state.showPostDetails);
const posts = computed(() => store.state.post.list);

onMounted(() => {
  store.dispatch("loadAllPosts");
});
</script>

<style scoped></style>
