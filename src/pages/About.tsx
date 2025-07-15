
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen flex flex-col bg-[#F7F7F7] text-gray-900 font-sans">
    <Navbar />
    {/* Header UNESCO-style */}
    <section className="w-full flex flex-col items-center justify-center min-h-[180px] py-10 mb-0 bg-white border-b border-gray-200">
      <div className="flex flex-col items-center text-center px-4 max-w-2xl">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-2">À propos de Mosala</h1>
        <div className="w-16 h-1 bg-yellow-400 rounded-full mb-4" />
        <p className="text-lg md:text-xl text-gray-600 mb-2">
          Mosala œuvre pour l’inclusion, l’innovation et l’accompagnement des jeunes vers l’emploi au Congo.
        </p>
      </div>
    </section>
    {/* Corps de page institutionnel */}
    <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
      <section className="mb-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Notre mission</h2>
        <p className="text-gray-700 text-lg mb-6">
          Connecter chaque talent congolais aux opportunités qui leur ressemblent, en s’appuyant sur l’innovation, la proximité et l’inclusion.
        </p>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Nos valeurs</h2>
        <ul className="list-disc pl-6 text-gray-700 text-lg mb-6">
          <li>Inclusion et égalité des chances</li>
          <li>Accompagnement personnalisé</li>
          <li>Innovation et numérique</li>
          <li>Proximité avec les communautés</li>
        </ul>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Chiffres clés</h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-lg text-gray-800">
          <li><span className="font-bold text-yellow-500 text-2xl">+1200</span> jeunes accompagnés</li>
          <li><span className="font-bold text-yellow-500 text-2xl">+50</span> entreprises partenaires</li>
          <li><span className="font-bold text-yellow-500 text-2xl">92%</span> taux de réussite</li>
        </ul>
      </section>
    </main>
    <Footer />
  </div>
);

export default About;
 