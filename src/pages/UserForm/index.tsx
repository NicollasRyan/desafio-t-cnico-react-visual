import { useForm } from "react-hook-form";
import { Container } from "../../components/Container";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { useUsersContext } from "../../context/UsersContext";
import { useEffect, useState } from "react";
import { AppError } from "../../errors/AppError";
import { toast } from "react-toastify";
import { FormField } from "./components/FormField";

type FormData = {
  name: string;
  email: string;
  phone: string;
  city: string;
};

export function UserForm() {
  const { addUser, editUser, users } = useUsersContext();
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

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

  function formatUserData(data: FormData) {
    return {
      ...data,
      address: {
        city: data.city,
      },
    };
  }

  const onSubmit = async (data: FormData) => {
    try {
      setLoading(true);
      const formattedData = formatUserData(data);
      if (id) {
        await editUser(id, formattedData);
        toast.success("Usuário Atualizado com sucesso!");
      } else {
        await addUser(formattedData);
        toast.success("Usuário Criado com sucesso!");
      }

      navigate("/");
    } catch (error) {
      if (error instanceof AppError) {
        toast.error(error.message);
      } else {
        toast.error("Erro inesperado");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container>
      <div className="flex items-center gap-4">
        <button
          onClick={() => navigate("/")}
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
        className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white border border-gray-200 p-4 md:p-6 mt-4 rounded-lg shadow-sm"
      >
          <FormField<FormData>
            label="Nome"
            name="name"
            placeholder="Digite o nome"
            register={register}
            error={errors.name}
            rules={{
              required: "Nome é obrigatório",
              minLength: {
                value: 3,
                message: "Nome deve ter no mínimo 3 caracteres",
              },
            }}
          />

          <FormField<FormData>
            label="Email"
            name="email"
            type="email"
            placeholder="Digite o email"
            register={register}
            error={errors.email}
            rules={{
              required: "E-mail é obrigatório",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Digite um e-mail válido",
              },
            }}
          />

          <FormField<FormData>
            label="Telefone"
            name="phone"
            type="tel"
            placeholder="Digite o telefone"
            register={register}
            error={errors.phone}
            rules={{
              required: "Telefone é obrigatório",
              minLength: {
                value: 10,
                message: "Telefone deve ter no mínimo 10 dígitos",
              },
            }}
          />

          <FormField<FormData>
            label="Cidade"
            name="city"
            placeholder="Digite a cidade"
            register={register}
            error={errors.city}
            rules={{
              required: "Cidade é obrigatória",
              minLength: {
                value: 2,
                message: "Cidade deve ter no mínimo 2 caracteres",
              },
            }}
          />

        <div className="md:col-span-2 flex flex-col-reverse sm:flex-row justify-end mt-2 gap-2">
          <button
            type="button"
            onClick={() => navigate("/")}
            className="w-full sm:w-auto bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={loading}
            className="w-full sm:w-auto bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? "Salvando..." : "Salvar"}
          </button>
        </div>
      </form>
    </Container>
  );
}
