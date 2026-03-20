import React from 'react';
import AppRoutes from './routes';
import { UsersProvider } from "../context/UsersContext";

function App() {
  return (
    <UsersProvider>
      <AppRoutes />
    </UsersProvider>
  );
}

export default App;
