import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons matching the reference
import { FiActivity, FiShield, FiZoomIn, FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ConditionsTreat = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    // Helper to store card refs without duplication
    cardsRef.current = [];
    const addToCards = (el) => { if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el); };

    // Data mapped directly from your reference image
    const conditions = [
        {
            title: "Slipped Disc",
            desc: "Endoscopic discectomy for disc herniation with same-day recovery.",
            icon: <FiActivity size={16} />,
            // Using placeholder medical images matching the context
            image: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Sciatica",
            desc: "Targeted nerve decompression to relieve radiating leg pain.",
            icon: <FiShield size={16} />,
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop",
        },
        {
            title: "Spinal Stenosis",
            desc: "Minimally invasive decompression to restore mobility.",
            icon: <FiZoomIn size={16} />,
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
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

            // Reveal Header elements (Title on left, Text on right)
            tl.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: "power3.out" }
            )
                // Stagger reveal the cards
                .fromTo(cardsRef.current,
                    { opacity: 0, y: 40 },
                    { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" },
                    "-=0.4"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* --- HEADER --- */}
                <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl block font-serif font-black italic tracking-tight mb-6 leading-tight">
                        Relief that begins at the <br className="md:hidden" />
                        <span className="text-[#14B8A6]">source of your pain.</span>
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                        From slipped discs to complex degenerative disorders, our practice applies the latest endoscopic techniques — minimising tissue damage and accelerating your return to everyday life.
                    </p>
                </div>

                {/* =========================================
                    CARDS GRID
                ========================================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {conditions.map((condition, idx) => (
                        <div
                            key={idx}
                            ref={addToCards}
                            className="group bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(10,25,47,0.12)] transition-all duration-500 flex flex-col border border-slate-100/50"
                        >
                            {/* Card Image area with embedded Icon */}
                            <div className="relative w-full h-56 sm:h-64 overflow-hidden bg-slate-100">
                                {/* Floating Icon Badge */}
                                <div className="absolute top-5 left-5 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-slate-600 z-10 shadow-sm">
                                    {condition.icon}
                                </div>

                                {/* Image with subtle zoom on hover */}
                                <img
                                    src={condition.image}
                                    alt={condition.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>

                            {/* Card Content Area */}
                            <div className="p-6 flex flex-col flex-grow">
                                <h3 className="text-2xl md:text-3xl font-bold mb-4 group-hover:text-[#14B8A6] transition-colors duration-300">
                                    {condition.title}
                                </h3>

                                <p className="text-slate-500 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                                    {condition.desc}
                                </p>

                                {/* Action Link */}
                                <a
                                    href="#treatments"
                                    className="inline-flex items-center gap-2  text-sm font-bold uppercase tracking-wide group-hover:text-[#14B8A6] transition-colors mt-auto"
                                >
                                    Learn more <FiArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                </a>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default ConditionsTreat;