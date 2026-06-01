import React, { useRef, useState, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons
import { FiActivity, FiShield, FiStar, FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ConditionsWeTreat = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const gridRef = useRef(null);
    const [activeTab, setActiveTab] = useState("Conditions Treated");

    // Dynamic Image Libraries for Categories
    const images = {
        conditions: [
            "/conditionswetreat/treated/1.jpg",
            "/conditionswetreat/treated/2.webp",
            "/conditionswetreat/treated/3.webp",
            "/conditionswetreat/treated/4.jpg",
            "/conditionswetreat/treated/5.jpg",
            "/conditionswetreat/treated/6.jpg",
            "/conditionswetreat/treated/7.jpg",
            "/conditionswetreat/treated/8.jpg",
            "/conditionswetreat/treated/9.webp",
            "/conditionswetreat/treated/10.webp",
            "/conditionswetreat/treated/11.webp",
            "/conditionswetreat/treated/12.jpg",
        ],
        rehab: [
            "/conditionswetreat/pain/1.jpg",
            "/conditionswetreat/pain/2.jpg",
            "/conditionswetreat/pain/3.jpg",
            "/conditionswetreat/pain/4.webp",
            "/conditionswetreat/pain/5.webp",
        ],
        premium: [
            "/conditionswetreat/premium/1.jpg",
            "/conditionswetreat/premium/2.webp",
            "/conditionswetreat/premium/3.webp",
            "/conditionswetreat/premium/4.jpg",
            "/conditionswetreat/premium/5.webp",
        ]
    };

    // Full Dataset
    const medicalData = [
        // CONDITIONS
        { title: "Slip Disc / Disc Herniation", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Sciatica", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Spinal Canal Stenosis", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Cervical Disc Problems", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Cervical Radiculopathy", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Lumbar Radiculopathy", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Degenerative Spine Disorders", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Failed Back Surgery Syndrome", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Spondylolisthesis", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Spine Trauma & Fractures", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Spine Infections", category: "Conditions Treated", icon: <FiActivity size={20} /> },
        { title: "Osteoporotic Spine Fractures", category: "Conditions Treated", icon: <FiActivity size={20} /> },

        // PAIN & REHAB
        { title: "Image Guided Spine Injections", category: "Pain & Rehab", icon: <FiShield size={20} /> },
        { title: "Nerve Root Blocks", category: "Pain & Rehab", icon: <FiShield size={20} /> },
        { title: "Epidural Steroid Injections", category: "Pain & Rehab", icon: <FiShield size={20} /> },
        { title: "Radiofrequency Ablation", category: "Pain & Rehab", icon: <FiShield size={20} /> },
        { title: "Post-Surgical Rehab Guidance", category: "Pain & Rehab", icon: <FiShield size={20} /> },

        // PREMIUM
        { title: "Motion Preservation Surgery", category: "Premium Service", icon: <FiStar size={20} /> },
        { title: "Rapid Recovery Spine Surgery", category: "Premium Service", icon: <FiStar size={20} /> },
        { title: "Ultra-Minimally Invasive Surgery", category: "Premium Service", icon: <FiStar size={20} /> },
        { title: "Precision Endoscopic Care", category: "Premium Service", icon: <FiStar size={20} /> },
        { title: "Personalized Treatment Plans", category: "Premium Service", icon: <FiStar size={20} /> },
    ];

    // Filter data based on active tab
    const filteredData = medicalData.filter(item => item.category === activeTab);
    const tabs = ["Conditions Treated", "Pain & Rehab", "Premium Service"];

    // 1. Initial Page Load Animation
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                {
                    opacity: 1,
                    y: 0,
                    stagger: 0.15,
                    duration: 0.8,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top 75%",
                    }
                }
            );
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // 2. Grid Animation specifically for when Tabs change
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            gsap.fromTo(".medical-card",
                { opacity: 0, y: 40, scale: 0.98 },
                { opacity: 1, y: 0, scale: 1, stagger: 0.05, duration: 0.6, ease: "power2.out" }
            );
        }, gridRef); // Scope to the grid container
        return () => ctx.revert();
    }, [activeTab]); // Re-run whenever activeTab changes

    // Helper to pull a related image from our dynamic arrays
    const getCardImage = (category, index) => {
        if (category === "Conditions Treated") return images.conditions[index % images.conditions.length];
        if (category === "Pain & Rehab") return images.rehab[index % images.rehab.length];
        return images.premium[index % images.premium.length];
    };

    return (
        <section ref={sectionRef} className="w-full bg-[#F9F8F6] py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* =========================================
                    HEADER & TABS
                ========================================= */}
                <div ref={headerRef} className="flex flex-col mb-12 lg:mb-16">

                    <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
                        <div className="lg:w-1/2">
                             <h2 className="text-4xl sm:text-5xl md:text-6xl block font-serif font-black italic tracking-tight mb-6 leading-tight text-[#0A192F]">
                                Comprehensive care,
                                <span className="text-[#14B8A6]"> expertly delivered.</span>
                            </h2>
                            <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                                Select a category below to explore our extensive range of diagnostics, non-surgical interventions, and advanced surgical procedures.
                            </p>
                        </div>

                        {/* Custom Tab Navigation */}
                        <div className="lg:w-1/2 flex flex-wrap gap-2 lg:justify-end">
                            {tabs.map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab)}
                                    className={`px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 ${activeTab === tab
                                            ? "bg-[#0A192F] text-white shadow-lg shadow-[#0A192F]/20 scale-105"
                                            : "bg-white text-slate-500 hover:bg-slate-100 hover:text-[#0A192F] border border-slate-200"
                                        }`}
                                >
                                    {tab}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* =========================================
                    DYNAMIC GRID GALLERY 
                ========================================= */}
                <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {filteredData.map((item, idx) => (
                        <div
                            key={`${activeTab}-${idx}`} // Forces React to remount cards on tab change for clean animation
                            className="medical-card group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(10,25,47,0.12)] hover:-translate-y-1 transition-all duration-500 flex flex-col cursor-pointer"
                        >
                            {/* Card Image Area (Aspect Video for perfect framing) */}
                            <div className="w-full aspect-[4/3] relative overflow-hidden bg-slate-200">
                                <img
                                    src={getCardImage(item.category, idx)}
                                    alt={item.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                {/* Subtle overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-[#0A192F]/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>

                                {/* Icon floating on image */}
                                <div className="absolute bottom-4 left-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 group-hover:bg-[#14B8A6] group-hover:border-transparent transition-colors duration-300">
                                    {item.icon}
                                </div>
                            </div>

                            {/* Card Content Area */}
                            <div className="p-6 md:p-8 flex flex-col flex-grow bg-white relative">
                                {/* Interactive Arrow */}
                                <div className="absolute top-6 right-6 text-slate-300 group-hover:text-[#14B8A6] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300">
                                    <FiArrowUpRight size={22} />
                                </div>

                                <div className="text-[10px] uppercase tracking-widest font-bold text-[#14B8A6] mb-3">
                                    {item.category}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-[#0A192F] group-hover:text-[#14B8A6] transition-colors duration-300">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ConditionsWeTreat;