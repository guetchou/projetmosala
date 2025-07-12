import { motion } from "framer-motion";
import { 
  User, 
  Briefcase, 
  FileText, 
  Building, 
  Calendar,
  MessageSquare,
  Award,
  TrendingUp
} from "lucide-react";

interface Activity {
  id: string;
  type: "user" | "job" | "application" | "company" | "training" | "message" | "achievement" | "trend";
  title: string;
  description: string;
  time: string;
  icon: any;
  color: string;
}

interface ActivityFeedProps {
  activities: Activity[];
  loading?: boolean;
}

const ActivityFeed = ({ activities, loading = false }: ActivityFeedProps) => {
  const getActivityIcon = (type: string) => {
    switch (type) {
      case "user":
        return User;
      case "job":
        return Briefcase;
      case "application":
        return FileText;
      case "company":
        return Building;
      case "training":
        return Calendar;
      case "message":
        return MessageSquare;
      case "achievement":
        return Award;
      case "trend":
        return TrendingUp;
      default:
        return User;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "user":
        return "bg-blue-100 text-blue-600 border-blue-200";
      case "job":
        return "bg-green-100 text-green-600 border-green-200";
      case "application":
        return "bg-yellow-100 text-yellow-600 border-yellow-200";
      case "company":
        return "bg-purple-100 text-purple-600 border-purple-200";
      case "training":
        return "bg-orange-100 text-orange-600 border-orange-200";
      case "message":
        return "bg-indigo-100 text-indigo-600 border-indigo-200";
      case "achievement":
        return "bg-pink-100 text-pink-600 border-pink-200";
      case "trend":
        return "bg-emerald-100 text-emerald-600 border-emerald-200";
      default:
        return "bg-gray-100 text-gray-600 border-gray-200";
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl border border-[var(--color-mosala-green-100)]">
            <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse" />
            <div className="flex-1 space-y-2">
              <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
              <div className="h-3 bg-gray-200 rounded animate-pulse w-1/2" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {activities.map((activity, index) => {
        const Icon = getActivityIcon(activity.type);
        const colorClasses = getActivityColor(activity.type);

        return (
          <motion.div
            key={activity.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex items-start gap-4 p-4 bg-white rounded-xl border border-[var(--color-mosala-green-100)] hover:shadow-md transition-shadow duration-200 group"
          >
            {/* Icon */}
            <div className={`p-2 rounded-lg border ${colorClasses} group-hover:scale-110 transition-transform duration-200`}>
              <Icon className="w-4 h-4" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-semibold text-[var(--color-mosala-dark-700)] mb-1">
                {activity.title}
              </h4>
              <p className="text-sm text-[var(--color-mosala-dark-400)] mb-2">
                {activity.description}
              </p>
              <span className="text-xs text-[var(--color-mosala-dark-300)]">
                {activity.time}
              </span>
            </div>

            {/* Time indicator */}
            <div className="flex flex-col items-end">
              <div className="w-2 h-2 bg-[var(--color-mosala-green-500)] rounded-full mb-2" />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ActivityFeed; 