import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import {
  deleteUser as deleteUserService,
  getUsers,
  updateUser,
} from "../services/userService";

type UsersContextType = {
  users: User[];
  loading: boolean;
  addUser: (user: Omit<User, "id">) => Promise<void>;
  editUser: (id: string | number, user: Partial<User>) => Promise<void>;
  deleteUserById: (id: string | number) => Promise<void>;
};

const UsersContext = createContext({} as UsersContextType);

export function UsersProvider({ children }: any) {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchUsers() {
    try {
      const data = await getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  }

  async function addUser(user: Omit<User, "id">) {
    const newUser: User = {
      ...user,
      id: crypto.randomUUID(),
      isLocal: true,
    };

    setUsers((prev) => [...prev, newUser]);
  }

  async function editUser(id: string | number, data: Partial<User>) {
    const user = users.find((u) => String(u.id) === String(id));

    if (!user) return;

    if (user.isLocal) {
      setUsers((prev) =>
        prev.map((u) => (String(u.id) === String(id) ? { ...u, ...data } : u)),
      );
      return;
    }

    const updated = await updateUser(Number(id), data);

    setUsers((prev) =>
      prev.map((u) =>
        String(u.id) === String(id)
          ? {
              ...u,
              ...updated,
              address: {
                ...(u.address || {}),
                ...(updated.address || {}),
              },
            }
          : u,
      ),
    );
  }

  async function deleteUserById(id: string | number) {
    const user = users.find((u) => String(u.id) === String(id));

    if (!user) return;

    if (user.isLocal) {
      setUsers((prev) => prev.filter((u) => String(u.id) !== String(id)));
      return;
    }

    await deleteUserService(Number(id));

    setUsers((prev) => prev.filter((u) => String(u.id) !== String(id)));
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider
      value={{
        users,
        loading,
        addUser,
        editUser,
        deleteUserById,
      }}
    >
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(UsersContext);
}
