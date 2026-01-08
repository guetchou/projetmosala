import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { FileText, User, Globe, Mail, Shield } from "lucide-react";

const LegalNotice = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-center mb-12"
      >
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] p-4 rounded-full">
            <FileText className="h-8 w-8 text-[var(--color-mosala-white)]" />
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-transparent bg-clip-text">
          Mentions légales
        </h1>
        <p className="text-lg text-[var(--color-mosala-dark-600)] max-w-2xl mx-auto">
          Conformément à la législation, retrouvez ici toutes les informations légales concernant Mosala.
        </p>
      </motion.div>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><User className="h-6 w-6 text-[var(--color-mosala-green-700)]" /> Éditeur du site</h2>
        <p className="text-[var(--color-mosala-dark-700)] mb-2">Mosala - Association loi 1901</p>
        <p className="text-[var(--color-mosala-dark-700)] mb-2">Siège social : Brazzaville, République du Congo</p>
        <p className="text-[var(--color-mosala-dark-700)] mb-2">Directeur de la publication : M. Jean Mosala</p>
        <p className="text-[var(--color-mosala-dark-700)] mb-2">Contact : <a href="mailto:contact@mosala.org" className="text-[var(--color-mosala-green-700)] underline">contact@mosala.org</a></p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Globe className="h-6 w-6 text-[var(--color-mosala-green-700)]" /> Hébergeur</h2>
        <p className="text-[var(--color-mosala-dark-700)] mb-2">OVH SAS, 2 rue Kellermann, 59100 Roubaix, France</p>
        <p className="text-[var(--color-mosala-dark-700)] mb-2">www.ovh.com</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Shield className="h-6 w-6 text-[var(--color-mosala-green-700)]" /> Propriété intellectuelle</h2>
        <p className="text-[var(--color-mosala-dark-700)] mb-2">L'ensemble du contenu du projet Mosala (textes, images, logos, vidéos, etc.) est protégé par le droit d'auteur et la propriété intellectuelle. Toute reproduction ou représentation, totale ou partielle, est interdite sans autorisation écrite préalable.</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><Mail className="h-6 w-6 text-[var(--color-mosala-green-700)]" /> Données personnelles & RGPD</h2>
        <p className="text-[var(--color-mosala-dark-700)] mb-2">Les informations recueillies font l'objet d'un traitement informatique destiné à la gestion des utilisateurs et des services Mosala. Conformément à la loi Informatique et Libertés et au RGPD, vous disposez d'un droit d'accès, de rectification et de suppression de vos données. Pour exercer ces droits, contactez <a href="mailto:privacy@mosala.org" className="text-[var(--color-mosala-green-700)] underline">privacy@mosala.org</a>.</p>
      </section>
      <section className="mb-10">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2"><FileText className="h-6 w-6 text-[var(--color-mosala-green-700)]" /> Conditions d'utilisation</h2>
        <p className="text-[var(--color-mosala-dark-700)] mb-2">L'utilisation du site Mosala implique l'acceptation pleine et entière des présentes mentions légales et des conditions générales d'utilisation.</p>
      </section>
    </main>
    <Footer />
  </div>
);

export default LegalNotice; 