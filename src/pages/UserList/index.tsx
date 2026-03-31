import { CardUser } from "./components/CardUser";
import { Container } from "../../components/Container";
import { Loading } from "../../components/Loading";
import { useEffect, useState } from "react";
import { useUsersContext } from "../../context/UsersContext";

export function UserList() {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const { users, loading, error, refetchUsers } = useUsersContext();

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
      <h1 className="font-bold text-lg">Lista de Usuários</h1>
      <div className="flex mb-4 mt-3">
        <label htmlFor="search-users" className="sr-only">
          Buscar usuário por nome
        </label>
        <input
          id="search-users"
          type="text"
          placeholder="Buscar por nome..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
      </div>
      {error && (
        <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
          <p className="text-sm text-red-700">{error}</p>
          <button
            type="button"
            onClick={refetchUsers}
            className="mt-2 text-sm text-red-800 underline hover:text-red-900"
          >
            Tentar novamente
          </button>
        </div>
      )}
      {!error && filteredUsers.length === 0 && (
        <div className="rounded-md border border-gray-200 bg-white p-6 text-center">
          <p className="text-sm text-gray-600">
            Nenhum usuário encontrado para a busca informada.
          </p>
        </div>
      )}
      {!error && filteredUsers.length > 0 && (
        <div>
          {[...filteredUsers].reverse().map((user) => (
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
      )}
    </Container>
  );
}
