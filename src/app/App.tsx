import React from "react";
import AppRoutes from "./routes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Header } from "../components/Header";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />
      <Header />
      <AppRoutes />
    </>
  );
}

export default App;
