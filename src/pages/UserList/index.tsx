import { CardUser } from "./components/CardUser";
import { Container } from "../../components/Container";
import { Loading } from "../../components/Loading";
import { useEffect, useState } from "react";
import { useUsersContext } from "../../context/UsersContext";

export function UserList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { users, loading } = useUsersContext();

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(debouncedSearch.toLowerCase()),
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <p className="font-bold text-lg">Lista de Usuários</p>
      <div className="flex mb-4">
        <input
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      <div>
        {filteredUsers.map((user) => (
          <CardUser
            key={user.id}
            id={user.id}
            name={user.name}
            email={user.email}
            city={user.address?.city}
            phone={user.phone}
          />
        ))}
      </div>
    </Container>
  );
}
