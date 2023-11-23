import { createComment, loadComments } from "../../apis/comment";

export const comment = {
  state() {
    return {
      list: [],
    };
  },
  mutations: {
    increaseCommentCount(state, id) {
      const post = state.list.find((post) => post.id === id);
      post.comments++;
    },
    initializeComments(state, comments) {
      state.list = comments;
    },
  },
  actions: {
    // 创建评论并增加评论计数
    async addComment({ commit, dispatch }, { content, postId }) {
      await createComment(content, postId);
      // 创建评论时重新加载一下评论列表
      dispatch("loadAllComments", postId);
      commit("increaseCommentCount", postId);
    },
    async loadAllComments({ commit }, postId) {
      const comments = await loadComments(postId);
      commit("initializeComments", comments);
    },
  },
};
