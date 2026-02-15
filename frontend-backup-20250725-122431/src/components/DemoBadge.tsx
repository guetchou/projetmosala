import React from "react";

const isDemo = () => localStorage.getItem("demoMode") === "true";

const DemoBadge = () => {
  if (!isDemo()) return null;
  return (
    <span className="ml-2 px-2 py-0.5 rounded bg-orange-500 text-white text-xs font-bold uppercase tracking-wider shadow">DÉMO</span>
  );
};

export default DemoBadge; 