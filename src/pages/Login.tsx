import { useState } from "react";
import { setToken, getUserRole } from "@/utils/auth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
      const res = await fetch("/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password })
      });
      if (!res.ok) throw new Error("Identifiants invalides");
      const data = await res.json();
      setToken(data.access_token);
      const role = getUserRole();
      if (role === "admin") navigate("/admin-dashboard");
      else if (role === "recruteur") navigate("/recruiter-space");
      else navigate("/profile-creation");
    } catch (err) {
      setError("Identifiants invalides ou erreur serveur");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
      <form onSubmit={handleSubmit} className="bg-white/90 rounded-xl shadow-lg p-8 flex flex-col gap-4 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Connexion</h1>
        {error && <div className="text-red-600">{error}</div>}
        <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} className="input input-bordered" required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={e => setPassword(e.target.value)} className="input input-bordered" required />
        <button type="submit" className="btn bg-gradient-primary text-white mt-4">Se connecter</button>
      </form>
    </div>
  );
};

export default Login; 