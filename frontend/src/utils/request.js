import { getJwtToken } from "../apis/auth";

export async function request(
  url,
  { method = "GET", body, headers, auth = true } = {}
) {
  const res = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
      // 简写一下if auth 这种说实话挺方便
      ...(auth && { Authorization: `Bearer ${getJwtToken()}` }),
      ...headers,
    },
    ...(body && { body: JSON.stringify(body) }),
  });
  // if(res.status > 400) {}
  const result = await res.json();
  return result;
}
