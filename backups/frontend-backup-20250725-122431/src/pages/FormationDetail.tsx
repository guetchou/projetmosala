import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const formation = {
  title: "Développement Web",
  description: "Maîtrisez les bases du web, du HTML/CSS à React et Node.js.",
  icon: "/topcenter-uploads/services/formation.svg",
  details: "Un parcours complet pour apprendre à créer des sites et applications web modernes, avec des projets pratiques et un accompagnement par des experts.",
  cta: "S'inscrire à la formation"
};

const FormationDetail = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50 via-mosala-yellow-50 to-mosala-dark-50">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
      <section className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl p-10 flex flex-col items-center text-center border border-mosala-green-100">
        <img src={formation.icon} alt="" className="h-20 w-20 mb-6 drop-shadow-lg" />
        <h1 className="text-3xl md:text-4xl font-bold text-mosala-green-700 mb-2">{formation.title}</h1>
        <p className="text-lg text-mosala-dark-400 mb-4">{formation.description}</p>
        <div className="text-base text-gray-700 dark:text-gray-200 mb-8">{formation.details}</div>
        <Button className="bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:from-mosala-green-600 hover:to-mosala-yellow-600 transition-all text-lg">{formation.cta}</Button>
      </section>
    </main>
    <Footer />
  </div>
);

export default FormationDetail;
