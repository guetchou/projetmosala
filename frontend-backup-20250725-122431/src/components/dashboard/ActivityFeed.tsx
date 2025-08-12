import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Clock, User, Building, MapPin } from "lucide-react";

interface Activity {
  id: string;
  type: "application" | "job_posted" | "profile_updated" | "message";
  title: string;
  description: string;
  timestamp: string;
  user?: {
    name: string;
    avatar?: string;
  };
  company?: string;
  location?: string;
  status?: "pending" | "approved" | "rejected";
}

export default function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([
    {
      id: "1",
      type: "application",
      title: "Nouvelle candidature",
      description: "Candidature reçue pour le poste de Développeur Frontend",
      timestamp: "2024-01-15T10:30:00Z",
      user: {
        name: "Jean Dupont",
        avatar: "/avatars/jean.jpg"
      },
      company: "TechCorp",
      location: "Paris",
      status: "pending"
    },
    {
      id: "2",
      type: "job_posted",
      title: "Nouveau poste publié",
      description: "Poste de Chef de Projet publié",
      timestamp: "2024-01-15T09:15:00Z",
      company: "InnovTech",
      location: "Lyon"
    },
    {
      id: "3",
      type: "profile_updated",
      title: "Profil mis à jour",
      description: "Compétences et expérience mises à jour",
      timestamp: "2024-01-15T08:45:00Z",
      user: {
        name: "Marie Martin",
        avatar: "/avatars/marie.jpg"
      }
    }
  ]);

  const getActivityIcon = (type: Activity["type"]) => {
    switch (type) {
      case "application":
        return <User className="w-4 h-4" />;
      case "job_posted":
        return <Building className="w-4 h-4" />;
      case "profile_updated":
        return <User className="w-4 h-4" />;
      case "message":
        return <Clock className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getStatusColor = (status?: Activity["status"]) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800";
      case "rejected":
        return "bg-red-100 text-red-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffInHours = (now.getTime() - date.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return "À l'instant";
    } else if (diffInHours < 24) {
      return `Il y a ${Math.floor(diffInHours)}h`;
    } else {
      return date.toLocaleDateString("fr-FR");
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Clock className="w-5 h-5" />
          Activité récente
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
            <div className="flex-shrink-0">
              <Avatar className="w-8 h-8">
                {activity.user?.avatar ? (
                  <AvatarImage src={activity.user.avatar} alt={activity.user.name} />
                ) : (
                  <AvatarFallback className="bg-mosala-green-100 text-mosala-green-800">
                    {getActivityIcon(activity.type)}
                  </AvatarFallback>
                )}
              </Avatar>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-medium text-gray-900">{activity.title}</h4>
                  <p className="text-sm text-gray-600 mt-1">{activity.description}</p>
                  
                  <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                    {activity.company && (
                      <span className="flex items-center gap-1">
                        <Building className="w-3 h-3" />
                        {activity.company}
                      </span>
                    )}
                    {activity.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {activity.location}
                      </span>
                    )}
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {formatTimestamp(activity.timestamp)}
                    </span>
                  </div>
                </div>
                
                {activity.status && (
                  <Badge className={`text-xs ${getStatusColor(activity.status)}`}>
                    {activity.status === "pending" && "En attente"}
                    {activity.status === "approved" && "Approuvé"}
                    {activity.status === "rejected" && "Rejeté"}
                  </Badge>
                )}
              </div>
              
              {activity.type === "application" && (
                <div className="flex gap-2 mt-3">
                  <Button size="sm" variant="outline">
                    Voir détails
                  </Button>
                  <Button size="sm" variant="outline">
                    Contacter
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
        
        <Button variant="outline" className="w-full mt-4">
          Voir toute l'activité
        </Button>
      </CardContent>
    </Card>
  );
} 