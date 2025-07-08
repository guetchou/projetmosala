import Navbar from "@/components/Navbar";
import Hero from "@/components/ui/Hero";
import Mission from "@/components/Mission";
import Stats from "@/components/Stats";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Newsletter from "@/components/Newsletter";
import CaravaneMosala from "@/components/CaravaneMosala";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Mission />
      <Stats />
      <Features />
      <Testimonials />
      <CTA />
      <Newsletter />
      <CaravaneMosala />
      <Footer />
    </div>
  );
};

export default Index;
