import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const AdvancedProcedures = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const cardsRef = useRef([]);

    // Helper to store card refs cleanly for GSAP
    cardsRef.current = [];
    const addToCards = (el) => { if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el); };

    // Content extracted exactly from your reference image
    const procedures = [
        {
            id: "01",
            title: "Percutaneous Endoscopic Discectomy",
            desc: "Keyhole removal of herniated disc through a sub-centimetre incision under local anaesthesia.",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "02",
            title: "Endoscopic Decompression Surgery",
            desc: "Precise relief of nerve compression with preservation of muscle and bone integrity.",
            image: "https://images.unsplash.com/photo-1584516150909-c43483ee7932?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "03",
            title: "Minimally Invasive Spine Fixation",
            desc: "Stabilising the spine with smaller incisions, less blood loss and faster mobilisation.",
            image: "https://images.unsplash.com/photo-1530497610245-94d3c16cda28?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "04",
            title: "Vertebroplasty & Kyphoplasty",
            desc: "Same-day procedures to seal compression fractures with medical-grade bone cement.",
            image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "05",
            title: "Regenerative Therapies",
            desc: "PRP and biologic injections to support disc and facet joint healing.",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
        },
        {
            id: "06",
            title: "Pain Management Interventions",
            desc: "Image-guided spinal injections and nerve blocks tailored to your pain pattern.",
            image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
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
        <section ref={sectionRef} className="w-full py-24 md:py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* --- HEADER --- */}
                <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl block font-serif font-black italic tracking-tight mb-6 leading-tight">
                        Keyhole precision <br className="md:hidden" />
                        <span className="text-[#14B8A6]">Lasting relief.</span>
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                        Endoscopic and minimally invasive techniques mean smaller incisions, less anaesthesia and a return to your life in days not weeks.
                    </p>
                </div>

                {/* =========================================
                    CARDS GRID (2 Columns)
                ========================================= */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {procedures.map((proc, idx) => (
                        <div
                            key={idx}
                            ref={addToCards}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(10,25,47,0.08)] transition-all duration-500 flex flex-col sm:flex-row h-auto sm:h-56 lg:h-64"
                        >
                            {/* Card Image Area (Left side on tablet/desktop, Top on mobile) */}
                            <div className="w-full sm:w-2/5 h-48 sm:h-full shrink-0 overflow-hidden relative bg-slate-200">
                                <img
                                    src={proc.image}
                                    alt={proc.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                {/* Optional subtle gradient overlay to match premium aesthetic */}
                                <div className="absolute inset-0 bg-[#0A192F]/5 mix-blend-multiply"></div>
                            </div>

                            {/* Card Content Area (Right side on tablet/desktop, Bottom on mobile) */}
                            <div className="p-8 sm:p-6 lg:p-10 flex flex-col justify-center flex-grow">
                                <div className="text-[#14B8A6] font-serif font-medium text-lg md:text-xl mb-3 opacity-90">
                                    {proc.id}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-3 leading-snug tracking-tight group-hover:text-[#14B8A6] transition-colors duration-300">
                                    {proc.title}
                                </h3>
                                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                                    {proc.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default AdvancedProcedures;