import React from "react";

const Loader = ({ label = "Chargement..." }) => (
  <div className="flex flex-col items-center justify-center min-h-[120px]" role="status" aria-live="polite" aria-busy="true">
    <svg className="animate-spin h-10 w-10 text-mosala-green-500 mb-2" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
    </svg>
    <span className="text-mosala-green-700 text-sm font-medium">{label}</span>
  </div>
);

export default Loader; 