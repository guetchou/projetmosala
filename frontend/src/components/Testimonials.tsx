import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Grace POATY",
    role: "Jeune diplômée",
    quote: "Grâce à Mosala, j'ai trouvé un emploi stable et des formations adaptées à mon projet professionnel !",
    avatar: "/topcenter-uploads/avatars/grace.png",
    color: "#2fdab8",
    bg: "bg-[#2fdab8]/10"
  },
  {
    name: "Jean-Pierre ELENGA",
    role: "Entrepreneur",
    quote: "La caravane Mosala a permis de rencontrer des jeunes motivés et de recruter localement.",
    avatar: "/topcenter-uploads/avatars/jeanpierre.png",
    color: "#6476f3",
    bg: "bg-[#6476f3]/10"
  },
  {
    name: "Nadine SAMBA",
    role: "Formatrice",
    quote: "Un projet qui change la vie des jeunes et dynamise l'emploi au Congo !",
    avatar: "/topcenter-uploads/avatars/nadine.png",
    color: "#fa496e",
    bg: "bg-[#fa496e]/10"
  }
];

export default function Testimonials() {
  return (
    <section className="py-12 bg-[#f6f9fc]">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-black text-[#22304a] text-center mb-8">Témoignages</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
              className={`rounded-2xl shadow-lg p-8 flex flex-col items-center text-center transition hover:scale-105 hover:shadow-2xl ${t.bg}`}
              style={{ color: t.color }}
            >
              <img src={t.avatar} alt={t.name} className="w-20 h-20 rounded-full mb-4 border-4 border-white shadow" />
              <blockquote className="italic text-lg text-[#22304a] mb-4">“{t.quote}”</blockquote>
              <div className="font-bold text-[#22304a]">{t.name}</div>
              <div className="text-sm text-[#22304a]/70">{t.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}