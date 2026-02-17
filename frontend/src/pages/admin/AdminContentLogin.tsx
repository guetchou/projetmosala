import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Eye, EyeOff } from 'lucide-react';

export default function AdminContentLogin() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

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
    setSuccess('');
    setLoading(true);
    console.log('[AdminContentLogin] handleSubmit started, email:', formData.email);

    try {
      console.log('[AdminContentLogin] Before login...');
      console.log('[AdminContentLogin] Calling login with params:', { endpoint: 'admin-content/login', expectedRole: 'admin_content' });
      const loggedInUser = await login(formData.email, formData.password, 'admin-content/login', 'admin_content', navigate);
      console.log('[AdminContentLogin] Login promise resolved, loggedInUser:', loggedInUser);
      
      if (loggedInUser && loggedInUser.role === 'admin_content') {
        console.log('[AdminContentLogin] ✅ User role is admin_content - SUCCESS');
        setSuccess('Connexion réussie! Redirection...');
        // Navigate immediately - AuthContext.login handles navigation via pendingNavigate
        navigate('/admin-content/dashboard');
      } else {
        console.error('[AdminContentLogin] ❌ User role is NOT admin_content. loggedInUser:', loggedInUser);
        setError('Rôle utilisateur incorrect. Veuillez vous connecter avec un compte admin contenu.');
      }
    } catch (err) {
      console.error('[AdminContentLogin] ❌ Login error:', err);
      setError(err instanceof Error ? err.message : 'Une erreur est survenue lors de la connexion');
    } finally {
      console.log('[AdminContentLogin] handleSubmit finally - setting loading to false');
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
          <p className="text-mosala-green-600 font-semibold">Connexion Admin Contenu</p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {error && (
            <div className="bg-mosala-red-50 border border-mosala-red-200 rounded-lg p-4 text-mosala-red-700 text-sm">
              {error}
            </div>
          )}

          {success && (
            <div className="bg-mosala-green-50 border border-mosala-green-200 rounded-lg p-4 text-mosala-green-700 text-sm">
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
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
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg border border-mosala-green-200 focus:border-mosala-green-500 focus:ring-2 focus:ring-mosala-green-200 outline-none transition"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-mosala-green-600 hover:text-mosala-green-700"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-mosala-green-600 to-mosala-green-700 hover:from-mosala-green-700 hover:to-mosala-green-800 text-white font-semibold py-3 rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {loading ? 'Connexion en cours...' : 'Se connecter'}
            </button>
          </form>

          {/* Register Link */}
          <div className="text-center pt-4 border-t border-mosala-green-100">
            <p className="text-sm text-mosala-green-700">
              Pas encore de compte ?{' '}
              <Link to="/admin-content/register" className="font-semibold text-mosala-green-600 hover:text-mosala-green-700">
                S'inscrire
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
