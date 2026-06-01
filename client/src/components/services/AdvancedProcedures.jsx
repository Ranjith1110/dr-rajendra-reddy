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

    // Content extracted exactly from your reference
    const procedures = [
        {
            id: "01",
            title: "Percutaneous Endoscopic Discectomy",
            desc: "Keyhole removal of herniated disc through a sub-centimetre incision under local anaesthesia.",
            image: "/keyhole/1.jpg"
        },
        {
            id: "02",
            title: "Endoscopic Decompression Surgery",
            desc: "Precise relief of nerve compression with preservation of muscle and bone integrity.",
            image: "/keyhole/2.jpg"
        },
        {
            id: "03",
            title: "Minimally Invasive Spine Fixation",
            desc: "Stabilising the spine with smaller incisions, less blood loss and faster mobilisation.",
            image: "/keyhole/3.jpg"
        },
        {
            id: "04",
            title: "Vertebroplasty & Kyphoplasty",
            desc: "Same-day procedures to seal compression fractures with medical-grade bone cement.",
            image: "/keyhole/4.webp"
        },
        {
            id: "05",
            title: "Regenerative Therapies",
            desc: "PRP and biologic injections to support disc and facet joint healing.",
            image: "/keyhole/5.jpg"
        },
        {
            id: "06",
            title: "Pain Management Interventions",
            desc: "Image-guided spinal injections and nerve blocks tailored to your pain pattern.",
            image: "/keyhole/6.webp"
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
        <section ref={sectionRef} className="w-full py-24 md:py-32 bg-slate-50">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* --- HEADER --- */}
                <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl block font-serif font-black italic tracking-tight mb-6 leading-tight text-[#0A192F]">
                        Keyhole precision <br className="md:hidden" />
                        <span className="text-[#14B8A6]">Lasting relief.</span>
                    </h2>
                    <p className="text-base md:text-lg text-slate-500 font-medium leading-relaxed">
                        Endoscopic and minimally invasive techniques mean smaller incisions, less anaesthesia and a return to your life in days not weeks.
                    </p>
                </div>

                {/* =========================================
                    CARDS GRID (3 Columns for Landscape Images)
                ========================================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {procedures.map((proc, idx) => (
                        <div
                            key={idx}
                            ref={addToCards}
                            className="group bg-white rounded-3xl overflow-hidden shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(10,25,47,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full"
                        >
                            {/* Card Image Area (Landscape ratio) */}
                            <div className="w-full aspect-[16/9] relative bg-slate-200 overflow-hidden shrink-0">
                                <img
                                    src={proc.image}
                                    alt={proc.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                {/* Optional subtle gradient overlay */}
                                <div className="absolute inset-0 bg-[#0A192F]/5 mix-blend-multiply"></div>
                            </div>

                            {/* Card Content Area (Stacked underneath) */}
                            <div className="p-6 md:p-8 flex flex-col flex-grow bg-white">
                                <div className="text-[#14B8A6] font-serif font-medium text-lg md:text-xl mb-3 opacity-90">
                                    {proc.id}
                                </div>
                                <h3 className="text-xl md:text-2xl font-bold mb-3 leading-snug tracking-tight text-[#0A192F] group-hover:text-[#14B8A6] transition-colors duration-300">
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