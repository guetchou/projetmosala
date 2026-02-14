import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Settings, Mail, Lock, Bell, Trash2 } from "lucide-react";
import { useState } from "react";
import DemoBadge from "@/components/DemoBadge";

const SettingsPage = () => {
  const [email, setEmail] = useState("jean.mosala@mosala.org");
  const [password, setPassword] = useState("");
  const [notifications, setNotifications] = useState(true);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl flex flex-col items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center w-full mb-8 border border-[var(--color-mosala-green-100)]"
        >
          <h1 className="text-3xl font-bold text-[var(--color-mosala-green-700)] mb-6 flex items-center gap-2">
            <Settings className="h-7 w-7" /> Paramètres du compte
          </h1>
          <form className="w-full flex flex-col gap-6">
            <div>
              <label className="block text-[var(--color-mosala-dark-700)] font-semibold mb-2">Email</label>
              <div className="flex gap-2 items-center">
                <Mail className="h-5 w-5 text-[var(--color-mosala-green-500)]" />
                <input type="email" value={email} onChange={e => setEmail(e.target.value)} className="input input-bordered w-full" />
              </div>
            </div>
            <div>
              <label className="block text-[var(--color-mosala-dark-700)] font-semibold mb-2">Nouveau mot de passe</label>
              <div className="flex gap-2 items-center">
                <Lock className="h-5 w-5 text-[var(--color-mosala-yellow-500)]" />
                <input type="password" value={password} onChange={e => setPassword(e.target.value)} className="input input-bordered w-full" />
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Bell className="h-5 w-5 text-[var(--color-mosala-green-500)]" />
              <label className="text-[var(--color-mosala-dark-700)] font-semibold">Recevoir les notifications</label>
              <input type="checkbox" checked={notifications} onChange={e => setNotifications(e.target.checked)} className="toggle toggle-success" />
            </div>
            <button type="submit" className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-white font-semibold px-6 py-3 rounded-lg shadow hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] transition-all">Enregistrer les modifications<DemoBadge /></button>
            <button type="button" className="flex items-center gap-2 mt-4 text-red-600 hover:text-red-800 font-semibold" onClick={() => alert('Suppression du compte (simulation)')}> <Trash2 className="h-5 w-5" /> Supprimer mon compte<DemoBadge /></button>
          </form>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default SettingsPage; 