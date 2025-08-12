import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { User, Settings, Mail, Briefcase } from "lucide-react";

const user = {
  name: "Jean Mosala",
  email: "jean.mosala@mosala.org",
  role: "Candidat",
  avatar: "https://randomuser.me/api/portraits/men/32.jpg"
};

const Profile = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl flex flex-col items-center">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-white/90 rounded-2xl shadow-xl p-8 flex flex-col items-center w-full mb-8 border border-[var(--color-mosala-green-100)]"
      >
        <img src={user.avatar} alt="Avatar" className="w-28 h-28 rounded-full mb-4 shadow-lg border-4 border-[var(--color-mosala-green-200)]" />
        <h1 className="text-3xl font-bold text-[var(--color-mosala-green-700)] mb-2 flex items-center gap-2">
          <User className="h-7 w-7" /> {user.name}
        </h1>
        <p className="text-lg text-[var(--color-mosala-dark-700)] mb-1 flex items-center gap-2">
          <Mail className="h-5 w-5" /> {user.email}
        </p>
        <p className="text-base text-[var(--color-mosala-yellow-700)] mb-4 flex items-center gap-2">
          <Briefcase className="h-5 w-5" /> {user.role}
        </p>
        <a href="/settings" className="inline-flex items-center gap-2 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-white font-semibold px-6 py-3 rounded-lg shadow hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] transition-all">
          <Settings className="h-5 w-5" /> Paramètres du compte
        </a>
      </motion.div>
    </main>
    <Footer />
  </div>
);

export default Profile; 