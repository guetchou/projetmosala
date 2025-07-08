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
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-mosala-dark mb-4">
              Restez Informé·e
            </h2>
            <p className="text-lg text-muted-foreground mb-6">
              Abonnez-vous à notre newsletter mensuelle :
            </p>
            
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <motion.div
                  key={benefit.text}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="flex items-center space-x-3"
                >
                  <benefit.icon className="h-5 w-5 text-primary" />
                  <span className="text-mosala-dark">{benefit.text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right content - Newsletter form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white p-8 rounded-2xl shadow-lg border border-border"
          >
            <div className="text-center mb-6">
              <Mail className="h-12 w-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold text-mosala-dark">Newsletter Mosala</h3>
            </div>

            {isSubscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-8"
              >
                <CheckCircle className="h-16 w-16 text-mosala-green mx-auto mb-4" />
                <h4 className="text-lg font-bold text-mosala-dark mb-2">Merci !</h4>
                <p className="text-muted-foreground">Votre inscription a été confirmée.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="email"
                  placeholder="votre.email@exemple.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="h-12"
                />
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-primary hover:opacity-90 text-white h-12"
                >
                  S'abonner à la newsletter
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;