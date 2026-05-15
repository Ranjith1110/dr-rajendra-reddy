import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InsidePractice = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const imageRefs = useRef([]);

    // Helper to store image refs without duplication for GSAP staggering
    imageRefs.current = [];
    const addToImages = (el) => {
        if (el && !imageRefs.current.includes(el)) {
            imageRefs.current.push(el);
        }
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%", // Trigger when section is 20% into the viewport
                }
            });

            // 1. Reveal Header
            tl.fromTo(headerRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            )
                // 2. Stagger Reveal the Bento Box Images
                .fromTo(imageRefs.current,
                    { opacity: 0, y: 40, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.2)" },
                    "-=0.4"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-24 md:py-32 overflow-hidden font-sans">
            <div className="max-w-7xl mx-auto px-6 md:px-12">


                {/* --- HEADER --- */}
                <div ref={headerRef} className="text-center max-w-4xl mx-auto mb-16 md:mb-20">
                    <h2 className="text-4xl sm:text-5xl md:text-6xl block font-serif font-black italic tracking-tight mb-6 leading-tight">
                        Where precision <br className="md:hidden" />
                        <span className="text-[#14B8A6]">meets compassion.</span>
                    </h2>
                </div>

                {/* =========================================
                    MASONRY / BENTO BOX GRID
                ========================================= */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">

                    {/* --- TOP ROW --- */}
                    {/* Top Left: Large Prominent Image */}
                    <div
                        ref={addToImages}
                        className="md:col-span-2 h-[300px] md:h-[400px] rounded-[2rem] overflow-hidden group shadow-sm bg-slate-200"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1000&auto=format&fit=crop"
                            alt="Medical Anatomy Model"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>

                    {/* Top Right: Stacked Images */}
                    <div className="md:col-span-1 flex flex-col gap-4 md:gap-6 h-[600px] md:h-[400px]">
                        <div
                            ref={addToImages}
                            className="h-1/2 rounded-[2rem] overflow-hidden group shadow-sm bg-slate-200"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1628348068343-c6a848d2b6dd?q=80&w=800&auto=format&fit=crop"
                                alt="Patient Consultation"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                        <div
                            ref={addToImages}
                            className="h-1/2 rounded-[2rem] overflow-hidden group shadow-sm bg-slate-200"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=800&auto=format&fit=crop"
                                alt="Doctor Portrait"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>

                    {/* --- BOTTOM ROW --- */}
                    {/* Bottom Left: Tall Portrait Image */}
                    <div
                        ref={addToImages}
                        className="md:col-span-1 h-[400px] md:h-[400px] rounded-[2rem] overflow-hidden group shadow-sm bg-slate-200"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
                            alt="Patient Recovery Yoga"
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out object-center"
                        />
                    </div>

                    {/* Bottom Right: Complex Grid (2 side-by-side, 1 full width below) */}
                    <div className="md:col-span-2 flex flex-col gap-4 md:gap-6 h-[600px] md:h-[400px]">

                        {/* Upper half of Bottom Right block */}
                        <div className="flex gap-4 md:gap-6 h-1/2">
                            <div
                                ref={addToImages}
                                className="w-1/2 rounded-[2rem] overflow-hidden group shadow-sm bg-slate-200"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop"
                                    alt="Operating Room"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                            <div
                                ref={addToImages}
                                className="w-1/2 rounded-[2rem] overflow-hidden group shadow-sm bg-slate-200"
                            >
                                <img
                                    src="https://images.unsplash.com/photo-1559757175-5700dde675bc?q=80&w=800&auto=format&fit=crop"
                                    alt="Spine Model"
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                            </div>
                        </div>

                        {/* Lower half of Bottom Right block */}
                        <div
                            ref={addToImages}
                            className="h-1/2 rounded-[2rem] overflow-hidden group shadow-sm bg-slate-200"
                        >
                            <img
                                src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=1200&auto=format&fit=crop"
                                alt="Hospital Building"
                                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default InsidePractice;