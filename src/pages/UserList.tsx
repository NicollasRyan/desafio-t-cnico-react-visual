import { useNavigate } from "react-router-dom";
import { CardUser } from "../components/CardUser";
import { Container } from "../components/Container";
import { Loading } from "../components/Loading";
import { useUsersContext } from "../context/UsersContext";

export function UserList() {
  const { users, loading } = useUsersContext();
  const push = useNavigate();

  if (loading) {
    return <Loading />;
  }

  return (
    <Container>
      <div className="flex justify-between items-center gap-4">
        <p className="font-bold text-lg">Lista de Usuários</p>
        <button onClick={() => push("/create")} className="text-sm border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-1 rounded-md transition-colors">Adicionar Novo Usuário</button>
      </div>
      <div className="flex justify-between mt-4">
        <select className="border border-gray-300 rounded-md px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 mt-4">
          <option value="">Ordenar por</option>
          <option value="name">Nome</option>
          <option value="email">Email</option>
          <option value="city">Cidade</option>
        </select>

        <div className="flex flex-col gap-1">
          <input
            type="text"
            placeholder="Pesquisar por nome..."
            className="border border-gray-300 rounded-md px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>
      <div>
        {users.map((user) => (
          <CardUser key={user.id} id={user.id} name={user.name} email={user.email} city={user.address?.city} phone={user.phone} />
        ))}
      </div>
    </Container>
  );
}
