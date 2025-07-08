import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Users, Briefcase } from "lucide-react";

const Hero = () => {
  const stats = [
    { icon: Users, label: "Candidats inscrits", value: "15,000+" },
    { icon: Briefcase, label: "Offres d'emploi", value: "2,500+" },
    { icon: MapPin, label: "Villes couvertes", value: "50+" },
  ];

  return (
    <section className="relative bg-gradient-to-br from-mosala-light via-white to-mosala-yellow/10 py-20 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-mosala-yellow/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-mosala-green/20 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold text-mosala-dark leading-tight">
                Votre 
                <span className="bg-gradient-primary bg-clip-text text-transparent"> avenir</span> 
                <br />
                commence ici
              </h1>
              <p className="text-xl text-muted-foreground max-w-lg">
                MOSALA connecte les talents africains aux opportunités d'emploi et de formation. 
                Développons ensemble l'employabilité de la jeunesse congolaise.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 text-white shadow-mosala group"
              >
                Trouver un emploi
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-primary text-primary hover:bg-primary hover:text-white"
              >
                Recruter des talents
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-2">
                    <stat.icon className="h-6 w-6 text-primary" />
                  </div>
                  <div className="text-2xl font-bold text-mosala-dark">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Content - Hero Image */}
          <div className="relative">
            <div className="bg-gradient-mosala p-1 rounded-2xl shadow-glow">
              <div className="bg-white rounded-xl p-8 h-96 flex items-center justify-center">
                <img 
                  src="/lovable-uploads/5bb30d09-549a-4a0a-bac8-8d0a4676c344.png" 
                  alt="MOSALA en action" 
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
            
            {/* Floating elements */}
            <div className="absolute -top-4 -right-4 bg-mosala-yellow text-mosala-dark p-3 rounded-full font-bold text-sm shadow-lg animate-bounce">
              Nouveau!
            </div>
            <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg border">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-mosala-green rounded-full animate-pulse"></div>
                <span className="text-sm font-medium">Matching en temps réel</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;