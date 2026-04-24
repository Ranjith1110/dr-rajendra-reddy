import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons for premium visuals
import { 
    FiGlobe, FiMapPin, FiAward, 
    FiBookOpen, FiActivity, FiArrowUpRight 
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const EventParticipation = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const featuredCardRef = useRef(null);
    const listCardsRef = useRef([]);

    // Clear refs on every render to prevent GSAP overlap bugs
    listCardsRef.current = [];
    const addToListCards = (el) => { if (el && !listCardsRef.current.includes(el)) listCardsRef.current.push(el); };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", // Triggers when the section is 20% into the viewport
                }
            });

            // 1. Reveal Header Group
            tl.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            )
            // 2. Reveal the Featured Fellowship Card (Left side)
            .fromTo(featuredCardRef.current,
                { opacity: 0, x: -40, scale: 0.95 },
                { opacity: 1, x: 0, scale: 1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            )
            // 3. Stagger in the List Cards (Right side)
            .fromTo(listCardsRef.current,
                { opacity: 0, x: 40 },
                { opacity: 1, x: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" },
                "-=0.6"
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="events" className="relative w-full bg-white py-24 md:py-32 overflow-hidden border-t border-slate-100">
            
            {/* Background Decorative Gradient */}
            <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-[#14B8A6]/5 rounded-full blur-[120px] pointer-events-none transform translate-x-1/2"></div>
            
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">
                <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
                    
                    {/* --- LEFT COLUMN: Header & Featured Fellowship --- */}
                    <div className="w-full lg:w-5/12 flex flex-col justify-between">
                        
                        {/* Header Section */}
                        <div ref={headerRef} className="mb-10 lg:mb-16">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#0A192F] tracking-tight leading-[1.1] mb-5">
                                Big Event <br />
                                <span className="text-[#14B8A6]">Participation.</span>
                            </h2>
                            <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                                Committed to staying at the global forefront of medical innovation through continuous education and elite international fellowships.
                            </p>
                        </div>

                        {/* Featured Dark Card (Barcelona Fellowship) */}
                        <div 
                            ref={featuredCardRef}
                            className="group relative bg-[#0A192F] rounded-3xl p-8 md:p-10 shadow-2xl shadow-[#0A192F]/20 overflow-hidden hover:-translate-y-2 transition-transform duration-500"
                        >
                            {/* Inner gradient glow on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                            
                            <div className="relative z-10">
                                <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center text-[#14B8A6] mb-8 backdrop-blur-sm border border-white/10">
                                    <FiMapPin size={24} />
                                </div>
                                
                                <div className="text-[#14B8A6] font-bold text-xs tracking-widest uppercase mb-2">International Exposure</div>
                                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-snug">
                                    Fellowship in Advanced Spine Surgery
                                </h3>
                                
                                <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg border border-white/5 text-white/90 font-medium text-sm">
                                    <FiGlobe className="text-[#14B8A6]" /> Barcelona, Spain
                                </div>
                            </div>
                            
                            {/* Decorative background icon */}
                            <FiAward className="absolute -bottom-10 -right-10 text-white/5 w-64 h-64 transform rotate-12 group-hover:scale-110 transition-transform duration-700 pointer-events-none" />
                        </div>
                    </div>

                    {/* --- RIGHT COLUMN: Conferences & Workshops --- */}
                    <div className="w-full lg:w-7/12 flex flex-col justify-center gap-6 md:gap-8 pt-4 lg:pt-0">
                        
                        {/* Conference Card */}
                        <div 
                            ref={addToListCards}
                            className="group bg-[#FAFAFA] border border-slate-200 hover:border-[#14B8A6]/30 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.15)] transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center text-[#0A192F] group-hover:text-[#14B8A6] group-hover:bg-teal-50 transition-colors duration-300">
                                <FiGlobe size={24} className="md:w-7 md:h-7" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl md:text-2xl font-bold text-[#0A192F] mb-3 group-hover:text-[#14B8A6] transition-colors duration-300">
                                    National & International Spine Conferences
                                </h4>
                                <p className="text-slate-500 font-medium leading-relaxed mb-4 text-sm md:text-base">
                                    Active participation in major global medical conferences, contributing to the latest advancements and exchanging cutting-edge surgical insights with top professionals worldwide.
                                </p>
                                <span className="inline-flex items-center gap-1 text-[#0A192F] text-xs font-bold uppercase tracking-widest group-hover:text-[#14B8A6] transition-colors">
                                    Active Participant <FiArrowUpRight size={16} />
                                </span>
                            </div>
                        </div>

                        {/* Workshops Card */}
                        <div 
                            ref={addToListCards}
                            className="group bg-[#FAFAFA] border border-slate-200 hover:border-[#14B8A6]/30 rounded-3xl p-6 md:p-8 flex flex-col sm:flex-row items-start gap-6 hover:shadow-[0_20px_40px_-15px_rgba(20,184,166,0.15)] transition-all duration-500 hover:-translate-y-1"
                        >
                            <div className="w-12 h-12 md:w-16 md:h-16 shrink-0 bg-white shadow-sm border border-slate-100 rounded-2xl flex items-center justify-center text-[#0A192F] group-hover:text-[#14B8A6] group-hover:bg-teal-50 transition-colors duration-300">
                                <FiBookOpen size={24} className="md:w-7 md:h-7" />
                            </div>
                            <div className="flex-1">
                                <h4 className="text-xl md:text-2xl font-bold text-[#0A192F] mb-3 group-hover:text-[#14B8A6] transition-colors duration-300">
                                    Advanced Surgical Workshops
                                </h4>
                                <p className="text-slate-500 font-medium leading-relaxed mb-5 text-sm md:text-base">
                                    Rigorous hands-on training and expert-level skill development in the latest surgical technologies.
                                </p>
                                
                                {/* Workshop Tags */}
                                <div className="flex flex-wrap gap-2 md:gap-3">
                                    <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold shadow-sm group-hover:border-[#14B8A6]/30 transition-colors">
                                        <FiActivity className="text-[#14B8A6]" /> Endoscopic Spine Surgery
                                    </span>
                                    <span className="inline-flex items-center gap-1.5 bg-white border border-slate-200 text-slate-600 px-3 py-1.5 rounded-lg text-xs md:text-sm font-semibold shadow-sm group-hover:border-[#14B8A6]/30 transition-colors">
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