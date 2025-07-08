import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { MapPin, Clock, Users, Calendar, Quote } from "lucide-react";
import { useState } from "react";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CaravaneMosala = () => {
  const [formData, setFormData] = useState({
    nom: "",
    email: "",
    etape: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Inscription Caravane:", formData);
    // Handle form submission
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

        {/* Registration Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl mx-auto"
        >
          <div className="bg-white p-8 rounded-2xl shadow-lg border border-border">
            <h3 className="text-2xl font-bold text-mosala-dark mb-6 text-center">
              Comment participer ?
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Input
                  type="text"
                  placeholder="Votre nom complet"
                  value={formData.nom}
                  onChange={(e) => setFormData({...formData, nom: e.target.value})}
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Input
                  type="email"
                  placeholder="Votre email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                  className="h-12"
                />
              </div>
              <div>
                <Select onValueChange={(value) => setFormData({...formData, etape: value})}>
                  <SelectTrigger className="h-12">
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
              <Button 
                type="submit" 
                className="w-full bg-mosala-orange hover:bg-mosala-orange/90 text-white h-12"
              >
                Je m'inscris à la Caravane
              </Button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CaravaneMosala;