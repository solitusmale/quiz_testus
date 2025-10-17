import React from "react";
import HeaderOne from "../components/common/header/HeaderOne";
import FooterOne from "../components/common/footer/FooterOne";
import Results from "../components/quiz/Results.jsx";

const ResultsPage = ({ results, timeElapsed, onBack }) => {
  return (
    <div className="page-container">
      <HeaderOne />
      <Results results={results} timeElapsed={timeElapsed} onBack={onBack} />
      <FooterOne />
    </div>
  );
};

export default ResultsPage;
