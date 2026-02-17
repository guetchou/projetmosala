import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, HelpCircle, ChevronDown, ChevronUp, BookOpen, User, Briefcase, CreditCard, Shield, MessageCircle } from "lucide-react";

const faqCategories = [
  {
    id: "general",
    title: "Général",
    icon: HelpCircle,
    questions: [
      {
        question: "Qu'est-ce que Mosala ?",
        answer: "Mosala est un projet d'insertion professionnelle financé par l'AFD et l'Union Européenne, dédié à la jeunesse congolaise. Il combine une caravane itinérante, des formations, de l'accompagnement et une mise en relation avec les opportunités d'emploi locales."
      },
      {
        question: "Les services Mosala sont-ils gratuits ?",
        answer: "L'inscription et la plupart des services sont gratuits. Certaines formations spécialisées ou options premium peuvent être payantes. Tous les prix sont clairement affichés avant inscription."
      },
      {
        question: "Mosala est-il disponible partout au Congo ?",
        answer: "Oui, Mosala est accessible dans tout le Congo. Notre caravane itinérante visite 6 villes principales et notre espace en ligne est optimisé pour les connexions faibles."
      }
    ]
  },
  {
    id: "account",
    title: "Compte & Inscription",
    icon: User,
    questions: [
      {
        question: "Comment créer un compte Mosala ?",
        answer: "Cliquez sur 'Créer un compte' en haut à droite, remplissez le formulaire avec vos informations (nom, email, mot de passe) et validez. Vous recevrez un email de confirmation pour activer votre compte."
      },
      {
        question: "J'ai oublié mon mot de passe, que faire ?",
        answer: "Cliquez sur 'Mot de passe oublié' sur la page de connexion. Entrez votre email et suivez les instructions reçues pour réinitialiser votre mot de passe."
      },
      {
        question: "Comment modifier mes informations personnelles ?",
        answer: "Connectez-vous à votre compte, allez dans 'Mon profil' et cliquez sur 'Modifier'. Vous pourrez alors mettre à jour vos informations personnelles et professionnelles."
      }
    ]
  },
  {
    id: "jobs",
    title: "Emplois & Candidatures",
    icon: Briefcase,
    questions: [
      {
        question: "Comment postuler à une offre ?",
        answer: "Connectez-vous à votre compte, trouvez une offre qui vous intéresse et cliquez sur 'Postuler'. Suivez les instructions pour soumettre votre candidature avec votre CV et lettre de motivation."
      },
      {
        question: "Comment suivre mes candidatures ?",
        answer: "Dans votre espace personnel, section 'Mes candidatures', vous pouvez voir le statut de toutes vos candidatures : en attente, acceptée, refusée, ou en cours de traitement."
      },
      {
        question: "Comment améliorer mes chances d'être recruté ?",
        answer: "Complétez bien votre profil, ajoutez une photo professionnelle, rédigez un CV détaillé, et utilisez nos outils de coaching pour préparer vos entretiens."
      }
    ]
  },
  {
    id: "formations",
    title: "Formations & Coaching",
    icon: BookOpen,
    questions: [
      {
        question: "Quels types de formations proposez-vous ?",
        answer: "Nous proposons des formations en développement web, marketing digital, gestion de projet, langues, et bien d'autres domaines. Nos formations sont certifiantes et adaptées au marché congolais."
      },
      {
        question: "Comment s'inscrire à une formation ?",
        answer: "Consultez notre catalogue de formations, choisissez celle qui vous intéresse et cliquez sur 'S'inscrire'. Vous recevrez les détails par email."
      },
      {
        question: "Les formations sont-elles en présentiel ou en ligne ?",
        answer: "Nous proposons les deux formats selon les formations. Certaines sont 100% en ligne, d'autres en présentiel, et certaines en mode hybride."
      }
    ]
  },
  {
    id: "support",
    title: "Support & Contact",
    icon: MessageCircle,
    questions: [
      {
        question: "Comment contacter le support ?",
        answer: "Vous pouvez nous contacter via la page Contact, le chat en bas à droite de l'écran, par email à support@mosala.org, ou par téléphone au +242 06 802 00 06."
      },
      {
        question: "Quels sont les horaires du support ?",
        answer: "Notre équipe est disponible du lundi au vendredi, de 9h à 18h (heure du Congo). Le chat et l'email sont accessibles 24h/24 pour les questions urgentes."
      },
      {
        question: "Comment signaler un problème technique ?",
        answer: "Utilisez le formulaire de contact en précisant 'Problème technique' ou contactez directement notre équipe technique par email à tech@mosala.org."
      }
    ]
  },
  {
    id: "security",
    title: "Sécurité & Confidentialité",
    icon: Shield,
    questions: [
      {
        question: "Mes données sont-elles protégées ?",
        answer: "Oui, nous mettons en place des mesures de sécurité appropriées pour protéger vos données personnelles. Consultez notre politique de confidentialité pour plus de détails."
      },
      {
        question: "Puis-je supprimer mon compte ?",
        answer: "Oui, vous pouvez supprimer votre compte à tout moment depuis les paramètres de votre profil. Attention, cette action est irréversible."
      },
      {
        question: "Qui peut voir mes informations ?",
        answer: "Vos informations personnelles ne sont visibles que par vous et les employeurs auxquels vous postulez. Nous ne vendons jamais vos données à des tiers."
      }
    ]
  }
];

const FAQ = () => {
  const [open, setOpen] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  const allQuestions = faqCategories.flatMap(category => 
    category.questions.map(q => ({ ...q, category: category.title }))
  );

  const filteredQuestions = allQuestions.filter(q =>
    (selectedCategory === "all" || faqCategories.find(c => c.id === selectedCategory)?.questions.includes(q)) &&
    (q.question.toLowerCase().includes(searchTerm.toLowerCase()) || 
     q.answer.toLowerCase().includes(searchTerm.toLowerCase()))
  );

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
              <HelpCircle className="h-8 w-8 text-[var(--color-mosala-white)]" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-transparent bg-clip-text">
            Questions Fréquentes
          </h1>
          <p className="text-lg text-[var(--color-mosala-dark-600)] max-w-2xl mx-auto">
            Trouvez rapidement les réponses à vos questions sur Mosala, nos services, et l'utilisation du projet.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="mb-8"
        >
          <div className="bg-[var(--color-mosala-white)]/80 backdrop-blur-xl rounded-2xl p-6 shadow-lg border border-[var(--color-mosala-green-100)]">
            {/* Search */}
            <div className="relative mb-6">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-[var(--color-mosala-green-400)] h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher dans la FAQ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/50 shadow-inner"
              />
            </div>

            {/* Category filters */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory("all")}
                className={`px-4 py-2 rounded-full font-medium transition-colors ${
                  selectedCategory === "all"
                    ? "bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)]"
                    : "bg-[var(--color-mosala-green-100)] text-[var(--color-mosala-green-700)] hover:bg-[var(--color-mosala-green-200)]"
                }`}
              >
                Toutes les questions
              </button>
              {faqCategories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full font-medium transition-colors flex items-center gap-2 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)]"
                      : "bg-[var(--color-mosala-green-100)] text-[var(--color-mosala-green-700)] hover:bg-[var(--color-mosala-green-200)]"
                  }`}
                >
                  <category.icon className="h-4 w-4" />
                  {category.title}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* FAQ List */}
        <div className="space-y-4">
          {filteredQuestions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <HelpCircle className="h-16 w-16 text-[var(--color-mosala-dark-300)] mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-[var(--color-mosala-dark-700)] mb-2">Aucune question trouvée</h3>
              <p className="text-[var(--color-mosala-dark-500)]">Essayez de modifier vos critères de recherche ou contactez-nous directement.</p>
            </motion.div>
          ) : (
            filteredQuestions.map((faq, i) => (
              <motion.div
                key={`${faq.category}-${i}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + i * 0.05, duration: 0.5 }}
                className="bg-[var(--color-mosala-white)]/80 backdrop-blur-xl rounded-2xl shadow-lg border border-[var(--color-mosala-green-100)] overflow-hidden hover:shadow-xl transition-shadow"
              >
                <button
                  className="w-full flex justify-between items-center text-lg font-semibold text-[var(--color-mosala-dark-900)] focus:outline-none focus:ring-2 focus:ring-[var(--color-mosala-green-300)] p-6 hover:bg-[var(--color-mosala-green-50)] transition-colors"
                  onClick={() => setOpen(open === i ? null : i)}
                  aria-expanded={open === i}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="text-left">{faq.question}</span>
                  {open === i ? (
                    <ChevronUp className="h-5 w-5 text-[var(--color-mosala-green-600)] transition-transform" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-[var(--color-mosala-green-600)] transition-transform" />
                  )}
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div
                      id={`faq-panel-${i}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 text-[var(--color-mosala-dark-600)] leading-relaxed border-t border-[var(--color-mosala-green-100)] pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))
          )}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12"
        >
          <div className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] rounded-2xl p-8 text-[var(--color-mosala-white)]">
            <h3 className="text-2xl font-bold mb-4">Vous n'avez pas trouvé votre réponse ?</h3>
            <p className="mb-6 text-[var(--color-mosala-white)]/90">
              Notre équipe support est là pour vous aider et répondre à toutes vos questions.
            </p>
            <a 
              href="/contact" 
              className="inline-block bg-[var(--color-mosala-white)] text-[var(--color-mosala-green-700)] font-semibold px-6 py-3 rounded-lg hover:bg-[var(--color-mosala-white)]/90 transition-colors"
            >
              Contacter le support
            </a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
};

export default FAQ; 