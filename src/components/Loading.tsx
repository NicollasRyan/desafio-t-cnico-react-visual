import { LoaderCircle } from "lucide-react";

export function Loading() {
  return (
    <div className="flex flex-col items-center gap-4 py-8">
      <LoaderCircle className="animate-spin" />
      <p>Carregando usuários...</p>
    </div>
  );
}