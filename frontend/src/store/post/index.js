import { createPost, loadPosts, likePost, favorPost } from "../../apis/post";

export const post = {
  state() {
    return {
      list: [],
      currentID: null,
      searchResult: [],
    };
  },

  mutations: {
    // 帖子放到前台准备渲染
    initializePosts(state, posts) {
      state.list = posts;
    },
    // 还挺正常的点赞数增减
    toggleLike(state, { id, isLike }) {
      // state文件一多就开始绕了
      const post = state.list.find((post) => post.id === id);
      if (isLike) {
        post.liked_bies = (post.liked_bies || 0) + 1;
      } else {
        post.liked_bies--;
      }
      // 点亮点赞的红心
      post.likedByMe = isLike;
    },
    // 也挺正常的收藏增减
    toggleFavor(state, { id, isFavor }) {
      // state文件一多就开始绕了
      const post = state.list.find((post) => post.id === id);
      if (isFavor) {
        post.favored_bies = (post.favored_bies || 0) + 1;
      } else {
        post.favored_bies--;
      }
      // 点亮推荐的红心
      post.favoredByMe = isFavor;
    },
    // 行吧，反正别忘记人家就是要求状态修改通过mutation来
    setCurrentId(state, id) {
      state.currentID = id;
    },
    setPostsSearchResult(state, posts) {
      state.searchResult = posts;
    },
  },

  actions: {
    // 上传/发布信息
    async uploadPost({ commit, dispatch }, { image, description }) {
      // 生成帖子存到后台
      await createPost(image, description);
      // 触发获取帖子
      dispatch("loadAllPosts");
      // 上传并关闭弹窗
      commit("changeShowPostUpload", false);
    },
    // 获取当前帖子准备渲染
    async loadAllPosts({ commit }) {
      // 就是从后台取出帖子
      const posts = await loadPosts();
      // 触发加载
      commit("initializePosts", posts);
    },
    // 对于个人用户来说，确实只是喜欢收藏与否，但对于应用来说就是增减了
    async toggleLike({ commit }, id) {
      const isLike = await likePost(id);
      // 根据帖子id来做增减
      commit("toggleLike", { id, isLike });
    },
    async toggleFavor({ commit }, id) {
      const isFavor = await favorPost(id);
      // 根据帖子id来做增减
      commit("toggleFavor", { id, isFavor });
    },
    // show和hide一组，共同控制currentID以及下面的getter
    async showPostDetails({ commit, dispatch }, id) {
      commit("setCurrentID", id);
      // 传递一下id给加载函数用
      dispatch("loadAllComments", id);
      commit("changeShowPostDetails", true);
    },
    async hidePostDetails({ commit }) {
      commit("setCurrentID", null);
      commit("changeShowPostDetails", false);
    },
    async searchPosts({ commit }, term) {
      const posts = await loadPosts("filter[description][$contains]=" + term);
      commit("setPostsSearchResult", posts);
    },
  },

  getters: {
    // 实时获取当前帖子的完整信息
    postDetails(state) {
      return state.list.find((post) => post.id === state.currentID);
    },
  },
};
