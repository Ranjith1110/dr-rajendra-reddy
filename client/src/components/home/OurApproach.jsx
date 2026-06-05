import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons matching the reference design
import { FiSearch, FiStar, FiActivity, FiHeart } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const OurApproach = () => {
    const sectionRef = useRef(null);
    const imageMainRef = useRef(null);
    const imageInsetRef = useRef(null);
    const contentRef = useRef(null);
    const pillsRef = useRef([]);

    // Helper to store pill refs cleanly
    pillsRef.current = [];
    const addToPills = (el) => { if (el && !pillsRef.current.includes(el)) pillsRef.current.push(el); };

    // Content mapped directly from your reference image
    const approachFeatures = [
        { title: "Precise diagnosis", icon: <FiSearch size={18} /> },
        { title: "Non-surgical first", icon: <FiStar size={18} /> },
        { title: "Endoscopic precision", icon: <FiActivity size={18} /> },
        { title: "Faster recovery", icon: <FiHeart size={18} /> }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            // 1. Main Image slides in from the left
            tl.fromTo(imageMainRef.current,
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 1, ease: "power3.out" }
            )
                // 2. Inset Image pops in with a slight bounce
                .fromTo(imageInsetRef.current,
                    { opacity: 0, scale: 0.8, y: 20 },
                    { opacity: 1, scale: 1, y: 0, duration: 0.8, ease: "back.out(1.5)" },
                    "-=0.5"
                )
                // 3. Text Content staggers in from the bottom
                .fromTo(contentRef.current.children,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" },
                    "-=0.8"
                )
                // 4. Feature Pills stagger in
                .fromTo(pillsRef.current,
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="w-full bg-[#F7F5F0] py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col lg:flex-row items-center gap-16 lg:gap-24">

                {/* =========================================
                    LEFT: PICTURE-IN-PICTURE IMAGES
                ========================================= */}
                <div className="w-full lg:w-1/2 relative flex justify-center lg:justify-start pt-8 lg:pt-0">

                    {/* Main Large Image */}
                    <div
                        ref={imageMainRef}
                        className="relative w-[90%] md:w-[80%] lg:w-full aspect-square md:aspect-[4/3] lg:aspect-square rounded-[2rem] overflow-hidden shadow-[0_20px_40px_-15px_rgba(0,0,0,0.15)] bg-slate-200"
                    >
                        {/* Placeholder image matching a consulting doctor */}
                        <img
                            src="/doc-opration.jpg"
                            alt="Doctor Consulting"
                            className="w-full h-full object-cover"
                        />
                    </div>

                    {/* Smaller Overlapping Inset Image */}
                    <div
                        ref={imageInsetRef}
                        className="absolute -bottom-8 -right-4 md:-bottom-12 md:-right-8 lg:-bottom-10 lg:-right-10 w-[45%] aspect-square rounded-[1.5rem] overflow-hidden shadow-2xl border-[6px] border-[#F7F5F0] bg-slate-100 z-10"
                    >
                        {/* Placeholder image matching a medical spine/heart model */}
                        <img
                            src="/doc-opration.jpg"
                            alt="Medical Model"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* =========================================
                    RIGHT: CONTENT & FEATURE PILLS
                ========================================= */}
                <div className="w-full lg:w-1/2 flex flex-col mt-12 lg:mt-0">

                    {/* Typography Container */}
                    <div ref={contentRef}>

                        <h2 className="text-4xl sm:text-5xl md:text-6xl block font-serif font-black italic tracking-tight mb-6 leading-tight">
                            Surgery only <br className="hidden lg:block" />
                            <span className="text-[#14B8A6]">when truly necessary.</span>
                        </h2>

                        <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed mb-10 max-w-lg">
                            Most spine concerns can be resolved without major surgery. Dr. Reddy follows a stepped pathway — from diagnosis and regenerative therapies to keyhole endoscopic procedures — choosing the least invasive option that delivers lasting relief.
                        </p>
                    </div>

                    {/* 2x2 Feature Pills Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
                        {approachFeatures.map((feature, idx) => (
                            <div
                                key={idx}
                                ref={addToPills}
                                className="bg-white rounded-2xl p-4 flex items-center gap-4 shadow-sm border border-slate-100 hover:shadow-md hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="text-[#3A4B40] opacity-80">
                                    {feature.icon}
                                </div>
                                <span className="text-slate-700 font-semibold text-sm md:text-base">
                                    {feature.title}
                                </span>
                            </div>
                        ))}
                    </div>

                </div>

            </div>
        </section>
    );
};

export default OurApproach;