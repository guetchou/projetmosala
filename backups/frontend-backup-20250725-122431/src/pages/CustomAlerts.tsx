
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Bell } from "lucide-react";

const CustomAlerts = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
      <div className="flex flex-col items-center mb-8">
        <Bell className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Alertes personnalisées</h1>
        <p className="text-lg text-[#F5F5F7] text-center mb-4">Recevez des notifications par SMS, email ou in-app selon vos préférences.</p>
      </div>
      <form className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <label className="font-semibold text-mosala-dark">Adresse email</label>
        <input type="email" placeholder="Votre email" className="input input-bordered" />
        <label className="font-semibold text-mosala-dark">Numéro de téléphone (optionnel)</label>
        <input type="tel" placeholder="Votre numéro" className="input input-bordered" />
        <label className="font-semibold text-mosala-dark">Type d'alertes</label>
        <select className="input input-bordered">
          <option>Offres d'emploi</option>
          <option>Formations</option>
          <option>Événements</option>
        </select>
        <button type="submit" className="btn bg-gradient-primary text-white mt-4">S'abonner</button>
      </form>
    </main>
    <Footer />
  </div>
);

export default CustomAlerts;
