import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Terms = () => (
  <div className="min-h-screen flex flex-col bg-gradient-to-br from-[var(--color-mosala-green-50)] via-[var(--color-mosala-yellow-50)] to-[var(--color-mosala-dark-50)]">
    <Navbar />
    <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] p-4 rounded-full inline-flex items-center justify-center">
            <svg className="h-8 w-8 text-[var(--color-mosala-white)]" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M8 17l4 4 4-4m-4-5v9" /><path d="M20 12a8 8 0 1 0-16 0 8 8 0 0 0 16 0z" /></svg>
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 bg-gradient-to-r from-[var(--color-mosala-green-500)] to-[var(--color-mosala-yellow-500)] text-transparent bg-clip-text">Conditions d'utilisation</h1>
        <p className="text-lg text-[var(--color-mosala-dark-600)] max-w-2xl mx-auto">Consultez les conditions générales d'utilisation du projet Mosala.</p>
      </div>
      <div className="bg-[var(--color-mosala-white)]/90 backdrop-blur-xl rounded-2xl p-8 shadow-lg border border-[var(--color-mosala-green-100)] text-[var(--color-mosala-dark-700)]">
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-mosala-dark-900)]">1. Acceptation des conditions</h2>
        <p className="mb-4">L'utilisation du site Mosala implique l'acceptation pleine et entière des présentes conditions générales d'utilisation.</p>
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-mosala-dark-900)]">2. Accès au service</h2>
        <p className="mb-4">Le site est accessible gratuitement à tout utilisateur disposant d'un accès à Internet. Certains services peuvent nécessiter la création d'un compte.</p>
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-mosala-dark-900)]">3. Responsabilité</h2>
        <p className="mb-4">Mosala ne saurait être tenu responsable des dommages directs ou indirects résultant de l'utilisation du site.</p>
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-mosala-dark-900)]">4. Propriété intellectuelle</h2>
        <p className="mb-4">Tous les contenus présents sur le site sont protégés par le droit d'auteur. Toute reproduction est interdite sans autorisation.</p>
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-mosala-dark-900)]">5. Données personnelles</h2>
        <p className="mb-4">Les informations collectées sont traitées conformément à la politique de confidentialité.</p>
        <h2 className="text-2xl font-bold mb-6 text-[var(--color-mosala-dark-900)]">6. Modification des conditions</h2>
        <p className="mb-4">Mosala se réserve le droit de modifier les présentes conditions à tout moment. Les utilisateurs seront informés des modifications importantes.</p>
      </div>
    </main>
    <Footer />
  </div>
);

export default Terms; 