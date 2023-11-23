import { getJwtToken } from "./auth";

export async function uploadFile(file) {
  const formData = new FormData();
  formData.append("files", file);

  const response = await fetch("/api/upload", {
    method: "POST",
    body: formData,
    headers: {
      authorization: `Bearer ${getJwtToken()}`,
    },
  });

  const result = await response.json();
  // 故意限制一下只能上传一个文件
  return result[0].url;
}
