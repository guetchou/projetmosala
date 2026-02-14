import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { Pencil, Trash2, UserCheck, UserX, Briefcase, CheckCircle, XCircle } from "lucide-react";

// Candidatures mockées (à remplacer par API plus tard)
const initialApplications = [
  { id: 1, name: "Jean Mavoungou", job: "Développeur React", status: "en attente" },
  { id: 2, name: "Aline Samba", job: "Chargé de projet", status: "acceptée" },
  { id: 3, name: "Pierre Nkouka", job: "Designer UI/UX", status: "refusée" },
];

const RecruiterApplications = () => {
  const [applications, setApplications] = useState(initialApplications);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [confirmDelete, setConfirmDelete] = useState<{ id: number; name: string } | null>(null);

  // Accepter/refuser
  const handleStatus = (id: number, status: "acceptée" | "refusée") => {
    setApplications(applications.map(a => a.id === id ? { ...a, status } : a));
    setFeedback({ type: "success", message: `Candidature ${status === "acceptée" ? "acceptée" : "refusée"}.` });
  };

  // Suppression
  const handleDelete = (id: number) => {
    setApplications(applications.filter(a => a.id !== id));
    setFeedback({ type: "success", message: "Candidature supprimée." });
    setConfirmDelete(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text flex items-center gap-3">
          <Briefcase className="h-8 w-8 text-[#6E45E2]" /> Candidatures reçues (Recruteur)
        </h1>

        {/* Feedback */}
        {feedback && (
          <div className={`mb-6 flex items-center gap-2 px-4 py-3 rounded-lg shadow-lg font-semibold text-lg ${feedback.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
            {feedback.type === "success" ? <CheckCircle className="h-5 w-5" /> : <XCircle className="h-5 w-5" />}
            {feedback.message}
            <button className="ml-auto text-gray-400 hover:text-gray-700" onClick={() => setFeedback(null)}>&times;</button>
          </div>
        )}

        {/* Liste dynamique */}
        <div className="bg-white/80 backdrop-blur rounded-2xl shadow-lg border border-white/30">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="py-3 px-4">Candidat</th>
                <th className="py-3 px-4">Poste</th>
                <th className="py-3 px-4">Statut</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.length === 0 ? (
                <tr><td colSpan={4} className="text-center py-8 text-gray-400">Aucune candidature</td></tr>
              ) : applications.map(app => (
                <tr key={app.id} className="border-b border-gray-100 hover:bg-gray-50/60 transition">
                  <td className="py-3 px-4 font-semibold">{app.name}</td>
                  <td className="py-3 px-4">{app.job}</td>
                  <td className="py-3 px-4 capitalize">
                    {app.status === "acceptée" && <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-green-100 text-green-700 text-xs font-bold"><UserCheck className="h-4 w-4" /> Acceptée</span>}
                    {app.status === "refusée" && <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-red-100 text-red-700 text-xs font-bold"><UserX className="h-4 w-4" /> Refusée</span>}
                    {app.status === "en attente" && <span className="inline-flex items-center gap-1 px-2 py-1 rounded bg-gray-100 text-gray-700 text-xs font-bold">En attente</span>}
                  </td>
                  <td className="py-3 px-4 text-right flex gap-2 justify-end">
                    <button className="p-2 rounded hover:bg-green-100" title="Accepter" onClick={() => handleStatus(app.id, "acceptée")} disabled={app.status === "acceptée"}><UserCheck className="h-5 w-5 text-green-600" /></button>
                    <button className="p-2 rounded hover:bg-red-100" title="Refuser" onClick={() => handleStatus(app.id, "refusée")} disabled={app.status === "refusée"}><UserX className="h-5 w-5 text-red-600" /></button>
                    <button className="p-2 rounded hover:bg-gray-200" title="Supprimer" onClick={() => setConfirmDelete({ id: app.id, name: app.name })}><Trash2 className="h-5 w-5 text-gray-500" /></button>
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
              <h2 className="text-xl font-bold mb-4">Supprimer la candidature ?</h2>
              <p className="mb-6">Confirmez la suppression de la candidature de <span className="font-semibold">{confirmDelete.name}</span>.</p>
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

export default RecruiterApplications; 