import { useEffect, useState } from "react";
import { api } from "../services/api";
import { User } from "../types/user";
import { toast } from "react-toastify";

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      const { data } = await api.get("/users");
      setUsers(data);
    } catch {
      toast.error("Erro ao carregar usuarios");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    refetch: fetchUsers,
  };
}