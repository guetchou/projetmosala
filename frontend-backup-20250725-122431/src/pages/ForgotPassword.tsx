import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const ForgotPassword = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] p-4 rounded-full inline-flex items-center justify-center">
            <svg className="h-8 w-8 text-[var(--color-mosala-white)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M12 17v1m0-4v2m-6 4h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z" /></svg>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-transparent bg-clip-text">Mot de passe oublié</h1>
        <p className="text-lg text-[var(--color-mosala-dark-600)] max-w-2xl mx-auto">Vous avez oublié votre mot de passe ? Entrez votre email pour recevoir un lien de réinitialisation.</p>
      </div>
      <div className="bg-[var(--color-mosala-white)]/90 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-700)]">
        <form className="flex flex-col gap-6">
          <label className="text-left font-semibold text-[var(--color-mosala-dark-900)]">Adresse email</label>
          <input type="email" placeholder="Votre email" className="w-full px-4 py-3 rounded-full border border-[var(--color-mosala-green-200)] focus:border-[var(--color-mosala-green-500)] focus:ring-2 focus:ring-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-900)] bg-[var(--color-mosala-white)]/80 shadow-inner" required />
          <button type="submit" className="mt-2 px-8 py-3 rounded-xl font-semibold text-white shadow hover:scale-105 transition glassmorphism-cta bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)]">Envoyer le lien de réinitialisation</button>
        </form>
      </div>
    </main>
    <Footer />
  </div>
);

export default ForgotPassword; 