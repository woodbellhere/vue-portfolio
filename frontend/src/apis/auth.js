import { request } from "../utils/request";

export function getJwtToken() {
  return localStorage.getItem("jwtToken");
}

export function setJwtToken(jwt) {
  localStorage.setItem("jwtToken", jwt);
}

export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}

export function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}

export async function register(email, username, password) {
  const result = await request("/api/auth/local/register", {
    method: "POST",
    auth: false,
    body: {
      email,
      username,
      password,
      name: username,
    },
  });
  setJwtToken(result.jwt);
  saveUser(result.user);
  return result.user;
}

export async function login(email, password) {
  const result = await request("/api/auth/local", {
    method: "POST",
    auth: false,
    body: {
      // strapi自己的要求
      identifier: email,
      password,
    },
  });
  setJwtToken(result.jwt);
  saveUser(result.user);
  return result.user;
}

export function logout() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("user");
}

// api都需要处理错误情况，但是先留着，写完核心功能再说
