import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';

export default function SuperAdminRegister() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (formData.password !== formData.confirmPassword) {
      setError('Les mots de passe ne correspondent pas');
      setLoading(false);
      return;
    }

    if (formData.password.length < 8) {
      setError('Le mot de passe doit contenir au moins 8 caractères');
      setLoading(false);
      return;
    }

    try {
      await register(
        {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        },
        'superadmin/register'
      );
      navigate('/superadmin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-mosala-green-50 via-white to-mosala-green-50 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-mosala-green-600 to-mosala-green-800 bg-clip-text text-transparent mb-2">
            MOSALA
          </h1>
          <p className="text-mosala-green-600 font-semibold">Inscription Superadministrateur</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {error && (
            <div className="bg-mosala-red-50 border border-mosala-red-200 rounded-lg p-4 text-mosala-red-700 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="block text-sm font-semibold text-mosala-green-900 mb-2">
                Nom complet
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-200 outline-none transition"
                placeholder="Jean Dupont"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-mosala-green-900 mb-2">
                Adresse email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-200 outline-none transition"
                placeholder="admin@mosala.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-mosala-green-900 mb-2">
                Mot de passe
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-200 outline-none transition"
                placeholder="••••••••"
              />
              <p className="text-xs text-mosala-green-600 mt-1">Minimum 8 caractères</p>
            </div>

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-semibold text-mosala-green-900 mb-2">
                Confirmer le mot de passe
              </label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-200 outline-none transition"
                placeholder="••••••••"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-mosala-green-600 to-mosala-green-700 hover:from-mosala-green-700 hover:to-mosala-green-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Inscription en cours...' : 'Créer mon compte'}
            </button>
          </form>

          {/* Login Link */}
          <div className="text-center pt-4 border-t border-mosala-green-100">
            <p className="text-sm text-mosala-green-700">
              Vous avez déjà un compte ?{' '}
              <Link to="/superadmin/login" className="font-semibold text-mosala-green-600 hover:text-mosala-green-700">
                Connectez-vous
              </Link>
            </p>
          </div>
        </div>

        {/* Footer */}
        <p className="text-center text-xs text-mosala-green-600 mt-6">
          © 2024 MOSALA. Tous droits réservés.
        </p>
      </div>
    </div>
  );
}
