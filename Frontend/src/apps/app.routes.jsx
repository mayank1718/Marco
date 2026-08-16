import { Routes, Route } from "react-router";
import Dashboard from "../features/chat/pages/Dashboard";
import Login from "../features/auth/pages/Login";
import Register from "../features/auth/pages/Register";
import Protected from "../features/auth/components/Protected";

export function AppRouter() {
  return (
    <Routes>
      <Route
        path="/"
        element=<Protected>
          <Dashboard />
        </Protected>
      />
      <Route path="/login" element=<Login /> />
      <Route path="/register" element=<Register /> />
    </Routes>
  );
}
