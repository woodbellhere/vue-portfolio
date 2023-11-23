import { createStore } from "vuex";

import { user } from "./user";
import { post } from "./post";
import { comment } from "./comment";

// 因为只有两三个主要状态，就不特意搞命名空间了

export const store = createStore({
  state() {
    return {
      // 发布帖子弹窗的显示和隐藏
      showPostUpload: false,
      // 帖子详情的显示和隐藏
      showPostDetails: false,
    };
  },
  mutations: {
    changeShowPostUpload(state, show) {
      state.showPostUpload = show;
    },
    changeShowPostDetails(state, show) {
      state.showPostDetails = show;
    },
  },
  actions: {},
  modules: {
    user,
    post,
    comment,
  },
});
