import { useForm } from "react-hook-form";
import { Container } from "../../components/Container";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useUsersContext } from "../../context/UsersContext";
import { useEffect } from "react";
import { AppError } from "../../errors/AppError";

export function UserForm() {
  const { addUser, editUser, users } = useUsersContext();
  const { handleSubmit, register, setValue } = useForm();
  const { id } = useParams();
  const push = useNavigate();

  useEffect(() => {
    if (id && users?.length) {
      const user = users.find((u) => String(u.id) === String(id));
      if (user) {
        setValue("name", user.name);
        setValue("email", user.email);
        setValue("phone", user.phone);
        setValue("city", user?.address?.city || "");
      }
    }
  }, [id, setValue, users]);

  const onSubmit = async (data: any) => {
    try {
      if (id) {
        const formattedData = {
          ...data,
          address: {
            city: data.city,
          },
        };

        await editUser(id, formattedData);
      } else {
        const formattedData = {
          ...data,
          id: crypto.randomUUID(),
          isLocal: true,
          address: {
            city: data.city,
          },
        };

        await addUser(formattedData);
      }

      push("/");
    } catch (error) {
      if (error instanceof AppError) {
        alert(error.message);
      } else {
        alert("Erro inesperado");
      }
    }
  };

  return (
    <Container>
      <div className="flex items-center gap-4">
        <button
          onClick={() => push("/")}
          className="text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <ArrowLeft />
        </button>
        <h2 className="text-lg font-semibold text-gray-800">
          {id ? "Editar" : "Cadastrar"} Usuário
        </h2>
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid grid-cols-2 gap-4 bg-white border border-gray-200 p-6 mt-4 rounded-lg shadow-sm"
      >
        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-bold">Nome</label>
          <input
            type="text"
            placeholder="Digite o nome"
            {...register("name", { required: true })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-bold">Email</label>
          <input
            type="email"
            placeholder="Digite o email"
            {...register("email", { required: true })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-bold">Telefone</label>
          <input
            type="tel"
            placeholder="Digite o telefone"
            {...register("phone")}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-sm text-gray-600 font-bold">Cidade</label>
          <input
            type="text"
            placeholder="Digite a cidade"
            {...register("city", { required: true })}
            className="border border-gray-300 rounded-md px-3 py-2 text-sm transition-all focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="col-span-2 flex justify-end mt-2 gap-2">
          <button
            type="button"
            onClick={() => push("/")}
            className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Salvar
          </button>
        </div>
      </form>
    </Container>
  );
}
