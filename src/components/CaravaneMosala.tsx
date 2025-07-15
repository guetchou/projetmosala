import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { MapPin, Clock, Users, Calendar, Quote } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { fetchApi } from "@/api/fetcher";
import { useNavigate } from "react-router-dom";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CaravaneMosala = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    etape: "",
    telephone: "",
    message: "",
    consent: false
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await fetchApi("/caravane", {
        method: "POST",
        body: JSON.stringify(formData)
      });
      setSubmitted(true);
      setTimeout(() => {
        navigate("/confirmation-caravane");
      }, 1200);
    } catch (err) {
      setError("Erreur lors de l'envoi. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  const schedule = [
    { time: "09h00–09h30", activity: "Accueil & Ouverture", responsible: "Équipe Mosala" },
    { time: "09h30–10h30", activity: "Atelier Profil & CV", responsible: "UX/UI Designer" },
    { time: "10h30–11h15", activity: "Formation Recherche", responsible: "Dev Frontend" },
    { time: "11h15–12h00", activity: "Simulation d'entretien", responsible: "Coach RH partenaire" },
    { time: "12h00–13h00", activity: "Pause & Networking", responsible: "—" },
    { time: "13h00–14h00", activity: "Session Chatbot & FAQ", responsible: "Chatbot Engineer" },
    { time: "14h00–15h00", activity: "Atelier Formations & Abonnements", responsible: "Subscription Manager" },
    { time: "15h00–16h00", activity: "Panel Partenaires", responsible: "Représentants officiels" }
  ];

  const cities = [
    "Brazzaville",
    "Pointe-Noire", 
    "Ouesso",
    "Dolisie",
    "Owando",
    "Makoua"
  ];

  const testimonials = [
    {
      quote: "Grâce à l'atelier CV à Pointe-Noire, j'ai appris à mettre en avant mes compétences numériques — j'ai obtenu un stage dès la semaine suivante !",
      author: "Stéphanie",
      age: "22 ans"
    },
    {
      quote: "La simulation d'entretien m'a permis de gagner en confiance. Le coach RH m'a donné des astuces concrètes pour répondre aux questions difficiles.",
      author: "Bertrand",
      age: "25 ans"
    },
    {
      quote: "J'étais sceptique sur l'utilisation d'une plateforme digitale, mais l'équipe Mosala m'a montré que c'était simple et efficace, même avec une connexion bas débit.",
      author: "Rose",
      age: "28 ans"
    }
  ];

  const [open, setOpen] = useState(false);

  return (
    <section className="py-16 bg-gradient-to-br from-mosala-light to-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-mosala-dark mb-6">
            La Caravane Mosala
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Un road-show itinérant à travers les provinces du Congo pour sensibiliser, 
            former et créer du lien entre les institutions et les communautés.
          </p>
        </motion.div>

        {/* Objectives */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
        >
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-border text-center">
            <Users className="h-12 w-12 text-primary mx-auto mb-4" />
            <div className="text-2xl font-bold text-mosala-dark mb-2">10,000+</div>
            <p className="text-muted-foreground">participants informés</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-border text-center">
            <Calendar className="h-12 w-12 text-accent mx-auto mb-4" />
            <div className="text-2xl font-bold text-mosala-dark mb-2">2,000+</div>
            <p className="text-muted-foreground">jeunes formés</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-border text-center">
            <MapPin className="h-12 w-12 text-secondary mx-auto mb-4" />
            <div className="text-2xl font-bold text-mosala-dark mb-2">6</div>
            <p className="text-muted-foreground">villes visitées</p>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-border text-center">
            <Clock className="h-12 w-12 text-destructive mx-auto mb-4" />
            <div className="text-2xl font-bold text-mosala-dark mb-2">8h</div>
            <p className="text-muted-foreground">de formation par étape</p>
          </div>
        </motion.div>

        {/* Schedule */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-mosala-dark mb-8 text-center">
            Programme type d'une étape
          </h3>
          <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-primary text-white">
                  <tr>
                    <th className="p-4 text-left">Horaire</th>
                    <th className="p-4 text-left">Animation</th>
                    <th className="p-4 text-left">Responsable</th>
                  </tr>
                </thead>
                <tbody>
                  {schedule.map((item, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-4 font-medium text-mosala-dark">{item.time}</td>
                      <td className="p-4">{item.activity}</td>
                      <td className="p-4 text-muted-foreground">{item.responsible}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* Testimonials */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold text-mosala-dark mb-8 text-center">
            Témoignages des participants
          </h3>
          <Swiper
            modules={[Navigation, Pagination]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            navigation
            pagination={{ clickable: true }}
            className="caravane-testimonials"
          >
            {testimonials.map((testimonial, index) => (
              <SwiperSlide key={index}>
                <div className="bg-white p-6 rounded-2xl shadow-sm border border-border h-full">
                  <Quote className="h-8 w-8 text-primary mb-4" />
                  <blockquote className="text-mosala-dark mb-4 leading-relaxed">
                    « {testimonial.quote} »
                  </blockquote>
                  <div className="text-primary font-medium">
                    {testimonial.author}, {testimonial.age}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>

        {/* Registration Form - replaced by button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex justify-center"
        >
          <Button
            className="bg-mosala-orange hover:bg-mosala-orange/90 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-lg"
            onClick={() => setOpen(true)}
          >
            Comment participer ?
          </Button>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-lg w-full bg-gradient-to-br from-mosala-light via-white to-mosala-orange-50 p-0 border-0 shadow-2xl rounded-3xl">
              <DialogHeader className="flex flex-col items-center pt-8 pb-2 px-8">
                <img src="/lovable-uploads/logo-mosala1.png" alt="Logo Mosala" width={80} height={80} className="mb-4 drop-shadow-lg" />
                <DialogTitle className="text-2xl font-bold text-mosala-dark text-center mb-2">Comment participer ?</DialogTitle>
                <DialogDescription className="text-center text-mosala-dark/80 mb-4">
                  Remplissez le formulaire pour rejoindre la Caravane Mosala !
                </DialogDescription>
              </DialogHeader>
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-12 px-8">
                  <div className="text-4xl mb-4">🎉</div>
                  <div className="text-lg font-semibold text-mosala-dark mb-2 text-center">Merci pour votre inscription !</div>
                  <div className="text-mosala-dark/80 text-center mb-4">Nous avons bien reçu votre demande. L'équipe Mosala vous contactera prochainement.</div>
                  <DialogClose asChild>
                    <Button type="button" className="w-full mt-2 bg-mosala-orange text-white">Fermer</Button>
                  </DialogClose>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6 px-8 pb-8">
                  <div>
                    <Input
                      type="text"
                      placeholder="Votre nom complet"
                      value={formData.nom}
                      onChange={(e) => setFormData({...formData, nom: e.target.value})}
                      required
                      className="h-12 bg-white/80 border-mosala-orange/30 focus:border-mosala-orange focus:ring-mosala-orange/20 text-mosala-dark"
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder="Votre email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      required
                      className="h-12 bg-white/80 border-mosala-orange/30 focus:border-mosala-orange focus:ring-mosala-orange/20 text-mosala-dark"
                    />
                  </div>
                  <div>
                    <Input
                      type="tel"
                      placeholder="Votre téléphone (optionnel)"
                      value={formData.telephone}
                      onChange={(e) => setFormData({...formData, telephone: e.target.value})}
                      className="h-12 bg-white/80 border-mosala-orange/30 focus:border-mosala-orange focus:ring-mosala-orange/20 text-mosala-dark"
                    />
                  </div>
                  <div>
                    <Select onValueChange={(value) => setFormData({...formData, etape: value})}>
                      <SelectTrigger className="h-12 bg-white/80 border-mosala-orange/30 focus:border-mosala-orange focus:ring-mosala-orange/20 text-mosala-dark">
                        <SelectValue placeholder="Sélectionnez votre ville" />
                      </SelectTrigger>
                      <SelectContent>
                        {cities.map((city) => (
                          <SelectItem key={city} value={city.toLowerCase()}>
                            {city}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <textarea
                      placeholder="Votre message (optionnel)"
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      className="w-full h-24 rounded-xl border border-mosala-orange/30 focus:border-mosala-orange focus:ring-mosala-orange/20 text-mosala-dark bg-white/80 p-3 resize-none"
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="consent"
                      checked={formData.consent}
                      onChange={e => setFormData({...formData, consent: e.target.checked})}
                      required
                      className="accent-mosala-orange w-5 h-5"
                    />
                    <label htmlFor="consent" className="text-mosala-dark/80 text-sm">J'accepte la <a href="/politique-confidentialite" target="_blank" rel="noopener noreferrer" className="underline">politique de confidentialité</a> et le traitement de mes données.</label>
                  </div>
                  {error && <div className="text-red-600 text-center" role="alert">{error}</div>}
                  <Button 
                    type="submit" 
                    className="w-full bg-mosala-orange hover:bg-mosala-orange/90 text-white h-12 font-bold shadow-md"
                    disabled={loading}
                  >
                    {loading ? "Envoi en cours..." : "Je m'inscris à la Caravane"}
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="ghost" className="w-full mt-2 text-mosala-dark/60 hover:text-mosala-dark/90">Annuler</Button>
                  </DialogClose>
                </form>
              )}
            </DialogContent>
          </Dialog>
        </motion.div>
      </div>
    </section>
  );
};

export default CaravaneMosala;