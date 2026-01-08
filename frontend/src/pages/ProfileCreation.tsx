
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { UserPlus, UploadCloud } from "lucide-react";

const ProfileCreation = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
      <div className="flex flex-col items-center mb-8">
        <UserPlus className="h-16 w-16 text-primary mb-4" />
        <h1 className="text-3xl md:text-4xl font-extrabold mb-2 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Création de profil</h1>
        <p className="text-lg text-[#F5F5F7] text-center mb-4">Créez un profil complet avec photo, vidéo, CV en ligne et suggestions personnalisées.</p>
      </div>
      <form className="bg-white/90 rounded-xl shadow-lg p-6 flex flex-col gap-4">
        <label className="font-semibold text-mosala-dark">Nom complet</label>
        <input type="text" placeholder="Votre nom" className="input input-bordered" />
        <label className="font-semibold text-mosala-dark">Photo de profil</label>
        <div className="flex items-center gap-2">
          <UploadCloud className="h-5 w-5 text-primary" />
          <input type="file" className="input input-bordered flex-1" />
        </div>
        <label className="font-semibold text-mosala-dark">Vidéo de présentation (optionnel)</label>
        <input type="file" accept="video/*" className="input input-bordered" />
        <label className="font-semibold text-mosala-dark">CV en ligne</label>
        <input type="url" placeholder="Lien vers votre CV (Google Drive, PDF, etc.)" className="input input-bordered" />
        <button type="submit" className="btn bg-gradient-primary text-white mt-4">Créer mon profil</button>
      </form>
    </main>
    <Footer />
  </div>
);

export default ProfileCreation;
