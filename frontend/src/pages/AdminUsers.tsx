import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Pencil, Trash2, UserPlus, CheckCircle, XCircle } from "lucide-react";

// Utilisateurs mockés (à remplacer par API plus tard)
const initialUsers = [
  { id: 1, name: "Jean Mavoungou", email: "jean.mavoungou@email.com", role: "admin" },
  { id: 2, name: "Aline Samba", email: "aline.samba@email.com", role: "recruteur" },
  { id: 3, name: "Pierre Nkouka", email: "pierre.nkouka@email.com", role: "candidat" },
];

const AdminUsers = () => {
  const [users, setUsers] = useState(initialUsers);
  const [form, setForm] = useState({ name: "", email: "", role: "candidat" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; name: string } | null>(null);

  // Ajout ou édition
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setFeedback({ type: "error", message: "Nom et email obligatoires." });
      return;
    }
    if (editingId) {
      setUsers(users.map(u => u.id === editingId ? { ...u, ...form } : u));
      setFeedback({ type: "success", message: "Utilisateur modifié." });
      setEditingId(null);
    } else {
      setUsers([
        ...users,
        { ...form, id: Math.max(0, ...users.map(u => u.id)) + 1 },
      ]);
      setFeedback({ type: "success", message: "Utilisateur ajouté." });
    }
    setForm({ name: "", email: "", role: "candidat" });
  };

  // Pré-remplir pour édition
  const handleEdit = (user: typeof initialUsers[0]) => {
    setForm({ name: user.name, email: user.email, role: user.role });
    setEditingId(user.id);
  };

  // Suppression
  const handleDelete = (id: number) => {
    setUsers(users.filter(u => u.id !== id));
    setFeedback({ type: "success", message: "Utilisateur supprimé." });
    setConfirmDelete(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text flex items-center gap-3">
          <UserPlus className="h-8 w-8 text-[#6E45E2]" /> Gestion des utilisateurs
        </h1>

        {/* Feedback */}
        {feedback && (
          <div className={`mb-6 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg font-semibold text-lg ${feedback.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {feedback.type === "success" ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            {feedback.message}
            <button className="ml-auto text-gray-400 hover:text-gray-700" onClick={() => setFeedback(null)}>&times;</button>
          </div>
        )}

        {/* Formulaire d'ajout/édition */}
        <form onSubmit={handleSubmit} className="bg-white/90 backdrop-blur-md rounded-2xl p-6 mb-10 shadow-xl border border-white/40 flex flex-col gap-4">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Nom"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6E45E2] focus:outline-none"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              required
            />
            <input
              type="email"
              placeholder="Email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6E45E2] focus:outline-none"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              required
            />
            <select
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6E45E2] focus:outline-none"
              value={form.role}
              onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
            >
              <option value="admin">Admin</option>
              <option value="recruteur">Recruteur</option>
              <option value="candidat">Candidat</option>
            </select>
          </div>
          <div className="flex gap-4 justify-end">
            {editingId && (
              <button type="button" className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300" onClick={() => { setForm({ name: "", email: "", role: "candidat" }); setEditingId(null); }}>Annuler</button>
            )}
            <button type="submit" className="px-6 py-2 rounded-lg bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-white font-bold shadow hover:from-[#5a36b8] hover:to-[#00cccc] transition-all">
              {editingId ? "Modifier" : "Ajouter"}
            </button>
          </div>
        </form>

        {/* Liste dynamique */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/30">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4">Nom</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Rôle</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">Aucun utilisateur</td></tr>
              ) : users.map(user => (
                <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50/60 transition">
                  <td className="py-3 px-4 font-semibold">{user.name}</td>
                  <td className="py-3 px-4">{user.email}</td>
                  <td className="py-3 px-4 capitalize">{user.role}</td>
                  <td className="py-3 px-4 text-right flex gap-2 justify-end">
                    <button className="p-2 rounded hover:bg-gray-200" title="Éditer" onClick={() => handleEdit(user)}><Pencil className="h-5 w-5 text-blue-600" /></button>
                    <button className="p-2 rounded hover:bg-gray-200" title="Supprimer" onClick={() => setConfirmDelete({ id: user.id, name: user.name })}><Trash2 className="h-5 w-5 text-red-600" /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Modale de confirmation suppression */}
        {confirmDelete && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-8 shadow-2xl max-w-sm w-full text-center">
              <h2 className="text-xl font-bold mb-4">Supprimer l'utilisateur ?</h2>
              <p className="mb-6">Confirmez la suppression de <span className="font-semibold">{confirmDelete.name}</span>.</p>
              <div className="flex gap-4 justify-center">
                <button className="px-6 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300" onClick={() => setConfirmDelete(null)}>Annuler</button>
                <button className="px-6 py-2 rounded-lg bg-red-600 text-white font-bold hover:bg-red-700" onClick={() => handleDelete(confirmDelete.id)}>Supprimer</button>
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default AdminUsers; 