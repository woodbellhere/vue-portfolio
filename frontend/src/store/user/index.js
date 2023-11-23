import { changeUser } from "../../apis/user";
import { getUser, login, logout, register } from "../../apis/auth";

export const user = {
  state() {
    return {
      user: getUser() || {},
    };
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
  },
  actions: {
    // 不可以和导入函数同名，不然循环调用
    async registerUser({ commit }, { email, username, password }) {
      const user = await register(email, username, password);
      commit("setUser", user);
    },
    async loginUser({ commit }, { email, password }) {
      const user = await login(email, password);
      commit("setUser", user);
    },
    async updateUser({ commit }, user) {
      const updatedUser = await changeUser(user);
      commit("setUser", updatedUser);
    },
    async logoutUser({ commit }) {
      logout();
      commit("setUser", {});
    },
  },
};
