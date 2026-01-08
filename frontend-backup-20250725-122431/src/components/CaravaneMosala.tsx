import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Users, Calendar, Quote, CheckCircle, TrendingUp, Award } from "lucide-react";

const CaravaneMosala = () => {
  const bilan = [
    { 
      title: "10,000+ participants", 
      description: "jeunes sensibilisés",
      icon: Users,
      color: "text-[var(--color-mosala-green-600)]"
    },
    { 
      title: "2,000+ jeunes formés", 
      description: "compétences développées",
      icon: Award,
      color: "text-[var(--color-mosala-yellow-600)]"
    },
    { 
      title: "6 villes visitées", 
      description: "Brazzaville, Pointe-Noire, Ouesso, Dolisie, Owando, Makoua",
      icon: MapPin,
      color: "text-[var(--color-mosala-orange-600)]"
    },
    { 
      title: "92% de satisfaction", 
      description: "évaluation des participants",
      icon: TrendingUp,
      color: "text-[var(--color-mosala-green-700)]"
    }
  ];

  const temoignages = [
    {
      quote: "Grâce à l'atelier CV à Pointe-Noire, j'ai appris à mettre en avant mes compétences numériques — j'ai obtenu un stage dès la semaine suivante !",
      author: "Stéphanie",
      ville: "Pointe-Noire",
      age: "22 ans"
    },
    {
      quote: "La simulation d'entretien m'a permis de gagner en confiance. Le coach RH m'a donné des astuces concrètes pour répondre aux questions difficiles.",
      author: "Bertrand",
      ville: "Brazzaville",
      age: "25 ans"
    },
    {
      quote: "J'étais sceptique sur l'utilisation d'une plateforme digitale, mais l'équipe Mosala m'a montré que c'était simple et efficace, même avec une connexion bas débit.",
      author: "Rose",
      ville: "Owando",
      age: "28 ans"
    }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-[var(--color-mosala-green-50)] to-[var(--color-mosala-yellow-50)]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8"
        >
          <span className="inline-block px-4 py-2 bg-[var(--color-mosala-green-100)] text-[var(--color-mosala-green-700)] rounded-full text-sm font-semibold mb-4 border border-[var(--color-mosala-green-300)]">
            Événement Terminé
          </span>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-mosala-dark-700)] mb-4">
            Bilan de la Caravane Mosala 2024
          </h2>
          <p className="text-base md:text-lg text-[var(--color-mosala-dark-300)] max-w-3xl mx-auto">
            Retour sur notre tournée itinérante à travers les provinces du Congo : 
            sensibilisation, formation et création de liens entre institutions et communautés.
          </p>
        </motion.div>

        {/* Bilan chiffré */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {bilan.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-[var(--color-mosala-white)] p-4 rounded-xl border-2 border-[var(--color-mosala-green-300)] shadow-lg hover:shadow-xl transition-all text-center"
            >
              <item.icon className={`h-8 w-8 ${item.color} mx-auto mb-3`} />
              <div className="text-lg font-bold text-[var(--color-mosala-dark-700)] mb-1">{item.title}</div>
              <p className="text-[var(--color-mosala-dark-300)] text-xs">{item.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Témoignages */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h3 className="text-xl font-bold text-[var(--color-mosala-dark-700)] mb-6 text-center">
            Témoignages des participants
          </h3>
          <div className="grid md:grid-cols-3 gap-4">
            {temoignages.map((temoignage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-[var(--color-mosala-white)] p-4 rounded-lg shadow-lg border-2 border-[var(--color-mosala-green-200)]"
              >
                <Quote className="h-6 w-6 text-[var(--color-mosala-yellow-500)] mb-3" />
                <p className="text-sm text-[var(--color-mosala-dark-300)] mb-3 italic">"{temoignage.quote}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-sm text-[var(--color-mosala-dark-700)]">{temoignage.author}</p>
                    <p className="text-xs text-[var(--color-mosala-dark-300)]">{temoignage.ville} • {temoignage.age}</p>
                  </div>
                  <CheckCircle className="h-4 w-4 text-[var(--color-mosala-green-500)]" />
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <div className="bg-[var(--color-mosala-white)] p-6 rounded-xl shadow-lg border-2 border-[var(--color-mosala-green-200)] max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-[var(--color-mosala-dark-700)] mb-3">
              Prochaines étapes
            </h3>
            <p className="text-sm text-[var(--color-mosala-dark-300)] mb-4">
              La Caravane Mosala a posé les bases. Découvrez nos programmes continus 
              et nos prochains événements pour continuer votre développement professionnel.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-[var(--color-mosala-white)] font-bold shadow hover:from-[var(--color-mosala-green-600)] hover:to-[var(--color-mosala-yellow-600)] transition-all border-2 border-[var(--color-mosala-green-500)]">
                Voir nos formations
              </Button>
              <Button variant="outline" className="border-2 border-[var(--color-mosala-green-500)] text-[var(--color-mosala-green-700)] hover:bg-[var(--color-mosala-green-50)]">
                Prochains événements
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaravaneMosala;