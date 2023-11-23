import { getJwtToken, getUser } from "./auth";
import { request } from "../utils/request";

// 因为发帖就图文两部分，参数也就图文，发帖给后台存着
export async function createPost(image, description) {
  // 似乎按表单方式交比较省事
  const formData = new FormData();
  formData.append("files.image", image);
  // 其他字段按strapi要统一放在data字段中
  formData.append("data", JSON.stringify({ description }));
  //不能设置content-type，也不能对formdata直接用stringify
  //显然我们已经在请求部分中使用了content-type

  //转而用fetch发送
  await fetch("/api/posts", {
    method: "POST",
    body: formData,
    headers: {
      Authorization: `Bearer ${getJwtToken()}`,
    },
  });
}

// 取出后台持久化的post并准备放到页面上
// filter参数顺便做查询功能
export async function loadPosts(filter = "") {
  // strapi的特定格式，选中所有帖子的所有关联字段，populate就是关联字段
  const response = await request(
    "/api/posts?populate=*" + (filter && `&${filter}`)
  );
  // strapi数据结构嵌套太深，想办法铺平一些有用的
  // 一会换成flatMap试试
  return response.data.map((post) => ({
    id: post?.id,
    ...post?.attributes,
    image: post?.attributes?.image?.data?.[0]?.attributes?.url,
    user: {
      id: post?.attributes?.user?.data?.id,
      ...post?.attributes?.user?.data?.attributes,
    },
  }));
}

export async function loadPostsByMe() {
  return loadPosts(`filter[user][id][$eq]=${getUser().id}`);
}

export async function loadPostsLikedOrFavoredByMe(type = "likes") {
  const response = await request(
    `/api/users/me?populate[${type}][populate][0]=image`
  );
  return response[type].map((post) => ({
    ...post,
    image: post?.image?.[0].url,
  }));
}

// 这俩其实思路就挺简单了，发给相应喜欢/收藏位置完事
export async function likePost(id) {
  const response = await request(`/api/posts/${id}/like`, {
    method: "PUT",
  });
  return response.data;
}

export async function favorPost(id) {
  const response = await request(`/api/posts/${id}/favor`, {
    method: "PUT",
  });
  return response.data;
}
