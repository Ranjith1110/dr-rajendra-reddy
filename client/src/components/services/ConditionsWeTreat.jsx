import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons matching the medical context
import { FiActivity, FiShield, FiZoomIn, FiLayers, FiStar, FiPlusCircle } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ConditionsWeTreat = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    // Helper to store card refs cleanly
    cardsRef.current = [];
    const addToCards = (el) => { if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el); };

    // Content extracted exactly from your reference image
    const conditions = [
        {
            title: "Slipped Disc / Disc Herniation",
            desc: "Pain, numbness or weakness from a bulging or herniated disc — treated through endoscopic discectomy with minimal downtime.",
            icon: <FiActivity size={20} strokeWidth={1.5} />
        },
        {
            title: "Sciatica",
            desc: "Radiating leg pain caused by nerve compression — addressed with targeted decompression and pain interventions.",
            icon: <FiShield size={20} strokeWidth={1.5} />
        },
        {
            title: "Spinal Stenosis",
            desc: "Narrowing of the spinal canal — relieved through minimally invasive decompression that preserves spine stability.",
            icon: <FiZoomIn size={20} strokeWidth={1.5} />
        },
        {
            title: "Degenerative Spine Disorders",
            desc: "Age-related disc and joint changes — managed through a combination of regenerative care and selective surgery.",
            icon: <FiLayers size={20} strokeWidth={1.5} />
        },
        {
            title: "Vertebral Compression Fracture",
            desc: "Stabilised via vertebroplasty or kyphoplasty for rapid pain relief and restored vertebral height.",
            icon: <FiStar size={20} strokeWidth={1.5} />
        },
        {
            title: "Spine Trauma & Revision",
            desc: "Expert management of spinal injuries and re-operations when previous surgery hasn't given full relief.",
            icon: <FiPlusCircle size={20} strokeWidth={1.5} />
        }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // 1. Header elements reveal
            tl.fromTo(headerRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            )
                // 2. Cards stagger in
                .fromTo(cardsRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" },
                    "-=0.4"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#F7F5F0] py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* =========================================
                    HEADER SECTION
                ========================================= */}
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-start justify-between gap-6 md:gap-16">

                    {/* Left: Main Title */}
                    <div className="md:w-1/2">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl block font-serif font-black italic tracking-tight mb-6 leading-tight">
                            Conditions 
                            <span className="text-[#14B8A6]"> we treat.</span>
                        </h2>
                    </div>

                    {/* Right: Description */}
                    <div className="md:w-1/2 md:pt-4">
                        <p className="md:text-lg font-semibold">
                            From everyday back pain to complex spinal injuries diagnosed precisely, treated thoughtfully.
                        </p>
                    </div>
                </div>

                {/* =========================================
                    3x2 CARDS GRID
                ========================================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {conditions.map((condition, idx) => (
                        <div
                            key={idx}
                            ref={addToCards}
                            className="group bg-white rounded-3xl p-8 md:p-10 shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(10,25,47,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Icon Container */}
                            <div className="w-12 h-12 rounded-full bg-[#14B8A6]/10 flex items-center justify-center text-[#14B8A6] mb-8 group-hover:scale-110 transition-transform duration-300 origin-left">
                                {condition.icon}
                            </div>

                            {/* Card Title */}
                            <h3 className="text-2xl md:text-[26px] font-bold mb-4 leading-snug tracking-tight group-hover:text-[#14B8A6] transition-colors duration-300">
                                {condition.title}
                            </h3>

                            {/* Card Description */}
                            <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                                {condition.desc}
                            </p>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ConditionsWeTreat;