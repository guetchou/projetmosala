import React from "react";

// Candidate dashboard removed — admin-only site.
export default function CandidateApplications() {
  return null;
}
            <Search className="absolute left-3 top-3 h-4 w-4 text-[var(--color-mosala-dark-400)]" />
            <Input
              placeholder="Rechercher une candidature..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les statuts</SelectItem>
              <SelectItem value="pending">En attente</SelectItem>
              <SelectItem value="interview">Entretien</SelectItem>
              <SelectItem value="accepted">Acceptée</SelectItem>
              <SelectItem value="rejected">Refusée</SelectItem>
            </SelectContent>
          </Select>
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Tous les types</SelectItem>
              <SelectItem value="CDI">CDI</SelectItem>
              <SelectItem value="CDD">CDD</SelectItem>
              <SelectItem value="Stage">Stage</SelectItem>
              <SelectItem value="Freelance">Freelance</SelectItem>
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
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Offre</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Entreprise</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Statut</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Date</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Score</TableHead>
                <TableHead className="font-semibold text-[var(--color-mosala-dark-700)]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.map((app) => (
                <TableRow key={app.id} className="hover:bg-[var(--color-mosala-green-50)]/50">
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-[var(--color-mosala-green-100)] rounded-full flex items-center justify-center">
                        <FileText className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
                      </div>
                      <div>
                        <div className="font-semibold text-[var(--color-mosala-dark-700)]">{app.job.title}</div>
                        <div className="flex items-center gap-1 text-sm text-[var(--color-mosala-dark-400)]">
                          <MapPin className="w-4 h-4" />
                          {app.job.city}
                        </div>
                        <div className="text-xs text-[var(--color-mosala-dark-300)]">{app.job.salary}</div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Building className="w-4 h-4 text-[var(--color-mosala-dark-400)]" />
                      <span className="font-medium text-[var(--color-mosala-dark-700)]">{app.job.company}</span>
                    </div>
                    <Badge variant="outline" className="text-xs mt-1">{app.job.type}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getStatusIcon(app.status)}
                      {getStatusBadge(app.status)}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      <div className="flex items-center gap-1 text-sm text-[var(--color-mosala-dark-400)]">
                        <Calendar className="w-4 h-4" />
                        Candidature: {new Date(app.appliedAt).toLocaleDateString('fr-FR')}
                      </div>
                      <div className="flex items-center gap-1 text-xs text-[var(--color-mosala-dark-300)]">
                        <Clock className="w-3 h-3" />
                        MAJ: {new Date(app.lastUpdate).toLocaleDateString('fr-FR')}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className={`font-semibold ${getMatchScoreColor(app.matchScore)}`}>
                        {app.matchScore}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="ghost">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button size="sm" variant="ghost">
                        <MessageSquare className="w-4 h-4" />
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
              <FileText className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Total</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {applications.length}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-yellow-50)] p-4 rounded-xl border border-[var(--color-mosala-yellow-100)]">
            <div className="flex items-center gap-2">
              <Clock className="w-5 h-5 text-[var(--color-mosala-yellow-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">En attente</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {applications.filter(app => app.status === 'pending').length}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-blue-50)] p-4 rounded-xl border border-[var(--color-mosala-blue-100)]">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[var(--color-mosala-blue-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Entretiens</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {applications.filter(app => app.status === 'interview').length}
            </div>
          </div>
          <div className="bg-[var(--color-mosala-green-50)] p-4 rounded-xl border border-[var(--color-mosala-green-100)]">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-[var(--color-mosala-green-600)]" />
              <span className="font-semibold text-[var(--color-mosala-dark-700)]">Acceptées</span>
            </div>
            <div className="text-2xl font-bold text-[var(--color-mosala-dark-700)] mt-2">
              {applications.filter(app => app.status === 'accepted').length}
            </div>
          </div>
        </motion.div>

        {/* Conseils et améliorations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-gradient-to-r from-[var(--color-mosala-green-50)] to-[var(--color-mosala-yellow-50)] p-6 rounded-xl border border-[var(--color-mosala-green-100)]"
        >
          <h3 className="text-lg font-semibold text-[var(--color-mosala-dark-700)] mb-4">
            💡 Conseils pour améliorer vos candidatures
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-[var(--color-mosala-dark-600)]">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>Personnalisez votre CV pour chaque offre</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>Ajoutez une lettre de motivation</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>Mettez à jour vos compétences</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-green-600 mt-0.5" />
              <span>Suivez les entreprises qui vous intéressent</span>
            </div>
          </div>
        </motion.div>
      </div>
    </DashboardLayout>
  );
};

export default CandidateApplications; 