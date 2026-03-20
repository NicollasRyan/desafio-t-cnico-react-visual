import axios from "axios";
import { AppError } from "../errors/AppError";

export const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;

      const message =
        error.response.data?.message ||
        "Erro na comunicação com o servidor";

      return Promise.reject(new AppError(message, status));
    }

    if (error.request) {
      return Promise.reject(
        new AppError("Sem resposta do servidor", 0)
      );
    }

    return Promise.reject(
      new AppError("Erro inesperado", 0)
    );
  }
);