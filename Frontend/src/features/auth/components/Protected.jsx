import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router";

const Protected = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <main className="w-full h-screen bg-neutral-950 text-slate-200 flex justify-center items-center">
        <h1>Loading....</h1>
      </main>
    );
  }

  if (!user) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default Protected;
