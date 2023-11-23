import { request } from "../utils/request";
import { saveUser, getUser } from "./auth";

export async function changeUser(user) {
  const response = await request(`/api/users/${getUser().id}`, {
    method: "PUT",
    body: user,
  });
  saveUser(response);
  return response;
}
