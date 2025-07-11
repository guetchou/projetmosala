
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useEmployers } from "@/hooks/useEmployers";
import Loader from "@/components/ui/Loader";
import { Employer } from "@/types/entities";

const Employers = () => {
  const { data: employers = [], isLoading, isError } = useEmployers();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-2xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-6 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Recruter des talents</h1>
        <p className="text-lg text-[#F5F5F7] whitespace-pre-line">Accédez à une base de candidats qualifiés et facilitez vos recrutements.</p>
        {isLoading && <Loader label="Chargement des employeurs..." />}
        {isError && <div className="text-center text-red-600 py-12" role="alert">Erreur lors du chargement des employeurs.</div>}
        <div className="mt-8 grid gap-6">
          {employers.length === 0 && !isLoading && !isError && (
            <div className="text-center text-mosala-dark-200 py-12">Aucun employeur trouvé.</div>
          )}
          {(employers as Employer[]).map((e) => (
            <div key={e.id} className="bg-white/90 rounded-xl shadow-lg border border-border p-6 flex flex-col gap-2" tabIndex={0} aria-label={`Employeur ${e.name}`}> 
              <div className="font-bold text-mosala-dark-700 text-lg">{e.name}</div>
              <div className="text-mosala-dark-400 text-sm">{e.sector}</div>
              <div className="text-mosala-dark-200 text-xs">{e.city}</div>
            </div>
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Employers;
