import { api } from "./api";
import { User } from "../types/user";

export async function getUsers() {
  const { data } = await api.get("/users");
  return data;
}

export async function updateUser(id: string | number, user: Partial<User>) {
  const { data } = await api.put(`/users/${id}`, user);
  return data;
}

export async function deleteUser(id: number) {
  await api.delete(`/users/${id}`);
}
