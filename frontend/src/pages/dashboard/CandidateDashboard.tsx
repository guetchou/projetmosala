import React from "react";

// Candidate dashboard removed — admin-only site.
export default function CandidateDashboard() {
  return null;
}
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