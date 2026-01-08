import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Pencil, Trash2, Briefcase, CheckCircle, XCircle, PlusCircle } from "lucide-react";

// Offres mockées (à remplacer par API plus tard)
const initialJobs = [
  { id: 1, title: "Développeur React", company: "Mosala Tech", location: "Brazzaville", type: "CDI" },
  { id: 2, title: "Chargé de projet", company: "Caravane Mosala", location: "Pointe-Noire", type: "CDD" },
  { id: 3, title: "Designer UI/UX", company: "Mosala Studio", location: "Dolisie", type: "Stage" },
];

const AdminJobs = () => {
  const [jobs, setJobs] = useState(initialJobs);
  const [form, setForm] = useState({ title: "", company: "", location: "", type: "CDI" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; title: string } | null>(null);

  // Ajout ou édition
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim() || !form.company.trim() || !form.location.trim()) {
      setFeedback({ type: "error", message: "Tous les champs sont obligatoires." });
      return;
    }
    if (editingId) {
      setJobs(jobs.map(j => j.id === editingId ? { ...j, ...form } : j));
      setFeedback({ type: "success", message: "Offre modifiée." });
      setEditingId(null);
    } else {
      setJobs([
        ...jobs,
        { ...form, id: Math.max(0, ...jobs.map(j => j.id)) + 1 },
      ]);
      setFeedback({ type: "success", message: "Offre ajoutée." });
    }
    setForm({ title: "", company: "", location: "", type: "CDI" });
  };

  // Pré-remplir pour édition
  const handleEdit = (job: typeof initialJobs[0]) => {
    setForm({ title: job.title, company: job.company, location: job.location, type: job.type });
    setEditingId(job.id);
  };

  // Suppression
  const handleDelete = (id: number) => {
    setJobs(jobs.filter(j => j.id !== id));
    setFeedback({ type: "success", message: "Offre supprimée." });
    setConfirmDelete(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-[#6E45E2]" /> Gestion des offres d'emploi
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
              placeholder="Intitulé du poste"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6E45E2] focus:outline-none"
              value={form.title}
              onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="Entreprise"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6E45E2] focus:outline-none"
              value={form.company}
              onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
              required
            />
            <input
              type="text"
              placeholder="Ville"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6E45E2] focus:outline-none"
              value={form.location}
              onChange={e => setForm(f => ({ ...f, location: e.target.value }))}
              required
            />
            <select
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-[#6E45E2] focus:outline-none"
              value={form.type}
              onChange={e => setForm(f => ({ ...f, type: e.target.value }))}
            >
              <option value="CDI">CDI</option>
              <option value="CDD">CDD</option>
              <option value="Stage">Stage</option>
              <option value="Alternance">Alternance</option>
            </select>
          </div>
          <div className="flex gap-4 justify-end">
            {editingId && (
              <button type="button" className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300" onClick={() => { setForm({ title: "", company: "", location: "", type: "CDI" }); setEditingId(null); }}>Annuler</button>
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
                <th className="py-3 px-4">Poste</th>
                <th className="py-3 px-4">Entreprise</th>
                <th className="py-3 px-4">Ville</th>
                <th className="py-3 px-4">Type</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr><td colSpan={5} className="text-center py-8 text-gray-400">Aucune offre</td></tr>
              ) : jobs.map(job => (
                <tr key={job.id} className="border-b border-gray-100 hover:bg-gray-50/60 transition">
                  <td className="py-3 px-4 font-semibold">{job.title}</td>
                  <td className="py-3 px-4">{job.company}</td>
                  <td className="py-3 px-4">{job.location}</td>
                  <td className="py-3 px-4">{job.type}</td>
                  <td className="py-3 px-4 text-right flex gap-2 justify-end">
                    <button className="p-2 rounded hover:bg-gray-200" title="Éditer" onClick={() => handleEdit(job)}><Pencil className="h-5 w-5 text-blue-600" /></button>
                    <button className="p-2 rounded hover:bg-gray-200" title="Supprimer" onClick={() => setConfirmDelete({ id: job.id, title: job.title })}><Trash2 className="h-5 w-5 text-red-600" /></button>
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
              <h2 className="text-xl font-bold mb-4">Supprimer l'offre ?</h2>
              <p className="mb-6">Confirmez la suppression de <span className="font-semibold">{confirmDelete.title}</span>.</p>
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

export default AdminJobs; 