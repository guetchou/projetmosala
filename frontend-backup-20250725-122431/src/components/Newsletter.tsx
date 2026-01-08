import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, CheckCircle, TrendingUp, FileText } from "lucide-react";
import { useState } from "react";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate subscription
    setIsSubscribed(true);
    setTimeout(() => setIsSubscribed(false), 3000);
    setEmail("");
  };

  const benefits = [
    { icon: TrendingUp, text: "Tendances emploi au Congo" },
    { icon: FileText, text: "Conseils CV & entretien" },
    { icon: CheckCircle, text: "Nouveautés Mosala" }
  ];

  return (
    <section className="py-12 bg-[var(--color-mosala-green-50)]">
      <div className="container mx-auto px-4">
        <div className="bg-[var(--color-mosala-white)] rounded-xl shadow-lg p-6 max-w-2xl mx-auto border-2 border-[var(--color-mosala-green-200)]">
          <h2 className="text-xl md:text-2xl font-bold mb-3 text-[var(--color-mosala-green-700)]">Restez informé</h2>
          <p className="mb-4 text-sm text-[var(--color-mosala-dark-700)]">Recevez les dernières offres et actualités Mosala directement dans votre boîte mail.</p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4">
            <Input 
              type="email" 
              placeholder="Votre email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 border-2 border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)]" 
              required 
            />
            <Button 
              type="submit" 
              className="bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] font-semibold hover:bg-[var(--color-mosala-green-600)] transition-colors border-2 border-[var(--color-mosala-green-500)]"
            >
              <Mail className="w-4 h-4 mr-2" />
              S'inscrire
            </Button>
          </form>

          {isSubscribed && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 text-[var(--color-mosala-green-600)] text-sm font-medium"
            >
              <CheckCircle className="w-4 h-4" />
              Inscription réussie !
            </motion.div>
          )}

          <div className="flex flex-wrap gap-4 text-xs text-[var(--color-mosala-dark-600)]">
            {benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2">
                <benefit.icon className="w-3 h-3 text-[var(--color-mosala-green-500)]" />
                <span>{benefit.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;