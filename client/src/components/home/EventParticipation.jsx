import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons
import { FiGlobe, FiMapPin, FiAward, FiBookOpen, FiActivity, FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const EventParticipation = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const bentoRefs = useRef([]);

    // Clear refs on every render to prevent GSAP duplication bugs
    bentoRefs.current = [];
    const addToBento = (el) => { if (el && !bentoRefs.current.includes(el)) bentoRefs.current.push(el); };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            // 1. Reveal Header
            tl.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            );

            // 2. Bento Box Stagger Reveal
            tl.fromTo(bentoRefs.current,
                { opacity: 0, y: 50, scale: 0.95 },
                { opacity: 1, y: 0, scale: 1, stagger: 0.15, duration: 0.8, ease: "back.out(1.2)" },
                "-=0.4"
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // --- Subtle 3D Tilt Effect for Desktop ---
    const handleMouseMove = (e, index) => {
        const card = bentoRefs.current[index];
        if (!card || window.innerWidth < 1024) return; // Only apply on desktop

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -5; // Subtle tilt
        const rotateY = ((x - centerX) / centerX) * 5;

        gsap.to(card, {
            rotateX, rotateY,
            transformPerspective: 1500,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (index) => {
        const card = bentoRefs.current[index];
        if (!card) return;

        gsap.to(card, {
            rotateX: 0, rotateY: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    };

    return (
        <section ref={sectionRef} id="events" className="relative w-full bg-[#FAFAFA] py-24 md:py-32 overflow-hidden border-t border-slate-100">

            <div className="max-w-[85rem] mx-auto px-6 md:px-12 relative z-10">

                {/* --- HEADER --- */}
                <div ref={headerRef} className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
                    <div className="inline-flex items-center gap-2 text-[#14B8A6] font-bold tracking-[0.2em] text-[10px] uppercase mb-4 md:mb-6 bg-[#14B8A6]/10 px-4 py-2 rounded-full">
                        <FiGlobe size={14} /> Global Expertise
                    </div>
                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0A192F] tracking-tight mb-6 leading-tight">
                        Big Event <br className="md:hidden" />
                        <span className="text-[#14B8A6]">Participation.</span>
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                        Committed to staying at the global forefront of medical innovation through continuous education, rigorous workshops, and elite international fellowships.
                    </p>
                </div>

                {/* --- BENTO GRID LAYOUT --- */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 lg:auto-rows-[300px]">

                    {/* BENTO ITEM 1: Barcelona Fellowship (Featured - Spans 2 Columns & 2 Rows) */}
                    <div
                        ref={addToBento}
                        onMouseMove={(e) => handleMouseMove(e, 0)}
                        onMouseLeave={() => handleMouseLeave(0)}
                        className="group relative lg:col-span-2 lg:row-span-2 rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-slate-900 cursor-pointer shadow-sm hover:shadow-[0_20px_40px_rgba(20,184,166,0.2)] transition-shadow duration-500 min-h-[400px]"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Background Image */}
                        <img
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
                            alt="Barcelona Spain"
                            className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700 ease-in-out"
                        />
                        {/* Gradient Overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/60 to-transparent"></div>

                        {/* Content */}
                        <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end" style={{ transform: 'translateZ(50px)' }}>
                            <div className="mb-auto flex justify-between items-start">
                                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-[#14B8A6] border border-white/20">
                                    <FiAward size={28} />
                                </div>
                                <div className="bg-[#14B8A6] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full shadow-lg">
                                    Featured
                                </div>
                            </div>

                            <div className="text-[#14B8A6] font-bold text-xs md:text-sm tracking-widest uppercase mb-3 flex items-center gap-2">
                                <FiGlobe /> International Exposure
                            </div>
                            <h3 className="text-3xl md:text-5xl font-black text-white mb-4 leading-tight group-hover:text-[#14B8A6] transition-colors duration-300">
                                Fellowship in Advanced Spine Surgery
                            </h3>
                            <p className="text-slate-300 md:text-lg font-medium max-w-xl flex items-center gap-2">
                                <FiMapPin className="text-[#14B8A6]" /> Barcelona, Spain
                            </p>
                        </div>
                    </div>

                    {/* BENTO ITEM 2: Conferences (Top Right) */}
                    <div
                        ref={addToBento}
                        onMouseMove={(e) => handleMouseMove(e, 1)}
                        onMouseLeave={() => handleMouseLeave(1)}
                        className="group relative rounded-[2rem] overflow-hidden bg-white border border-slate-200 cursor-pointer shadow-sm hover:shadow-[0_15px_30px_rgba(10,25,47,0.1)] transition-shadow duration-500 min-h-[300px]"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Soft Hover Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                        <div className="relative z-10 p-8 flex flex-col h-full justify-between" style={{ transform: 'translateZ(30px)' }}>
                            <div className="w-12 h-12 bg-teal-50 rounded-xl flex items-center justify-center text-[#14B8A6] group-hover:bg-[#14B8A6] group-hover:text-white transition-colors duration-300 border border-teal-100">
                                <FiGlobe size={24} />
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-[#0A192F] mb-3 group-hover:text-[#14B8A6] transition-colors duration-300">
                                    Global Conferences
                                </h3>
                                <p className="text-slate-500 text-sm font-medium leading-relaxed mb-4">
                                    Active participation in National & International Spine Conferences, shaping the future of spinal care.
                                </p>
                                <div className="inline-flex items-center gap-1 text-[#0A192F] text-xs font-bold uppercase tracking-widest group-hover:text-[#14B8A6] transition-colors">
                                    Read More <FiArrowUpRight size={16} />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* BENTO ITEM 3: Workshops (Bottom Right) */}
                    <div
                        ref={addToBento}
                        onMouseMove={(e) => handleMouseMove(e, 2)}
                        onMouseLeave={() => handleMouseLeave(2)}
                        className="group relative rounded-[2rem] overflow-hidden bg-[#0A192F] cursor-pointer shadow-sm hover:shadow-[0_15px_30px_rgba(20,184,166,0.2)] transition-shadow duration-500 min-h-[300px]"
                        style={{ transformStyle: 'preserve-3d' }}
                    >
                        {/* Background Subtle Image */}
                        <img
                            src="https://images.unsplash.com/photo-1551076805-e18690c5e53b?q=80&w=800&auto=format&fit=crop"
                            alt="Workshops"
                            className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 group-hover:scale-105 transition-all duration-700 mix-blend-overlay"
                        />

                        <div className="relative z-10 p-8 flex flex-col h-full justify-between" style={{ transform: 'translateZ(30px)' }}>
                            <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-xl flex items-center justify-center text-[#14B8A6] group-hover:bg-[#14B8A6] group-hover:text-white transition-colors duration-300 border border-white/10">
                                <FiBookOpen size={24} />
                            </div>

                            <div>
                                <h3 className="text-xl md:text-2xl font-bold text-white mb-4 group-hover:text-[#14B8A6] transition-colors duration-300">
                                    Advanced Workshops
                                </h3>

                                {/* Workshop Pills */}
                                <div className="flex flex-col gap-2">
                                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-3 py-2 rounded-lg text-xs font-medium">
                                        <FiActivity className="text-[#14B8A6]" /> Endoscopic Spine Surgery
                                    </span>
                                    <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/10 text-white px-3 py-2 rounded-lg text-xs font-medium">
                                        <FiActivity className="text-[#14B8A6]" /> Minimally Invasive Techniques
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default EventParticipation;