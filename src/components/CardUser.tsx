import { CircleUser, Pencil, Trash } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export function CardUser({ id, name, email, phone, city }: { id: string | number; name: string; email: string; phone: string; city: string }) {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-5 items-center border-b border-gray-300 p-4">
      <div className="flex gap-2 items-center">
        <CircleUser size={24} />
        <p className="text-sm">{name}</p>
      </div>
      <p className="text-sm">{email}</p>
      <p className="text-sm">{phone}</p>
      <p className="text-sm">{city}</p>
      <div className="flex gap-2 items-center ">
        <button
         className="flex items-center gap-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-1 rounded-md text-sm transition-colors"
         onClick={()=> navigate(`/edit/${id}`)}
         >
          Editar 
          <Pencil size={18} />
          </button>
        <button className="flex items-center gap-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-1 rounded-md text-sm transition-colors">
          Deletar 
          <Trash size={18} />
          </button>
      </div>
    </div>
  );
}
