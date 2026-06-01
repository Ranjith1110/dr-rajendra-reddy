import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const NonSurgicalCare = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRefs = useRef([]);

    // Helper to cleanly store image refs for GSAP staggering
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
                    start: "top 75%",
                }
            });

            // 1. Text elements slide up and fade in
            tl.fromTo(textRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            )
                // 2. Staggered images reveal
                .fromTo(imageRefs.current,
                    { opacity: 0, y: 50 },
                    { opacity: 1, y: 0, stagger: 0.2, duration: 1, ease: "power3.out" },
                    "-=0.6"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                {/* =========================================
                    LEFT: CONTENT & TYPOGRAPHY
                ========================================= */}
                <div ref={textRef} className="w-full lg:w-1/2 flex flex-col items-start text-left z-10">

                    <h2 className="text-4xl sm:text-5xl md:text-6xl block font-serif font-black italic tracking-tight mb-6 leading-tight">
                        Healing without <br className="hidden lg:block" />
                        <span className="text-[#14B8A6]">the operating room.</span>
                    </h2>

                    <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-lg mb-10">
                        For most patients, conservative options resolve the problem entirely — physiotherapy plans, regenerative injections, ergonomics coaching and pain interventions tailored to the spine.
                    </p>

                    <a
                        href="#contact"
                        className="group inline-flex items-center justify-center gap-2 bg-[#0A192F] text-white px-8 py-4 rounded-full text-sm font-semibold shadow-lg hover:bg-[#14B8A6] hover:shadow-[0_15px_30px_rgba(20,184,166,0.3)] hover:-translate-y-1 transition-all duration-300"
                    >
                        Speak to the team
                        <FiArrowUpRight size={18} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                </div>

                {/* =========================================
                    RIGHT: STAGGERED IMAGES
                ========================================= */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end gap-4 sm:gap-6 relative z-10">

                    {/* Left Image (Pushed down) */}
                    <div
                        ref={addToImages}
                        className="w-1/2 max-w-[280px] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl shadow-[#0A192F]/10 mt-12 md:mt-20 bg-slate-200"
                    >
                        <img
                            src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
                            alt="Patients doing yoga for back recovery"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>

                    {/* Right Image (Pulled up) */}
                    <div
                        ref={addToImages}
                        className="w-1/2 max-w-[280px] aspect-[3/4] rounded-[2rem] overflow-hidden shadow-xl shadow-[#0A192F]/10 mb-12 md:mb-20 bg-slate-200"
                    >
                        <img
                            src="/doctor.jpg"
                            alt="Doctor consulting with patient"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>

                </div>

            </div>
        </section>
    );
};

export default NonSurgicalCare;