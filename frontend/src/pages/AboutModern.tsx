import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Award, Briefcase, CheckCircle, Globe, Heart, Shield, Users } from 'lucide-react';
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

const values = [
  {
    title: 'Inclusion',
    description: "Favoriser l'accès aux opportunités pour toute la jeunesse congolaise.",
    icon: Heart,
  },
  {
    title: 'Excellence',
    description: 'Allier exigence, accompagnement humain et formation utile.',
    icon: Award,
  },
  {
    title: 'Sécurité',
    description: 'Protéger les données et assurer un usage responsable de la plateforme.',
    icon: Shield,
  },
  {
    title: 'Ouverture',
    description: 'Relier acteurs publics, privés et partenaires de développement.',
    icon: Globe,
  },
];

const missionPoints = [
  'Former, orienter et connecter les jeunes aux employeurs.',
  'Déployer la caravane Mosala dans plusieurs villes du Congo.',
  'Soutenir l’insertion, l’entrepreneuriat et l’autonomie durable.',
];

const StructuredData = () => {
  useEffect(() => {
    const payload = {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Mosala',
      url: 'https://mosala.cg',
      description:
        "Projet d'insertion professionnelle financé par l'AFD et l'Union Européenne, dédié à la jeunesse congolaise.",
    };

    const existingScript = document.querySelector('script[data-structured-data="mosala"]');
    if (existingScript) {
      existingScript.remove();
    }

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.setAttribute('data-structured-data', 'mosala');
    script.textContent = JSON.stringify(payload);
    document.head.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return null;
};

const AboutModern = () => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-green-50">
      <StructuredData />
      <Navbar />

      <section className="relative overflow-hidden px-6 pb-16 pt-32">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/40 via-green-50/30 to-yellow-50/30" />
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              'radial-gradient(circle at 20% 20%, rgba(34,197,94,0.12) 0, transparent 28%), radial-gradient(circle at 80% 30%, rgba(234,179,8,0.12) 0, transparent 24%)',
          }}
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0.2 : 0.6 }}
          className="relative mx-auto max-w-5xl text-center"
        >
          <div className="mx-auto mb-8 flex h-24 w-24 items-center justify-center rounded-3xl bg-gradient-to-r from-green-500 to-yellow-500 shadow-xl">
            <Users className="h-12 w-12 text-white" />
          </div>
          <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-gray-900 md:text-7xl">
            À propos de Mosala
          </h1>
          <p className="mx-auto max-w-3xl text-lg leading-relaxed text-gray-600 md:text-2xl">
            Une plateforme d’insertion professionnelle pensée pour accompagner la jeunesse
            congolaise vers l’emploi, la formation et l’autonomie.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <div className="rounded-3xl bg-white p-8 shadow-sm ring-1 ring-gray-100">
            <div className="mb-6 flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                <Briefcase className="h-7 w-7" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">Notre mission</h2>
                <p className="text-sm text-gray-500">Accompagner vers une insertion durable.</p>
              </div>
            </div>

            <div className="space-y-4">
              {missionPoints.map((point) => (
                <div key={point} className="flex gap-3 rounded-2xl bg-gray-50 p-4">
                  <CheckCircle className="mt-0.5 h-5 w-5 text-green-600" />
                  <p className="text-gray-700">{point}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-3xl bg-gray-900 p-8 text-white shadow-sm">
            <h2 className="mb-4 text-2xl font-bold">Engagement</h2>
            <p className="text-gray-300">
              Mosala articule accompagnement humain, outils numériques et partenariats terrain pour
              rendre l’orientation et l’accès à l’emploi plus concrets.
            </p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 py-12">
        <div className="mb-8 max-w-2xl">
          <h2 className="text-3xl font-bold text-gray-900">Nos valeurs</h2>
          <p className="mt-2 text-gray-600">
            Une base opérationnelle claire pour un projet public utile, lisible et responsable.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {values.map((value) => {
            const Icon = value.icon;
            return (
              <div key={value.title} className="rounded-3xl bg-white p-6 shadow-sm ring-1 ring-gray-100">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-green-100 text-green-700">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mb-2 text-xl font-semibold text-gray-900">{value.title}</h3>
                <p className="text-sm leading-6 text-gray-600">{value.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutModern;
