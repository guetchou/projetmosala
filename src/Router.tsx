import Services from "@/pages/Services";
import Formations from "@/pages/Formations";
import FAQ from "@/pages/FAQ";
import Support from "@/pages/Support";
import CandidateSpace from "@/pages/CandidateSpace";
import RecruiterSpace from "@/pages/RecruiterSpace";
import { Route } from "react-router-dom";

const Router = () => {
  return (
    <>
      <Route path="/services" element={<Services />} />
      <Route path="/formations" element={<Formations />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/support" element={<Support />} />
      <Route path="/candidate-space" element={<CandidateSpace />} />
      <Route path="/recruiter-space" element={<RecruiterSpace />} />
    </>
  );
};

export default Router; 