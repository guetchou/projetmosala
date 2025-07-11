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
        <div className="bg-[var(--color-mosala-white)] rounded-2xl shadow-lg p-8 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-4 text-[var(--color-mosala-green-700)]">Restez informé</h2>
          <p className="mb-6 text-[var(--color-mosala-dark-700)]">Recevez les dernières offres et actualités Mosala directement dans votre boîte mail.</p>
          <form className="flex flex-col sm:flex-row gap-4">
            <input type="email" placeholder="Votre email" className="flex-1 px-4 py-3 rounded-lg border border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)] shadow-inner text-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-mosala-green-300)]" required />
            <button type="submit" className="px-6 py-3 rounded-lg bg-[var(--color-mosala-green-500)] text-[var(--color-mosala-white)] font-semibold hover:bg-[var(--color-mosala-green-600)] transition text-lg focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[var(--color-mosala-green-300)]">S'inscrire</button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;