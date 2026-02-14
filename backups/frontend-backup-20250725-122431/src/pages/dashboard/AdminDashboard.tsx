import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Target,
  Building,
  FileText,
  Calendar,
  Award,
  BarChart3,
  PieChart,
  Activity
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import StatsGrid from "@/components/dashboard/StatsGrid";
import ChartCard from "@/components/dashboard/ChartCard";
import ActivityFeed from "@/components/dashboard/ActivityFeed";
import MetricCard from "@/components/dashboard/MetricCard";

// Mock data - à remplacer par des vraies données Supabase
const mockStats = {
  totalUsers: 1247,
  totalJobs: 89,
  totalApplications: 342,
  totalCompanies: 45,
  activeJobs: 67,
  pendingApplications: 23,
  completedTrainings: 156,
  averageRating: 4.2,
};

const mockActivities = [
  {
    id: "1",
    type: "user" as const,
    title: "Nouveau candidat inscrit",
    description: "Marie Dubois s'est inscrite sur la Projet ",
    time: "Il y a 5 minutes",
    icon: Users,
    color: "blue",
  },
  {
    id: "2",
    type: "job" as const,
    title: "Nouvelle offre publiée",
    description: "Développeur Full Stack chez TechCorp",
    time: "Il y a 15 minutes",
    icon: Briefcase,
    color: "green",
  },
  {
    id: "3",
    type: "application" as const,
    title: "Candidature reçue",
    description: "Jean Martin a postulé pour le poste de Designer",
    time: "Il y a 1 heure",
    icon: FileText,
    color: "yellow",
  },
  {
    id: "4",
    type: "company" as const,
    title: "Nouvelle entreprise",
    description: "InnovTech a rejoint la Projet ",
    time: "Il y a 2 heures",
    icon: Building,
    color: "purple",
  },
  {
    id: "5",
    type: "training" as const,
    title: "Formation terminée",
    description: "15 candidats ont terminé le module 'Soft Skills'",
    time: "Il y a 3 heures",
    icon: Award,
    color: "orange",
  },
];

const AdminDashboard = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <DashboardLayout
      title="Dashboard Administrateur"
      subtitle="Vue d'ensemble du projet Mosala"
      role="admin"
    >
      <div className="space-y-8">
        {/* Stats Grid */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mb-6">
              Métriques clés
            </h2>
            <StatsGrid role="admin" stats={mockStats} loading={loading} />
          </motion.div>
        </section>

        {/* Charts Section */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Growth Chart */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <ChartCard
              title="Croissance des utilisateurs"
              subtitle="Évolution sur les 30 derniers jours"
              icon={TrendingUp}
              loading={loading}
            >
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-[var(--color-mosala-green-50)] to-[var(--color-mosala-yellow-50)] rounded-xl border border-[var(--color-mosala-green-200)]">
                <div className="text-center">
                  <BarChart3 className="w-16 h-16 text-[var(--color-mosala-green-600)] mx-auto mb-4" />
                  <p className="text-[var(--color-mosala-dark-400)]">
                    Graphique interactif à implémenter
                  </p>
                </div>
              </div>
            </ChartCard>
          </motion.div>

          {/* Distribution Chart */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <ChartCard
              title="Répartition des utilisateurs"
              subtitle="Par type d'utilisateur"
              icon={PieChart}
              loading={loading}
            >
              <div className="h-64 flex items-center justify-center bg-gradient-to-br from-[var(--color-mosala-blue-50)] to-[var(--color-mosala-purple-50)] rounded-xl border border-[var(--color-mosala-blue-200)]">
                <div className="text-center">
                  <PieChart className="w-16 h-16 text-[var(--color-mosala-blue-600)] mx-auto mb-4" />
                  <p className="text-[var(--color-mosala-dark-400)]">
                    Graphique circulaire à implémenter
                  </p>
                </div>
              </div>
            </ChartCard>
          </motion.div>
        </section>

        {/* Additional Metrics */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <MetricCard
              title="Taux de conversion"
              value="23.4%"
              icon={Target}
              color="purple"
              change={2.1}
              changeLabel="ce mois"
              trend="up"
            >
              <div className="text-xs text-[var(--color-mosala-dark-400)]">
                Candidatures → Emplois
              </div>
            </MetricCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            <MetricCard
              title="Temps de réponse moyen"
              value="2.3 jours"
              icon={Calendar}
              color="blue"
              change={-0.5}
              changeLabel="ce mois"
              trend="up"
            >
              <div className="text-xs text-[var(--color-mosala-dark-400)]">
                Recruteurs → Candidats
              </div>
            </MetricCard>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <MetricCard
              title="Satisfaction utilisateurs"
              value="4.6/5"
              icon={Award}
              color="yellow"
              change={0.2}
              changeLabel="ce mois"
              trend="up"
            >
              <div className="text-xs text-[var(--color-mosala-dark-400)]">
                Note moyenne globale
              </div>
            </MetricCard>
          </motion.div>
        </section>

        {/* Activity Feed */}
        <section>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <Activity className="w-6 h-6 text-[var(--color-mosala-green-600)]" />
              <h2 className="text-2xl font-bold text-[var(--color-mosala-dark-700)]">
                Activité récente
              </h2>
            </div>
            <ActivityFeed activities={mockActivities} loading={loading} />
          </motion.div>
        </section>
      </div>
    </DashboardLayout>
  );
};

export default AdminDashboard; 