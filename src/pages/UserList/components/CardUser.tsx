import { CircleUser, Pencil, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useUsersContext } from "../../../context/UsersContext";

export function CardUser({
  id,
  name,
  email,
  phone,
  city,
}: {
  id: string | number;
  name: string;
  email: string;
  phone: string;
  city: string;
}) {
  const navigate = useNavigate();
  const { deleteUserById } = useUsersContext();

  const handleDelete = async () => {
    const confirmDelete = window.confirm("Tem certeza que deseja excluir?");

    if (!confirmDelete) return;

    try {
      await deleteUserById(id);
      toast.success("Usuário removido com sucesso!");
    } catch {
      toast.error("Erro ao remover usuário");
    }
  };

  return (
    <div className="border-b border-gray-300 p-4">
      <div className="grid grid-cols-1 gap-3 md:grid-cols-5 md:items-center">
        <div className="flex gap-2 items-center min-w-0">
        <CircleUser size={24} />
          <p className="text-sm truncate">{name}</p>
        </div>
        <p className="text-sm break-all">{email}</p>
        <p className="text-sm">{phone}</p>
        <p className="text-sm">{city}</p>
        <div className="flex flex-col sm:flex-row gap-2 items-stretch sm:items-center">
          <button
            className="flex items-center justify-center gap-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
            onClick={() => navigate(`/edit/${id}`)}
          >
            Editar
            <Pencil size={18} />
          </button>
          <button
            className="flex items-center justify-center gap-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-2 rounded-md text-sm transition-colors"
            onClick={handleDelete}
          >
            Deletar
            <Trash size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
