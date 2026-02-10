import HeroSection from "~/modules/home/ui/HeroSection";
import ProductDemo from "~/modules/home/ui/ProductDemo";
import ProductFeatures from "~/modules/home/ui/ProductFeatures";
import FooterUI from "~/modules/home/ui/Footer";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import React from "react";

const HomePage = () => {
    return (
        <div>
            <HeroSection />
            <div className="mt-10 flex flex-col items-center justify-center gap-4 pb-50 sm:flex-row">
                <Link
                    href="/course"
                    className="group flex w-full items-center justify-center gap-3 rounded-xl bg-indigo-600 px-7 py-4 text-sm font-bold text-white shadow-lg shadow-indigo-600/20 transition-all hover:bg-indigo-500 active:scale-95 sm:w-auto"
                >
                    Start Learning
                    <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
            </div>
            <ProductDemo />
            <ProductFeatures />
            <FooterUI />
        </div>
    );
};

export default HomePage;
