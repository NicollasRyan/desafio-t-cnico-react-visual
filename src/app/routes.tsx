import {  Routes, Route } from "react-router-dom";
import { UserList } from "../pages/UserList";
import { UserForm } from "../pages/UserForm";

export default function AppRoutes() {
  return (
      <Routes>
        <Route path="/" element={<UserList />} />
        <Route path="/create" element={<UserForm />} />
        <Route path="/edit/:id" element={<UserForm />} />
      </Routes>
  );
}
