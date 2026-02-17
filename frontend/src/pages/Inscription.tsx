import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { inscriptionsAPI } from "../api/inscriptions";
import { formationsAPI } from "@/api/formations";
import { supabase } from "@/lib/supabase";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const initialForm = {
  nom: "",
  prenom: "",
  sexe: "Masculin",
  email: "",
  tel: "",
  ville: "",
  quartier: "",
  pdf: null as File | null,
};

export default function Inscription() {
  const { formationId } = useParams();
  const navigate = useNavigate();
  const [formation, setFormation] = useState<any>(null);
  const [formationTitle, setFormationTitle] = useState<string | null>(null);
  const [loadingFormation, setLoadingFormation] = useState(true);
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formationError, setFormationError] = useState<string | null>(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [success, setSuccess] = useState(false);
  const [finalFormationId, setFinalFormationId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchFormation() {
      try {
        setLoadingFormation(true);
        setFormationError(null);
        
        // Garder l'ID comme string (UUID) pour la requête
        if (!formationId || formationId.trim() === '') {
          setFormationError('ID de formation invalide');
          setFormation(null);
          setFinalFormationId(null);
          return;
        }

        // Utiliser l'API formations pour récupérer les données avec l'UUID en string
        const data = await formationsAPI.getOne(formationId.trim());
        
        if (!data) {
          setFormationError(`Formation avec l'ID ${formationId} introuvable. Vérifiez l'URL ou retournez à la liste des formations.`);
          setFormation(null);
          setFinalFormationId(null);
        } else {
          setFormation(data);
          setFormationTitle(data.titre || null);
          setFinalFormationId(formationId.trim()); // Stocker comme string
        }
      } catch (err: any) {
        console.error('Error fetching formation:', err);
        setFormationError('Erreur lors du chargement de la formation. Veuillez réessayer.');
        setFormation(null);
        setFinalFormationId(null);
      } finally {
        setLoadingFormation(false);
      }
    }
    fetchFormation();
  }, [formationId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, files } = e.target as any;
    setForm(f => ({ ...f, [name]: files ? files[0] : value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setShowConfirm(true);
  };

  const confirmSubmit = async () => {
    setLoading(true);
    setError(null);
    
    // Vérifier que nous avons bien le formation_id
    if (!finalFormationId) {
      setError('Erreur : ID de formation manquant. Veuillez recharger la page.');
      setLoading(false);
      setShowConfirm(false);
      return;
    }

    try {
      let documentUrl = null;
      if (form.pdf) {
        // Afficher l'état uploading
        if (form.pdf.size > 5 * 1024 * 1024) {
          setError("Fichier PDF trop volumineux (max 5MB).");
          setLoading(false);
          return;
        }

        // Fonction pour nettoyer les noms de fichiers
        const cleanFileName = (name: string): string => {
          return name
            .toLowerCase()
            .replace(/[^a-z0-9.-]/g, '_')
            .replace(/_+/g, '_')
            .substring(0, 200);
        };

        const cleanedName = cleanFileName(form.pdf.name);
        const uploadPath = `inscriptions/${Date.now()}_${cleanedName}`;
        
        console.log('Uploading PDF to Supabase:', uploadPath);
        const { data, error: uploadError } = await supabase.storage
          .from("candidatures")
          .upload(uploadPath, form.pdf);
        
        if (uploadError) {
          console.error('Upload error:', uploadError);
          throw uploadError;
        }
        
        console.log('Upload successful:', data);
        const { publicUrl } = supabase.storage.from("candidatures").getPublicUrl(uploadPath).data;
        documentUrl = publicUrl;
      }

      // Passer le formation_id correctement converti en nombre
      const { error: insertError } = await inscriptionsAPI.create({
        nom: form.nom,
        prenom: form.prenom,
        sexe: form.sexe,
        email: form.email,
        tel: form.tel,
        ville: form.ville,
        quartier: form.quartier,
        document_url: documentUrl,
        formation_id: finalFormationId, // Utiliser le formation_id correctement chargé
      });
      
      if (insertError && insertError.code === "23505") {
        setError("Vous avez déjà postulé à cette formation.");
      } else if (insertError) {
        console.error('Insert error:', insertError);
        throw insertError;
      } else {
        setSuccess(true);
        navigate("/formations");
      }
    } catch (err: any) {
      const errMsg = err?.message || "Erreur lors de l'inscription";
      console.error('Inscription failed:', errMsg);
      setError(errMsg);
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  if (loadingFormation) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-12">
          <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8 text-center border border-border">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-border border-t-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground font-medium">Chargement de la formation...</p>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (formationError) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-12">
          <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8 border border-border">
            <div className="text-destructive bg-destructive/10 border border-destructive/30 rounded-xl p-4 mb-6">
              <h2 className="font-bold mb-2 flex items-center gap-2">
                <span className="text-lg">⚠️</span>
                Erreur
              </h2>
              <p className="text-sm">{formationError}</p>
            </div>
            <button 
              onClick={() => navigate('/formations')}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition shadow-md"
            >
              <ArrowLeft className="w-4 h-4" />
              Retour aux formations
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (success) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-12">
          <div className="max-w-md w-full bg-card rounded-2xl shadow-lg p-8 border border-primary/30 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h2 className="text-2xl font-bold text-primary mb-2">Inscription réussie !</h2>
            <p className="text-muted-foreground mb-4">Redirection vers la page des formations...</p>
            <div className="animate-spin rounded-full h-8 w-8 border-2 border-border border-t-primary mx-auto"></div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-12">
        <div className="max-w-lg w-full bg-card rounded-2xl shadow-lg p-8 border border-border">
        {/* Titre du formulaire */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Inscription pour
          </h1>
          <p className="text-lg font-semibold text-primary">
            {formationTitle || formation?.titre || '—'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Nom et Prénom */}
          <div className="flex gap-3">
            <input 
              name="nom" 
              required 
              placeholder="Nom*" 
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground bg-white placeholder-slate-400 transition"
              value={form.nom} 
              onChange={handleChange} 
            />
            <input 
              name="prenom" 
              required 
              placeholder="Prénom*" 
              className="flex-1 px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground bg-white placeholder-slate-400 transition"
              value={form.prenom} 
              onChange={handleChange} 
            />
          </div>

          {/* Sexe */}
          <select 
            name="sexe" 
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground bg-white transition"
            value={form.sexe} 
            onChange={handleChange}
          >
            <option value="Masculin">Masculin</option>
            <option value="Féminin">Féminin</option>
          </select>

          {/* Email */}
          <input 
            name="email" 
            type="email" 
            placeholder="Email" 
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground bg-white placeholder-slate-400 transition"
            value={form.email} 
            onChange={handleChange} 
          />

          {/* Téléphone */}
          <input 
            name="tel" 
            placeholder="Téléphone" 
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground bg-white placeholder-slate-400 transition"
            value={form.tel} 
            onChange={handleChange} 
          />

          {/* Ville */}
          <input 
            name="ville" 
            required 
            placeholder="Ville*" 
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground bg-white placeholder-slate-400 transition"
            value={form.ville} 
            onChange={handleChange} 
          />

          {/* Quartier */}
          <input 
            name="quartier" 
            placeholder="Quartier" 
            className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground bg-white placeholder-slate-400 transition"
            value={form.quartier} 
            onChange={handleChange} 
          />

          {/* Upload PDF */}
          <div>
            <input 
              name="pdf" 
              type="file" 
              accept="application/pdf" 
              className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none text-foreground bg-white text-sm transition cursor-pointer file:mr-2 file:px-3 file:py-2 file:rounded-lg file:border-0 file:bg-primary/10 file:text-primary file:font-semibold file:cursor-pointer"
              onChange={handleChange} 
            />
            <span className="text-xs text-muted-foreground mt-2 block">Format PDF uniquement, max 5MB.</span>
          </div>

          {/* Erreur */}
          {error && (
            <div className="bg-destructive/10 border border-destructive/30 text-destructive text-sm rounded-lg p-3">
              {error}
            </div>
          )}

          {/* Bouton Submit */}
          <button 
            type="submit" 
            className="w-full px-6 py-3 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? 'Téléchargement du fichier...' : 'S\'inscrire'}
          </button>
        </form>

        {/* Modal de confirmation */}
        {showConfirm && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
            <div className="bg-card rounded-2xl shadow-xl max-w-sm w-full p-6 border border-border">
              <h3 className="text-lg font-bold text-card-foreground mb-4">Confirmer votre inscription</h3>
              <p className="text-muted-foreground mb-6">
                Attention, vous ne pourrez plus modifier vos informations après validation. Confirmez-vous l'envoi ?
              </p>
              <div className="flex gap-3">
                <button 
                  className="flex-1 px-4 py-2 bg-primary text-primary-foreground font-semibold rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
                  onClick={confirmSubmit} 
                  disabled={loading}
                >
                  Confirmer
                </button>
                <button 
                  className="flex-1 px-4 py-2 bg-muted text-muted-foreground font-semibold rounded-lg hover:bg-muted/80 transition disabled:opacity-50"
                  onClick={() => setShowConfirm(false)} 
                  disabled={loading}
                >
                  Annuler
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      </div>
      <Footer />
    </>
  );
}
