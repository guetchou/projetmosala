import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";
import { Shield, Lock, Eye, FileText, CheckCircle } from "lucide-react";

const Privacy = () => {
  const sections = [
    {
      title: "Collecte des données",
      icon: FileText,
      content: "Nous collectons uniquement les informations nécessaires à votre inscription et à l'utilisation de nos services : nom, email, téléphone, CV, et informations professionnelles."
    },
    {
      title: "Utilisation des données",
      icon: Eye,
      content: "Vos données sont utilisées pour : vous proposer des offres d'emploi pertinentes, améliorer nos services, et vous contacter concernant votre compte."
    },
    {
      title: "Protection des données",
      icon: Shield,
      content: "Nous mettons en place des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès non autorisé, modification, divulgation ou destruction."
    },
    {
      title: "Vos droits",
      icon: Lock,
      content: "Vous avez le droit d'accéder, de rectifier, de supprimer vos données et de vous opposer à leur traitement. Contactez-nous pour exercer ces droits."
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] p-4 rounded-full">
              <Shield className="h-8 w-8 text-[var(--color-mosala-white)]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-transparent bg-clip-text">
            Politique de confidentialité
          </h1>
          <p className="text-lg text-[var(--color-mosala-dark-600)] max-w-2xl mx-auto">
            Mosala s'engage à protéger votre vie privée et vos données personnelles. 
            Cette politique explique comment nous collectons, utilisons et protégeons vos informations.
          </p>
        </motion.div>

        {/* Last updated */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="bg-[var(--color-mosala-green-50)] border border-[var(--color-mosala-green-200)] rounded-lg p-4 mb-8"
        >
          <div className="flex items-center gap-2 text-[var(--color-mosala-green-700)]">
            <CheckCircle className="h-5 w-5" />
            <span className="font-medium">Dernière mise à jour : 10 octobre 2024</span>
          </div>
        </motion.div>

        {/* Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
              className="bg-[var(--color-mosala-white)]/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[var(--color-mosala-green-100)] hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] p-2 rounded-lg">
                  <section.icon className="h-6 w-6 text-[var(--color-mosala-white)]" />
                </div>
                <h2 className="text-xl font-bold text-[var(--color-mosala-dark-900)]">{section.title}</h2>
              </div>
              <p className="text-[var(--color-mosala-dark-600)] leading-relaxed">{section.content}</p>
            </motion.div>
          ))}
        </div>

        {/* Detailed content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="bg-[var(--color-mosala-white)]/90 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-[var(--color-mosala-green-100)]"
        >
          <h2 className="text-2xl font-bold text-[var(--color-mosala-dark-900)] mb-6">Détails de notre politique</h2>
          
          <div className="space-y-6">
            <section>
              <h3 className="text-lg font-semibold text-[var(--color-mosala-green-700)] mb-3">1. Informations collectées</h3>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-mosala-dark-600)]">
                <li>Informations d'identification (nom, prénom, email)</li>
                <li>Informations de contact (téléphone, adresse)</li>
                <li>Informations professionnelles (CV, expérience, compétences)</li>
                <li>Données de navigation et d'utilisation de la plateforme</li>
                <li>Préférences et centres d'intérêt professionnels</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[var(--color-mosala-green-700)] mb-3">2. Finalités du traitement</h3>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-mosala-dark-600)]">
                <li>Gestion de votre compte utilisateur</li>
                <li>Mise en relation avec des employeurs</li>
                <li>Personnalisation des offres d'emploi</li>
                <li>Amélioration de nos services</li>
                <li>Communication concernant nos services</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[var(--color-mosala-green-700)] mb-3">3. Base légale</h3>
              <p className="text-[var(--color-mosala-dark-600)] mb-3">
                Le traitement de vos données est fondé sur :
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-mosala-dark-600)]">
                <li>L'exécution du contrat de service</li>
                <li>Votre consentement pour certaines finalités</li>
                <li>L'intérêt légitime de Mosala</li>
                <li>L'obligation légale dans certains cas</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[var(--color-mosala-green-700)] mb-3">4. Conservation des données</h3>
              <p className="text-[var(--color-mosala-dark-600)]">
                Vos données sont conservées pendant la durée de votre inscription et jusqu'à 3 ans après la fermeture de votre compte, 
                sauf obligation légale de conservation plus longue.
              </p>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[var(--color-mosala-green-700)] mb-3">5. Partage des données</h3>
              <p className="text-[var(--color-mosala-dark-600)] mb-3">
                Vos données peuvent être partagées avec :
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-mosala-dark-600)]">
                <li>Les employeurs pour les candidatures</li>
                <li>Nos prestataires techniques (hébergement, sécurité)</li>
                <li>Les autorités si obligation légale</li>
                <li>Avec votre consentement explicite</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[var(--color-mosala-green-700)] mb-3">6. Vos droits</h3>
              <p className="text-[var(--color-mosala-dark-600)] mb-3">
                Conformément au RGPD, vous disposez des droits suivants :
              </p>
              <ul className="list-disc list-inside space-y-2 text-[var(--color-mosala-dark-600)]">
                <li>Droit d'accès à vos données</li>
                <li>Droit de rectification</li>
                <li>Droit à l'effacement</li>
                <li>Droit à la limitation du traitement</li>
                <li>Droit à la portabilité</li>
                <li>Droit d'opposition</li>
              </ul>
            </section>

            <section>
              <h3 className="text-lg font-semibold text-[var(--color-mosala-green-700)] mb-3">7. Contact</h3>
              <p className="text-[var(--color-mosala-dark-600)]">
                Pour toute question concernant cette politique ou pour exercer vos droits, 
                contactez notre délégué à la protection des données :<br />
                <strong>Email :</strong> privacy@mosala.org<br />
                <strong>Téléphone :</strong> +242 06 802 00 06<br />
                <strong>Adresse :</strong> Brazzaville, République du Congo
              </p>
            </section>
          </div>
        </motion.div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] rounded-2xl p-8 text-[var(--color-mosala-white)]">
            <h3 className="text-2xl font-bold mb-4">Des questions sur la confidentialité ?</h3>
            <p className="mb-6 text-[var(--color-mosala-white)]/90">
              Notre équipe est là pour vous répondre et vous accompagner.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-[var(--color-mosala-white)] text-[var(--color-mosala-green-700)] font-semibold px-6 py-3 rounded-lg hover:bg-[var(--color-mosala-white)]/90 transition-colors"
            >
              Nous contacter
            </a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default Privacy; 