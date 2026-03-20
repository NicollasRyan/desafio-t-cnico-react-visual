import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/user";
import { getUsers, updateUser } from "../services/userService";

type UsersContextType = {
  users: User[];
  loading: boolean;
  addUser: (user: User) => Promise<void>;
  editUser: (id: string | number, user: User) => Promise<void>;
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

  async function addUser(user: User) {
    const newUser: User = {
      ...user,
      id: crypto.randomUUID(),
      isLocal: true,
    };

    setUsers((prev) => [...prev, newUser]);
  }

  async function editUser(id: string | number, data: User) {
    const user = users.find((u) => String(u.id) === String(id));

    if (!user) return;

    if (user.isLocal) {
      setUsers((prev) =>
        prev.map((u) =>
          String(u.id) === String(id) ? { ...u, ...data } : u
        )
      );
      return;
    }
    
    const updated = await updateUser(Number(id), data);

    setUsers((prev) =>
      prev.map((u) =>
        String(u.id) === String(id) ? { ...u, ...updated } : u
      )
    );
  }

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <UsersContext.Provider value={{ users, loading, addUser, editUser }}>
      {children}
    </UsersContext.Provider>
  );
}

export function useUsersContext() {
  return useContext(UsersContext);
}
