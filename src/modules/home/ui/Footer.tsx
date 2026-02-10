import React from "react";
import Image from "next/image";

const FooterUI = () => {
    return (
        <div>
            <footer className="py-16 text-center">
                <div className="mb-4 flex items-center justify-center gap-3">
                    <Image
                        src="/logo.png"
                        alt="ShikShya logo"
                        width={32} // Set a specific width
                        height={32} // Set a specific height
                        className="object-contain"
                    />
                    <span className="text-lg font-black tracking-tighter text-white uppercase">
                        ShikShya
                    </span>
                </div>
                <p className="text-[10px] font-bold tracking-[0.4em] text-slate-600 uppercase">
                    Better Learning, Managed.
                </p>
            </footer>
        </div>
    );
};

export default FooterUI;
