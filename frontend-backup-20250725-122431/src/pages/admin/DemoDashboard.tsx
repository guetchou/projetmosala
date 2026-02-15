import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const DemoDashboard = () => {
  const [logs, setLogs] = useState([]);
  const [scenarios, setScenarios] = useState([]);
  const [sandboxes, setSandboxes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/admin/demo/logs").then(r => r.json()).then(setLogs);
    fetch("/admin/demo/scenarios").then(r => r.json()).then(setScenarios);
    // Pour la démo, on mock la liste des sandboxes
    setSandboxes(JSON.parse(localStorage.getItem("demoSandboxes") || "[]"));
    setLoading(false);
  }, []);

  const launchScenario = async (id: number) => {
    const res = await fetch(`/admin/demo/scenario/${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-DEMO-MODE": "true" },
    });
    const data = await res.json();
    alert(data.message || "Scénario lancé (simulation)");
  };

  const createSandbox = async () => {
    const res = await fetch("/admin/demo/sandbox", { method: "POST", headers: { "Content-Type": "application/json" } });
    const data = await res.json();
    setSandboxes((prev) => [...prev, data]);
    localStorage.setItem("demoSandboxes", JSON.stringify([...sandboxes, data]));
    alert(`Sandbox créée : ${data.sandbox}`);
  };

  const deleteSandbox = async (token: string) => {
    await fetch(`/admin/demo/sandbox/${token}`, { method: "DELETE" });
    const updated = sandboxes.filter((s) => s.token !== token);
    setSandboxes(updated);
    localStorage.setItem("demoSandboxes", JSON.stringify(updated));
    alert(`Sandbox supprimée : ${token}`);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-[#0A0A14] via-[#1a1833] to-[#18182f]">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-8 bg-gradient-to-r from-[#6E45E2] to-[#00FFFF] text-transparent bg-clip-text">Monitoring DEMO</h1>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-white">Logs d'activité DEMO</h2>
          {loading ? <div>Chargement...</div> : (
            <div className="bg-white/90 rounded-xl shadow p-4 max-h-96 overflow-auto text-xs">
              <table className="w-full">
                <thead><tr><th>Date</th><th>User</th><th>Action</th><th>Payload</th></tr></thead>
                <tbody>
                  {logs.map((log, i) => (
                    <tr key={i} className="border-b border-gray-200">
                      <td>{log.created_at}</td>
                      <td>{log.user_id}</td>
                      <td>{log.method} {log.path}</td>
                      <td><pre className="whitespace-pre-wrap max-w-xs overflow-x-auto">{log.body}</pre></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
        <section className="mb-12">
          <h2 className="text-xl font-bold mb-4 text-white">Sandboxes actives</h2>
          <button className="mb-4 px-4 py-2 rounded bg-green-600 text-white font-bold shadow hover:bg-green-700 transition" onClick={createSandbox}>Créer une sandbox</button>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {sandboxes.map((sb: any) => (
              <div key={sb.token} className="bg-white/90 rounded-xl shadow p-4 flex flex-col gap-2">
                <div className="font-bold text-lg">{sb.sandbox}</div>
                <div className="text-sm text-gray-600">Token : {sb.token}</div>
                <button className="mt-2 px-4 py-2 rounded bg-red-500 text-white font-bold shadow hover:bg-red-600 transition" onClick={() => deleteSandbox(sb.token)}>Supprimer</button>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-xl font-bold mb-4 text-white">Scénarios guidés</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scenarios.map((sc: any) => (
              <div key={sc.id} className="bg-white/90 rounded-xl shadow p-4 flex flex-col gap-2">
                <div className="font-bold text-lg">{sc.name}</div>
                <div className="text-sm text-gray-600">{sc.steps} étapes</div>
                <button className="mt-2 px-4 py-2 rounded bg-orange-500 text-white font-bold shadow hover:bg-orange-600 transition" onClick={() => launchScenario(sc.id)}>Lancer le scénario</button>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default DemoDashboard; 