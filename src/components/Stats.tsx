import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

const Stats = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const stats = [
    { count: 5000, suffix: "+", label: "talents inscrits" },
    { count: 1200, suffix: "+", label: "offres publiées" },
    { count: 80, suffix: "%", label: "taux de réponse" },
    { count: 50, suffix: "+", label: "partenaires engagés" }
  ];

  const AnimatedCounter = ({ end, suffix }: { end: number; suffix: string }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
      if (!isInView) return;

      let start = 0;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }, [isInView, end]);

    return (
      <span className="text-3xl md:text-4xl font-bold text-mosala-dark">
        {count.toLocaleString()}{suffix}
      </span>
    );
  };

  return (
    <section className="py-16 bg-gradient-to-br from-mosala-light to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-mosala-dark mb-4">
            L'Impact en Chiffres
          </h2>
        </motion.div>

        <div ref={ref} className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="text-center p-6 bg-white rounded-2xl shadow-lg border border-border"
            >
              <div className="mb-2">
                <AnimatedCounter end={stat.count} suffix={stat.suffix} />
              </div>
              <p className="text-muted-foreground font-medium">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;