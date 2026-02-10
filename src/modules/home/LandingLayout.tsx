import React from "react";
import ProductDemo from "./ui/ProductDemo";
import HeroSection from "./ui/HeroSection";
import FooterUI from "./ui/Footer";
import ProductFeatures from "./ui/ProductFeatures";
import CTA from "./ui/CTA";

const LandingLayout = () => (
    <div className="relative min-h-screen overflow-hidden bg-slate-950">
        {/* Global gradient background */}
        <div className="fixed inset-0 -z-10 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950" />

        {/* Cinematic depth layers */}
        <div className="fixed top-0 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-indigo-600/10 blur-[140px]" />
        <div className="fixed top-20 left-1/2 -z-10 h-[300px] w-[500px] -translate-x-1/2 rounded-full bg-sky-500/5 blur-[100px]" />

        {/* Noise texture overlay */}
        <div
            className="fixed inset-0 -z-10 opacity-[0.015]"
            style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
            }}
        />

        {/* Content */}
        <div className="relative">
            <HeroSection />
            <CTA />
            <ProductDemo />
            <ProductFeatures />
            <FooterUI />
        </div>
    </div>
);

export default LandingLayout;
