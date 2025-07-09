
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const About = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
      <div className="mb-8 p-6 rounded-xl bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-white shadow-lg border-2 border-[#00FFFF]">
        <h2 className="text-2xl font-bold mb-2">Lancement du projet MOSALA</h2>
        <p className="mb-2 font-semibold">Lancement ce matin 10 octobre 2024 du projet « MOSALA » : un tremplin de la formation vers l’emploi pour une insertion réussie des jeunes.</p>
        <p className="mb-2">Le top a été donné par le Ministre de la Jeunesse et des Sports, de la Formation Qualifiante et de l’Emploi, Hugues NGOUELONDELE en présence de son homologue des Petites et Moyennes Entreprises, madame Jacqueline Lydia MIKOLO, accompagné de l’Ambassadeur de France au Congo Claire BODONYI.</p>
        <p className="mb-2">Le projet MOSALA vise entre autres, à renforcer l’employabilité des jeunes et réduire les inégalités du genre. Il permettra de réinsérer cinq mille (5000) jeunes sur l’ensemble du territoire national.</p>
        <p className="mb-2">Financé à plus de six milliards (6.000.000.000) de francs CFA par l’Agence Française de Développement et l’Union Européenne, c’est un mécanisme d’insertion professionnelle des jeunes.</p>
        <p className="mb-2">L’Ambassadeur de France au Congo a exhorté les jeunes à la création des richesses et à aller vers l’avenir avec des projets à effet multiplicateur, en mettant un accent sur les métiers du numérique.</p>
        <p className="mb-2">Le Ministre Hugues NGOUELONDELE espère qu’en cette année de la jeunesse, ce projet va définitivement changer le regard de la jeunesse congolaise désireuse d’apporter sa pierre au développement du pays.</p>
        <p className="mb-2">À terme, ce projet aura un impact significatif sur le quotidien de plusieurs jeunes, dont cinquante pour cent des femmes.</p>
        <p className="mb-2">L’innovation et l’entreprenariat sont des sources de création d’emplois. Ils permettent également aux jeunes de devenir eux-mêmes des acteurs de changement. Insertion professionnelle des jeunes : le projet Mosala est lancé !</p>
        <p className="text-xs mt-2 italic">Source : Brazzaville Press, Ambassade de France, Union Européenne, MJSECFQE, AFD</p>
      </div>
      <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">À propos de Mosala</h1>
      <p className="text-lg text-[#F5F5F7] whitespace-pre-line">Inclusion : Un site optimisé pour les connexions faibles et mobile-first

Innovation : Moteur de recherche intelligent & PWA offline

Proximité : Support local 24/7 (chatbot, WhatsApp, email)</p>
    </main>
    <Footer />
  </div>
);

export default About;
 