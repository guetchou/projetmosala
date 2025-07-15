import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const ConfirmationCaravane = () => {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-light via-white to-mosala-orange-50">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        <img src="/lovable-uploads/logo-mosala1.png" alt="Logo Mosala" width={90} height={90} className="mb-6 drop-shadow-lg" />
        <h1 className="text-3xl md:text-4xl font-bold text-mosala-dark mb-4 text-center">Merci pour votre inscription !</h1>
        <p className="text-lg text-mosala-dark/80 mb-8 text-center max-w-xl">
          Votre demande de participation à la Caravane Mosala a bien été prise en compte.<br />
          L'équipe Mosala vous contactera prochainement avec toutes les informations utiles.
        </p>
        <Button className="bg-mosala-orange text-white px-8 py-3 rounded-full text-lg font-semibold shadow-lg" onClick={() => navigate("/")}>Retour à l'accueil</Button>
      </main>
      <Footer />
    </div>
  );
};

export default ConfirmationCaravane; 