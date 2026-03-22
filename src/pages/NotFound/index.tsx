import { Link } from "react-router-dom";
import { Container } from "../../components/Container";

export function NotFound() {
  return (
    <Container>
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <p className="text-6xl font-bold text-gray-300">404</p>
        <h1 className="mt-2 text-xl font-semibold text-gray-800">
          Página não encontrada
        </h1>
        <p className="mt-2 max-w-md text-sm text-gray-600">
          A rota que você acessou não existe ou foi removida.
        </p>
        <Link
          to="/"
          className="mt-6 rounded-md bg-blue-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-600"
        >
          Voltar para a lista
        </Link>
      </div>
    </Container>
  );
}
