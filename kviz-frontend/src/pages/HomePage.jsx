// src/pages/HomePage.jsx
import React from "react";

import FooterOne from "../components/common/footer/FooterOne";
import LandingPage from "../components/landingpage";
import Banner from "../components/layout/Banner";
import Counter from "../components/layout/Counter";
import CourseGrid01 from "../components/layout/CourseGridTooltip";
import CourseCat01 from "../components/layout/CourseCat";
import HeaderOne from "../components/common/header/HeaderOne";

const HomePage = ({ onLoginClick, onBrowseClick }) => {
  return (
    <div className="home-page">
    <HeaderOne />
      <Banner />
      <Counter />
      <CourseGrid01 />
      <CourseCat01 />
      <LandingPage onLoginClick={onLoginClick} onBrowseClick={onBrowseClick} />
    <FooterOne />
    </div>
  );
};

export default HomePage;
