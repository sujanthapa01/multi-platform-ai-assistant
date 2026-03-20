const api = "http://localhost:3000/api/auth";
const PostUser = async (data: any, path: string) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);
  headers.append("Content-Type", "application/json");
  const res = await fetch(`${api}/api/auth/${path}`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(data),
  });
  return res.json();
};
const GetUser = async (path: string) => {
  const token = localStorage.getItem("token");
  if (!token) return;
  const headers = new Headers();
  headers.append("Authorization", `Bearer ${token}`);

  const res = await fetch(`${api}/api/auth/${path}`, {
    method: "GET",
    headers: headers,
  });
  return res.json();
};
