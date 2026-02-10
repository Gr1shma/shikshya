import React from "react";
import ProductDemo from "./ui/ProductDemo";
import HeroSection from "./ui/HeroSection";
import FooterUI from "./ui/Footer";
import ProductFeatures from "./ui/ProductFeatures";
import CTA from "./ui/CTA";

const LandingLayout = () => (
    <div>
        <HeroSection />
        <CTA />
        <ProductDemo />
        <ProductFeatures />
        <FooterUI />
    </div>
);

export default LandingLayout;
