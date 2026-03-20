import { api } from "./api";
import { User } from "../types/user";

export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function updateUser(id: string | number, user: User) {
  const { data } = await api.put(`/users/${id}`, user);
  return data;
}
