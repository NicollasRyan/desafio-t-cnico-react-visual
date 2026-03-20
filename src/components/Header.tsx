import { Plus, Users } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  const isUsersPage = location.pathname === "/";

  return (
    <header className="w-full border-b bg-white">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 cursor-pointer min-w-0">
          <Users className="text-blue-500" size={22} />
          <span className="font-semibold text-gray-800 truncate">UserManager</span>
        </div>

        {isUsersPage && (
          <button
            onClick={() => navigate("/create")}
            className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded-md text-sm transition-colors whitespace-nowrap"
          >
            <Plus size={16} />
            <span className="hidden sm:inline">Novo usuario</span>
          </button>
        )}
      </div>
    </header>
  );
}
