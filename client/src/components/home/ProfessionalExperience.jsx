import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons
import { FiBriefcase, FiMapPin, FiCheckCircle, FiActivity, FiArrowRight, FiTarget } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ProfessionalExperience = () => {
    const sectionRef = useRef(null);
    const leftColRef = useRef(null);
    const cardsRef = useRef([]);

    // Clear refs on every render
    cardsRef.current = [];
    const addToCards = (el) => { if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el); };

    // --- Content Data ---
    const hospitals = [
        {
            role: "Consultant Endoscopic Spine Surgeon",
            hospital: "SLG Hospitals",
            subText: "(Ajeenkya DY Patil Healthcare)",
            location: "Hyderabad, Telangana",
            gradient: "from-[#14B8A6] to-[#0D9488]"
        },
        {
            role: "Consultant Endoscopic Spine Surgeon",
            hospital: "Udai Omni Hospital",
            subText: "Advanced Orthopaedic Centre",
            location: "Hyderabad, Telangana",
            gradient: "from-[#0EA5E9] to-[#0284C7]"
        },
        {
            role: "Visiting Consultant Endoscopic Spine Surgeon",
            hospital: "KIMS Sunshine Hospital",
            subText: "Specialized Spine Care Unit",
            location: "Gachibowli, Hyderabad",
            gradient: "from-[#8B5CF6] to-[#6D28D9]"
        }
    ];

    const responsibilities = [
        "Performing advanced endoscopic and minimally invasive spine surgeries.",
        "Managing complex spinal disorders with extreme precision.",
        "Delivering patient-centric, outcome-driven spine care.",
        "Focused on faster recovery, minimal tissue damage, and improved mobility."
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            // 1. Reveal Sticky Left Column
            tl.fromTo(leftColRef.current.children,
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            );

            // 2. Reveal Hospital Cards (Right Column)
            tl.fromTo(cardsRef.current,
                { opacity: 0, x: 50, rotationY: -10, transformPerspective: 1000 },
                { opacity: 1, x: 0, rotationY: 0, stagger: 0.2, duration: 0.8, ease: "back.out(1.2)" },
                "-=0.4"
            );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // --- 3D Hover Interaction ---
    const handleMouseMove = (e, index) => {
        const card = cardsRef.current[index];
        if (!card || window.innerWidth < 1024) return;

        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = ((y - centerY) / centerY) * -8;
        const rotateY = ((x - centerX) / centerX) * 8;

        gsap.to(card, {
            rotateX, rotateY,
            transformPerspective: 1500,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = (index) => {
        const card = cardsRef.current[index];
        if (!card) return;

        gsap.to(card, {
            rotateX: 0, rotateY: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    };

    return (
        <section ref={sectionRef} id="experience" className="relative w-full bg-white py-24 md:py-32 overflow-hidden border-t border-slate-100">

            {/* Ambient Background Elements */}
            <div className="absolute top-1/3 left-0 w-[500px] h-[500px] bg-[#14B8A6]/5 rounded-full blur-[120px] pointer-events-none transform -translate-x-1/2"></div>

            <div className="max-w-[85rem] mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row gap-16 lg:gap-24">

                {/* =========================================
                    LEFT COLUMN: Sticky Overview & Responsibilities
                ========================================= */}
                <div className="w-full lg:w-5/12 flex flex-col relative">
                    <div ref={leftColRef} className="lg:sticky lg:top-32">

                        <div className="inline-flex items-center gap-2 text-[#14B8A6] font-bold tracking-[0.2em] text-[10px] uppercase mb-5 bg-[#14B8A6]/10 px-4 py-2 rounded-full">
                            <FiBriefcase size={14} /> Professional Career
                        </div>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#0A192F] tracking-tight mb-6 leading-[1.1]">
                            Elite Hospital <br />
                            <span className="text-[#14B8A6]">Affiliations.</span>
                        </h2>

                        <p className="text-lg text-slate-500 font-medium leading-relaxed mb-10">
                            Partnering with the region's most advanced medical facilities to deliver world-class surgical precision and comprehensive spine care.
                        </p>

                        {/* Responsibilities Block */}
                        <div className="bg-[#FAFAFA] border border-slate-200 rounded-[2rem] p-8 shadow-sm">
                            <h3 className="text-xl font-bold text-[#0A192F] mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 rounded-xl bg-teal-50 flex items-center justify-center text-[#14B8A6]">
                                    <FiActivity size={20} />
                                </div>
                                Key Responsibilities
                            </h3>

                            <ul className="space-y-4">
                                {responsibilities.map((resp, idx) => (
                                    <li key={idx} className="flex items-start gap-3 group">
                                        <FiCheckCircle className="text-[#14B8A6] shrink-0 mt-1 w-5 h-5 group-hover:scale-110 transition-transform" />
                                        <span className="text-slate-600 font-medium text-sm md:text-base leading-relaxed group-hover:text-[#0A192F] transition-colors">
                                            {resp}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                    </div>
                </div>

                {/* =========================================
                    RIGHT COLUMN: Scrolling 3D Hospital Cards
                ========================================= */}
                <div className="w-full lg:w-7/12 flex flex-col gap-8 relative pt-4 lg:pt-0">

                    {/* Connecting Timeline Line (Desktop Only) */}
                    <div className="hidden lg:block absolute left-8 top-10 bottom-10 w-[2px] bg-gradient-to-b from-[#14B8A6]/30 via-slate-200 to-transparent z-0"></div>

                    {hospitals.map((item, idx) => (
                        <div
                            key={idx}
                            ref={addToCards}
                            onMouseMove={(e) => handleMouseMove(e, idx)}
                            onMouseLeave={() => handleMouseLeave(idx)}
                            className="relative z-10 w-full group cursor-pointer"
                            style={{ perspective: '1500px' }}
                        >
                            <div
                                className="bg-white border border-slate-200 rounded-[2.5rem] p-8 md:p-10 shadow-[0_10px_30px_rgba(0,0,0,0.03)] hover:shadow-[0_25px_50px_-12px_rgba(20,184,166,0.15)] hover:border-[#14B8A6]/30 transition-all duration-500 ml-0 lg:ml-16 flex flex-col will-change-transform"
                                style={{ transformStyle: 'preserve-3d' }}
                            >
                                {/* Timeline Dot (Desktop) */}
                                <div className="hidden lg:flex absolute -left-[4.2rem] top-12 w-6 h-6 rounded-full bg-white border-4 border-[#14B8A6] shadow-md z-20 group-hover:scale-125 transition-transform duration-300"></div>

                                <div className="relative" style={{ transform: 'translateZ(40px)' }}>

                                    {/* Role Badge */}
                                    <div className="inline-flex items-center gap-2 text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-lg mb-8 shadow-md" style={{ background: `linear-gradient(to right, ${item.gradient.split(' ')[1]}, ${item.gradient.split(' ')[3]})` }}>
                                        <FiTarget size={14} /> Surgeon Role
                                    </div>

                                    {/* Role Title */}
                                    <h3 className="text-2xl md:text-3xl font-black text-[#0A192F] leading-snug mb-3 group-hover:text-[#14B8A6] transition-colors duration-300">
                                        {item.role}
                                    </h3>

                                    {/* Hospital Name */}
                                    <div className="flex flex-col mb-8">
                                        <span className="text-xl font-bold text-slate-700">{item.hospital}</span>
                                        <span className="text-sm font-medium text-slate-400">{item.subText}</span>
                                    </div>

                                    {/* Footer / Location */}
                                    <div className="flex items-center justify-between pt-6 border-t border-slate-100">
                                        <div className="flex items-center gap-2 text-slate-500 font-semibold text-sm">
                                            <FiMapPin className="text-[#14B8A6]" size={18} /> {item.location}
                                        </div>

                                        <div className="w-10 h-10 rounded-full bg-teal-50 flex items-center justify-center text-[#14B8A6] group-hover:bg-[#14B8A6] group-hover:text-white transition-colors duration-300">
                                            <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default ProfessionalExperience;