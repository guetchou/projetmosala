import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Info } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-16 mosala-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-[var(--color-mosala-white)]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-[var(--color-mosala-white)]/10 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto"
        >
          <h2 className="text-3xl md:text-5xl font-bold text-[var(--color-mosala-white)] mb-6">
            Prêt à Rejoindre Mosala ?
          </h2>
          <p className="text-xl text-[var(--color-mosala-white)]/90 mb-8 leading-relaxed">
            Inscrivez-vous gratuitement et donnez vie à vos projets professionnels.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-[var(--color-mosala-white)] text-[var(--color-mosala-dark-500)] hover:bg-[var(--color-mosala-white)]/90 shadow-glow group"
            >
              Je m'inscris maintenant
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-[var(--color-mosala-white)] text-[var(--color-mosala-white)] hover:bg-[var(--color-mosala-white)] hover:text-[var(--color-mosala-dark-500)]"
            >
              <Info className="mr-2 h-5 w-5" />
              En savoir plus
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default CTA;