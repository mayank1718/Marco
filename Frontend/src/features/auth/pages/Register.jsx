import React, { useState } from "react";
import { Link, useNavigate } from "react-router";
import FormGroup from "../components/FormGroup";
import { useAuth } from "../hooks/useAuth";

const Register = () => {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  const { loading, handleRegister } = useAuth();
    if (loading) {
      return (
        <main className="w-full h-screen bg-neutral-950 text-slate-200 flex justify-center items-center">
          <h1>Loading....</h1>
        </main>
      );
    }
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister({ username, email, password });
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#0b1020] text-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl shadow-black/30 backdrop-blur-sm">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-violet-500/15 text-xl font-bold text-violet-300 ring-1 ring-violet-500/40">
            P
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-white">
            Welcome
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            Sign up to continue to your workspace
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <FormGroup
            label="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <FormGroup
            label="email"
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <FormGroup
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="••••••••"
            label="password"
          />

          <button
            type="submit"
            className="w-full rounded-xl bg-violet-500 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/20 transition hover:bg-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40">
            Sign in
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-slate-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-violet-300 transition hover:text-violet-200">
            Sign-in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
