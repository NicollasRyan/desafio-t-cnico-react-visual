import { CircleUser, Pencil, Trash } from "lucide-react";
import React from "react";

export function CardUser() {
  return (
    <div className="flex justify-between items-center border-b border-gray-300 p-4">
      <div className="flex gap-2 items-center">
        <CircleUser size={24} />
        <p className="text-sm">Nicollas</p>
      </div>
      <p className="text-sm">nbarretoduarte@gmail.com</p>
      <p className="text-sm">74999782910</p>
      <p className="text-sm">Petrolina</p>
      <div className="flex gap-2 items-center">
        <button className="flex items-center gap-2 border border-blue-500 text-blue-500 hover:bg-blue-500 hover:text-white px-4 py-1 rounded-md text-sm transition-colors">Edit <Pencil size={18} /></button>
        <button className="flex items-center gap-2 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-4 py-1 rounded-md text-sm transition-colors">Delete <Trash size={18} /></button>
      </div>
    </div>
  );
}
