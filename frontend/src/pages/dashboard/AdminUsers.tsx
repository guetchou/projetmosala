import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Users, 
  Search, 
  Filter, 
  MoreVertical, 
  Edit, 
  Trash2, 
  Eye,
  UserPlus,
  Download,
  Mail,
  Shield,
  Calendar
} from "lucide-react";
import DashboardLayout from "@/components/dashboard/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock data - à remplacer par API réelle
const mockUsers = [
  {
    id: 1,
    name: "Jean Likibi",
    email: "jean@mosala.org",
    role: "candidat",
    status: "active",
    createdAt: "2024-01-15",
    lastLogin: "2024-03-20",
    applications: 12,
    profileCompletion: 85
  },
  {
    id: 2,
    name: "Aïssa M'Bemba",
    email: "aissa@mosala.org",
    role: "recruteur",
    status: "active",
    createdAt: "2024-02-01",
    lastLogin: "2024-03-19",
    jobsPosted: 8,
    company: "TechCongo"
  },
  {
    id: 3,
    name: "Pauline Ondzaba",
    email: "pauline@mosala.org",
    role: "admin",
    status: "active",
    createdAt: "2024-01-10",
    lastLogin: "2024-03-20",
    actionsPerformed: 156
  },
  {
    id: 4,
    name: "Marie Dubois",
    email: "marie@example.com",
    role: "candidat",
    status: "pending",
    createdAt: "2024-03-18",
    lastLogin: "2024-03-18",
    applications: 3,
    profileCompletion: 45
  },
  {
    id: 5,
    name: "Pierre Nkouka",
    email: "pierre@techcorp.cg",
    role: "recruteur",
    status: "active",
    createdAt: "2024-02-15",
    lastLogin: "2024-03-17",
    jobsPosted: 15,
    company: "TechCorp"
  }
];

const AdminUsers = () => {
  const [users, setUsers] = useState(mockUsers);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [loading, setLoading] = useState(false);

  const filteredUsers = users.filter(user => {
    const matchSearch = user.name.toLowerCase().includes(search.toLowerCase()) || 
                       user.email.toLowerCase().includes(search.toLowerCase());
    const matchRole = roleFilter === "all" || user.role === roleFilter;
    const matchStatus = statusFilter === "all" || user.status === statusFilter;
    return matchSearch && matchRole && matchStatus;
  });

  const getRoleBadge = (role: string) => {
    const colors = {
      candidat: "bg-gray-600 text-white",
      recruteur: "bg-gray-500 text-white",
      admin: "bg-gray-700 text-white"
    };
    return <Badge className={colors[role as keyof typeof colors] || "bg-gray-500"}>{role}</Badge>;
  };

  const getStatusBadge = (status: string) => {
    const colors = {
      active: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      inactive: "bg-red-100 text-red-800"
    };
    return <Badge className={colors[status as keyof typeof colors] || "bg-gray-100 text-gray-800"}>{status}</Badge>;
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(prev => prev.filter(user => user.id !== userId));
  };

  return (
    <DashboardLayout
      title="Gestion des Utilisateurs"
      subtitle="Gérez les comptes utilisateurs et leurs permissions"
      role="admin"
    >
      <div className="space-y-6">
        {/* Header avec actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4"
        >
          <div>
            <h2 className="text-2xl font-bold text-[var(--color-mosala-dark-700)]">
              {filteredUsers.length} utilisateur{filteredUsers.length > 1 ? 's' : ''}
            </h2>
            <p className="text-[var(--color-mosala-dark-400)]">
              Gérez les comptes et les permissions
            </p>
          </div>
          <div className="flex gap-2">
            <Button className="bg-[var(--color-mosala-green-500)] hover:bg-[var(--color-mosala-green-600)] text-white">
              <UserPlus className="w-4 h-4 mr-2" />
              Ajouter un utilisateur
            </Button>
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Exporter
            </Button>
          </div>
        </motion.div>

        {/* Filtres */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="flex flex-col md:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--color-mosala-dark-400)]" />
            <Input
              placeholder="Rechercher un utilisateur..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={roleFilter} onValueChange={setRoleFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Rôle" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les rôles</SelectItem>
              <SelectItem value="candidat">Candidats</SelectItem>
              <SelectItem value="recruteur">Recruteurs</SelectItem>
              <SelectItem value="admin">Administrateurs</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="active">Actif</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="inactive">Inactif</SelectItem>
            </SelectContent>
          </Select>
        </motion.div>

        {/* Tableau */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="bg-white rounded-xl shadow-lg border border-[var(--color-mosala-green-100)] overflow-hidden"
        >
          <Table>
            <TableHeader>
              <TableRow className="bg-[var(--color-mosala-green-50)]">
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Utilisateur</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Rôle</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Statut</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Inscription</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Dernière connexion</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id} className="hover:bg-[var(--color-mosala-green-50)]/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-mosala-green-100)] rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-mosala-dark-700)]">{user.name}</div>
                        <div className="text-sm text-[var(--color-mosala-dark-400)]">{user.email}</div>
                        {user.role === "recruteur" && user.company && (
                          <div className="text-xs text-[var(--color-mosala-dark-300)]">{user.company}</div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    {getRoleBadge(user.role)}
                  </TableCell>
                  <TableCell>
                    {getStatusBadge(user.status)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-[var(--color-mosala-dark-400)]">
                      <Calendar className="w-4 h-4" />
                      {new Date(user.createdAt).toLocaleDateString('fr-FR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-sm text-[var(--color-mosala-dark-400)]">
                      <Calendar className="w-4 h-4" />
                      {new Date(user.lastLogin).toLocaleDateString('fr-FR')}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost" 
                        onClick={() => handleDeleteUser(user.id)}
                        className="text-red-600 hover:text-red-700"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>

        {/* Statistiques rapides */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
        >
          <div className="bg-[var(--color-mosala-green-50)] p-4 rounded-xl border border-[var(--color-mosala-green-100)]">
            <div className="flex items-center gap-2">
              <Users className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Total</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {users.length}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-yellow-50)] p-4 rounded-xl border border-[var(--color-mosala-yellow-100)]">
            <div className="flex items-center gap-2">
              <Shield className="w-5 h-5 text-[var(--color-mosala-yellow-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Actifs</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {users.filter(u => u.status === 'active').length}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-orange-50)] p-4 rounded-xl border border-[var(--color-mosala-orange-100)]">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-[var(--color-mosala-orange-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">En attente</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {users.filter(u => u.status === 'pending').length}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-red-50)] p-4 rounded-xl border border-[var(--color-mosala-red-100)]">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-mosala-red-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Ce mois</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {users.filter(u => new Date(u.createdAt).getMonth() === new Date().getMonth()).length}
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default AdminUsers; 