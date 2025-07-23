import { motion } from "framer-motion";
import { 
  Users, 
  Briefcase, 
  TrendingUp, 
  Target,
  Building,
  FileText,
  Calendar,
  Award
} from "lucide-react";
import MetricCard from "./MetricCard";

interface StatsGridProps {
  role: "admin" | "candidate" | "recruiter";
  stats: {
    totalUsers?: number;
    totalJobs?: number;
    totalApplications?: number;
    totalCompanies?: number;
    activeJobs?: number;
    pendingApplications?: number;
    completedTrainings?: number;
    averageRating?: number;
  };
  loading?: boolean;
}

const StatsGrid = ({ role, stats, loading = false }: StatsGridProps) => {
  const getStatsForRole = () => {
    switch (role) {
      case "admin":
        return [
          {
            title: "Utilisateurs totaux",
            value: stats.totalUsers || 0,
            icon: Users,
            color: "blue" as const,
            change: 12,
            changeLabel: "ce mois",
          },
          {
            title: "Offres actives",
            value: stats.totalJobs || 0,
            icon: Briefcase,
            color: "green" as const,
            change: 8,
            changeLabel: "ce mois",
          },
          {
            title: "Candidatures",
            value: stats.totalApplications || 0,
            icon: FileText,
            color: "yellow" as const,
            change: 15,
            changeLabel: "ce mois",
          },
          {
            title: "Entreprises",
            value: stats.totalCompanies || 0,
            icon: Building,
            color: "purple" as const,
            change: 5,
            changeLabel: "ce mois",
          },
        ];
      
      case "candidate":
        return [
          {
            title: "Candidatures envoyées",
            value: stats.totalApplications || 0,
            icon: FileText,
            color: "green" as const,
            change: 3,
            changeLabel: "ce mois",
          },
          {
            title: "Offres consultées",
            value: stats.totalJobs || 0,
            icon: Briefcase,
            color: "blue" as const,
            change: 25,
            changeLabel: "ce mois",
          },
          {
            title: "Formations suivies",
            value: stats.completedTrainings || 0,
            icon: Award,
            color: "yellow" as const,
            change: 2,
            changeLabel: "ce mois",
          },
          {
            title: "Note moyenne",
            value: `${stats.averageRating || 0}/5`,
            icon: Target,
            color: "purple" as const,
            change: 0.3,
            changeLabel: "ce mois",
          },
        ];
      
      case "recruiter":
        return [
          {
            title: "Offres publiées",
            value: stats.totalJobs || 0,
            icon: Briefcase,
            color: "green" as const,
            change: 4,
            changeLabel: "ce mois",
          },
          {
            title: "Candidatures reçues",
            value: stats.totalApplications || 0,
            icon: FileText,
            color: "blue" as const,
            change: 18,
            changeLabel: "ce mois",
          },
          {
            title: "Candidatures en attente",
            value: stats.pendingApplications || 0,
            icon: Calendar,
            color: "yellow" as const,
            change: -5,
            changeLabel: "ce mois",
          },
          {
            title: "Taux de conversion",
            value: "68%",
            icon: TrendingUp,
            color: "purple" as const,
            change: 12,
            changeLabel: "ce mois",
          },
        ];
      
      default:
        return [];
    }
  };

  const statsForRole = getStatsForRole();

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsForRole.map((stat, index) => (
        <motion.div
          key={stat.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          <MetricCard
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            change={stat.change}
            changeLabel={stat.changeLabel}
            trend={stat.change > 0 ? "up" : stat.change < 0 ? "down" : "neutral"}
            loading={loading}
          />
        </motion.div>
      ))}
    </div>
  );
};

export default StatsGrid; 