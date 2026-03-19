import { BrowserRouter, Routes, Route } from "react-router-dom";
import { UserList } from "../pages/UserList";
import { UserForm } from "../pages/UserForm";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/users/new" element={<UserForm />} />
        <Route path="/users/:id" element={<UserForm />} />
      </Routes>
    </BrowserRouter>
  );
}
