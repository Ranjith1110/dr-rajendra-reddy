import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SpineTreatmentsIntro = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const imageRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            // 1. Text Content staggers in from the bottom/left
            tl.fromTo(textRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            )
                // 2. Image scales and fades in from the right
                .fromTo(imageRef.current,
                    { opacity: 0, scale: 0.95, x: 30 },
                    { opacity: 1, scale: 1, x: 0, duration: 0.8, ease: "power2.out" },
                    "-=0.6"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                {/* =========================================
                    LEFT: CONTENT & TYPOGRAPHY
                ========================================= */}
                <div ref={textRef} className="w-full lg:w-1/2 flex flex-col items-start text-left">

                    {/* Heading structured similarly to InternationalTraining, matching your brand colors */}
                    <h2 className="text-[2.5rem] sm:text-5xl md:text-[68px] block font-serif font-black italic tracking-tight leading-[1.1] mb-8">
                        Comprehensive spine care <br className="hidden lg:block" />
                        <span className="italic text-[#14B8A6]">focused on your recovery.</span>
                    </h2>

                    <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-lg">
                        Every spine is different. Dr. Rajendra Reddy combines accurate diagnosis, non-surgical pathways and advanced keyhole procedures to match the treatment to <span className="italic">your</span> condition.
                    </p>

                </div>

                {/* =========================================
                    RIGHT: LARGE ROUNDED IMAGE
                ========================================= */}
                <div className="w-full lg:w-1/2 flex justify-center">
                    <div
                        ref={imageRef}
                        className="w-full max-w-[450px] aspect-square lg:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(10,25,47,0.15)] bg-slate-200"
                    >
                        {/* Placeholder image matching the medical model from the reference */}
                        <img
                            src="/comprehensive-spine/1.jpg"
                            alt="Medical Anatomy Model"
                            className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                        />
                    </div>
                </div>

            </div>
        </section>
    );
};

export default SpineTreatmentsIntro;