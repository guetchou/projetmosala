import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";

const service = {
  title: "Accompagnement personnalisé",
  description: "Coaching, orientation, suivi individuel pour booster votre carrière.",
  icon: "/lovable-uploads/services/coaching.svg",
  details: "Un accompagnement sur-mesure avec des experts Mosala pour définir votre projet professionnel, travailler votre CV, préparer vos entretiens et réussir votre insertion.",
  cta: "Contacter un conseiller"
};

const ServiceDetail = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-mosala-green-50 via-mosala-yellow-50 to-mosala-dark-50">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
      <section className="bg-white/90 dark:bg-gray-900/90 rounded-3xl shadow-xl p-10 flex flex-col items-center text-center border border-mosala-green-100">
        <img src={service.icon} alt="" className="h-20 w-20 mb-6 drop-shadow-lg" />
        <h1 className="text-3xl md:text-4xl font-bold text-mosala-green-700 mb-2">{service.title}</h1>
        <p className="text-lg text-mosala-dark-400 mb-4">{service.description}</p>
        <div className="text-base text-gray-700 dark:text-gray-200 mb-8">{service.details}</div>
        <Button className="bg-gradient-to-r from-mosala-green-500 to-mosala-yellow-500 text-white font-bold px-8 py-3 rounded-full shadow-lg hover:from-mosala-green-600 hover:to-mosala-yellow-600 transition-all text-lg">{service.cta}</Button>
      </section>
    </main>
    <Footer />
  </div>
);

export default ServiceDetail;
