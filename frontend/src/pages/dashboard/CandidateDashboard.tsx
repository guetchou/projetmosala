import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Target, 
  Briefcase, 
  TrendingUp, 
  Award,
  FileText,
  Calendar,
  MessageSquare,
  Star,
  CheckCircle,
  Clock
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsGrid from "@/components/dashboard/StatsGrid";
import ChartCard from "@/components/dashboard/ChartCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import MetricCard from "@/components/dashboard/MetricCard";

// Mock data pour le candidat
const mockCandidateStats = {
  totalApplications: 12,
  totalJobs: 45,
  completedTrainings: 3,
  averageRating: 4.2,
  pendingApplications: 4,
  completedApplications: 8,
  profileCompletion: 85,
  daysActive: 23,
};

const mockCandidateActivities = [
  {
    id: "1",
    type: "application" as const,
    title: "Candidature envoyée",
    description: "Poste de Développeur Frontend chez TechCorp",
    time: "Il y a 2 heures",
    icon: FileText,
    color: "green",
  },
  {
    id: "2",
    type: "training" as const,
    title: "Formation terminée",
    description: "Module 'React Avancé' - Certificat obtenu",
    time: "Hier",
    icon: Award,
    color: "yellow",
  },
  {
    id: "3",
    type: "message" as const,
    title: "Message reçu",
    description: "TechCorp souhaite un entretien",
    time: "Il y a 1 jour",
    icon: MessageSquare,
    color: "blue",
  },
  {
    id: "4",
    type: "achievement" as const,
    title: "Objectif atteint",
    description: "5 candidatures envoyées ce mois",
    time: "Il y a 2 jours",
    icon: Target,
    color: "purple",
  },
  {
    id: "5",
    type: "job" as const,
    title: "Nouvelle offre consultée",
    description: "Développeur Full Stack - StartupXYZ",
    time: "Il y a 3 jours",
    icon: Briefcase,
    color: "orange",
  },
];

const CandidateDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout
      title="Mon Dashboard"
      subtitle="Suivez votre progression professionnelle"
      role="candidate"
    >
      <div className="space-y-8">
        {/* Welcome Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] rounded-2xl p-6 text-white"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <Target className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Bonjour, Marie !</h2>
              <p className="text-white/90">
                Continuez votre progression vers votre prochain emploi
              </p>
            </div>
          </div>
        </motion.section>

        {/* Stats Grid */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mb-6">
              Mes statistiques
            </h2>
            <StatsGrid role="candidate" stats={mockCandidateStats} loading={loading} />
          </motion.div>
        </section>

        {/* Progress Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ChartCard
              title="Progression de carrière"
              subtitle="Objectifs et réalisations"
              icon={TrendingUp}
              loading={loading}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Profil complet</span>
                  <span className="text-sm font-bold text-[var(--color-mosala-green-600)]">
                    {mockCandidateStats.profileCompletion}%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] h-2 rounded-full transition-all duration-300"
                    style={{ width: `${mockCandidateStats.profileCompletion}%` }}
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="text-center p-4 bg-[var(--color-mosala-green-50)] rounded-xl border border-[var(--color-mosala-green-200)]">
                    <CheckCircle className="w-8 h-8 text-[var(--color-mosala-green-600)] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)]">
                      {mockCandidateStats.completedApplications}
                    </div>
                    <div className="text-sm text-[var(--color-mosala-dark-400)]">
                      Candidatures acceptées
                    </div>
                  </div>
                  
                  <div className="text-center p-4 bg-[var(--color-mosala-yellow-50)] rounded-xl border border-[var(--color-mosala-yellow-200)]">
                    <Clock className="w-8 h-8 text-[var(--color-mosala-yellow-600)] mx-auto mb-2" />
                    <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)]">
                      {mockCandidateStats.pendingApplications}
                    </div>
                    <div className="text-sm text-[var(--color-mosala-dark-400)]">
                      En attente
                    </div>
                  </div>
                </div>
              </div>
            </ChartCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <ChartCard
              title="Compétences et formations"
              subtitle="Développement continu"
              icon={Award}
              loading={loading}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[var(--color-mosala-blue-50)] rounded-xl border border-[var(--color-mosala-blue-200)]">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-[var(--color-mosala-blue-600)]" />
                    <span className="font-medium">React Avancé</span>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-mosala-blue-600)]">
                    ✓ Terminé
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[var(--color-mosala-green-50)] rounded-xl border border-[var(--color-mosala-green-200)]">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
                    <span className="font-medium">Soft Skills</span>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-mosala-green-600)]">
                    ✓ Terminé
                  </span>
                </div>
                
                <div className="flex items-center justify-between p-4 bg-[var(--color-mosala-yellow-50)] rounded-xl border border-[var(--color-mosala-yellow-200)]">
                  <div className="flex items-center gap-3">
                    <Star className="w-5 h-5 text-[var(--color-mosala-yellow-600)]" />
                    <span className="font-medium">Node.js Backend</span>
                  </div>
                  <span className="text-sm font-bold text-[var(--color-mosala-yellow-600)]">
                    75%
                  </span>
                </div>
              </div>
            </ChartCard>
          </motion.div>
        </section>

        {/* Quick Actions */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mb-6">
              Actions rapides
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white rounded-2xl border-2 border-[var(--color-mosala-green-200)] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Briefcase className="w-8 h-8 text-[var(--color-mosala-green-600)] mb-4" />
                <h3 className="text-lg font-bold text-[var(--color-mosala-dark-700)] mb-2">
                  Postuler à une offre
                </h3>
                <p className="text-[var(--color-mosala-dark-400)] mb-4">
                  Découvrez les nouvelles offres d'emploi
                </p>
                <button className="text-[var(--color-mosala-green-600)] font-semibold hover:underline">
                  Voir les offres →
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white rounded-2xl border-2 border-[var(--color-mosala-blue-200)] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <FileText className="w-8 h-8 text-[var(--color-mosala-blue-600)] mb-4" />
                <h3 className="text-lg font-bold text-[var(--color-mosala-dark-700)] mb-2">
                  Mettre à jour mon CV
                </h3>
                <p className="text-[var(--color-mosala-dark-400)] mb-4">
                  Améliorez votre profil pour plus de visibilité
                </p>
                <button className="text-[var(--color-mosala-blue-600)] font-semibold hover:underline">
                  Modifier le CV →
                </button>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02 }}
                className="p-6 bg-white rounded-2xl border-2 border-[var(--color-mosala-yellow-200)] shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
              >
                <Award className="w-8 h-8 text-[var(--color-mosala-yellow-600)] mb-4" />
                <h3 className="text-lg font-bold text-[var(--color-mosala-dark-700)] mb-2">
                  Suivre une formation
                </h3>
                <p className="text-[var(--color-mosala-dark-400)] mb-4">
                  Développez vos compétences avec nos formations
                </p>
                <button className="text-[var(--color-mosala-yellow-600)] font-semibold hover:underline">
                  Voir les formations →
                </button>
              </motion.div>
            </div>
          </motion.div>
        </section>

        {/* Activity Feed */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mb-6">
              Activité récente
            </h2>
            <ActivityFeed activities={mockCandidateActivities} loading={loading} />
          </motion.div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default CandidateDashboard; 