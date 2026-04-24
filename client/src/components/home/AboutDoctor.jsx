import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons
import {
    FiAward, FiActivity, FiShield,
    FiCheckCircle, FiStar
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const AboutDoctor = () => {
    // Refs for DOM elements
    const sectionRef = useRef(null);
    const heroTitleRef = useRef(null);

    const imgWrapperRef = useRef(null);
    const badgeRef = useRef(null);

    const contentRef = useRef(null);
    const textRefs = useRef([]);
    const specRefs = useRef([]);
    const experienceCountRef = useRef(null);

    // FIX: Clear arrays on every render to prevent massive staggering bugs and overlap errors
    textRefs.current = [];
    specRefs.current = [];

    // Helpers to populate ref arrays cleanly
    const addToTextRefs = (el) => { if (el && !textRefs.current.includes(el)) textRefs.current.push(el); };
    const addToSpecRefs = (el) => { if (el && !specRefs.current.includes(el)) specRefs.current.push(el); };

    // Data structured for clean rendering
    const qualifications = [
        "BSc, MBBS, MS (Orthopaedics) – Bangalore Medical College",
        "FRGUHS (Spine Surgery)",
        "Fellowship in Endoscopic Spine Surgery",
        "Fellowship in Advanced Spine Surgery – Barcelona, Spain"
    ];

    const specialisations = [
        { title: "Endoscopic Spine Surgery", icon: <FiActivity /> },
        { title: "Minimally Invasive Spine", icon: <FiCheckCircle /> },
        { title: "Regenerative Medicine", icon: <FiStar /> },
        { title: "Pain Management", icon: <FiShield /> }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // --------------------------------------------------
            // DESKTOP & TABLET ANIMATION (Sped up & Optimized)
            // --------------------------------------------------
            mm.add("(min-width: 768px)", () => {
                const getXOffset = () => {
                    if (!imgWrapperRef.current) return 0;
                    const currentTransform = imgWrapperRef.current.style.transform;
                    imgWrapperRef.current.style.transform = 'none';
                    const rect = imgWrapperRef.current.getBoundingClientRect();
                    const centerX = window.innerWidth / 2;
                    const elementCenterX = rect.left + (rect.width / 2);
                    imgWrapperRef.current.style.transform = currentTransform;
                    return centerX - elementCenterX;
                };

                const tl = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=1600", // Slightly shorter scroll distance for a punchier feel
                        scrub: 1, // Reduced scrub delay for more responsiveness
                        pin: true,
                        anticipatePin: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // 1. Hero text out
                tl.fromTo(heroTitleRef.current,
                    { autoAlpha: 1, scale: 1, y: 0 },
                    { autoAlpha: 0, scale: 0.9, y: -40, duration: 0.4, ease: "power2.inOut" },
                    0
                )
                    // 2. Image scales and moves
                    .fromTo(imgWrapperRef.current,
                        {
                            x: () => getXOffset(),
                            y: "5vh",
                            scale: 1.5,
                            boxShadow: "0 30px 60px -15px rgba(20, 184, 166, 0.2)",
                        },
                        {
                            x: 0,
                            y: 0,
                            scale: 1,
                            boxShadow: "0 20px 40px -10px rgba(10, 25, 47, 0.1)",
                            duration: 1.0, // Sped up image settling
                            ease: "power3.inOut"
                        },
                        0
                    )
                    // 3. Content fades in MUCH earlier (at 0.4s instead of 1.2s)
                    .fromTo(contentRef.current,
                        { autoAlpha: 0, x: 40 },
                        { autoAlpha: 1, x: 0, duration: 0.6, ease: "power3.out" },
                        0.4
                    )
                    // 4. Text staggers in quickly
                    .fromTo(textRefs.current,
                        { autoAlpha: 0, y: 20 },
                        { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.6, ease: "power3.out" },
                        0.5
                    )
                    // 5. Specialisation cards pop in
                    .fromTo(specRefs.current,
                        { autoAlpha: 0, scale: 0.95, y: 15 },
                        { autoAlpha: 1, scale: 1, y: 0, stagger: 0.05, duration: 0.5, ease: "back.out(1.2)" },
                        0.6
                    )
                    // 6. Badge appears
                    .fromTo(badgeRef.current,
                        { autoAlpha: 0, y: 15, scale: 0.9 },
                        { autoAlpha: 1, y: 0, scale: 1, duration: 0.4, ease: "back.out(1.5)" },
                        0.8
                    );

                // 7. Counter runs early alongside the text reveal
                const counter = { val: 0 };
                tl.to(counter, {
                    val: 6,
                    duration: 0.5,
                    ease: "none",
                    onUpdate: () => {
                        if (experienceCountRef.current) {
                            experienceCountRef.current.innerText = Math.ceil(counter.val) + "+";
                        }
                    }
                }, 0.5);
            });

            // --------------------------------------------------
            // MOBILE ANIMATION (Sped up & Optimized)
            // --------------------------------------------------
            mm.add("(max-width: 767px)", () => {
                const tlMobile = gsap.timeline({
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: "top top",
                        end: "+=900", // Shorter scroll distance for quick mobile interaction
                        scrub: 1,
                        pin: true,
                    }
                });

                tlMobile.fromTo(heroTitleRef.current,
                    { autoAlpha: 1, scale: 1, y: 0 },
                    { autoAlpha: 0, scale: 0.9, y: -20, duration: 0.4 },
                    0
                )
                    .fromTo(imgWrapperRef.current,
                        { scale: 1.3, y: "10vh" },
                        { scale: 1, y: 0, duration: 1.0, ease: "power3.inOut" },
                        0
                    )
                    .fromTo(contentRef.current, { autoAlpha: 0, y: 30 }, { autoAlpha: 1, y: 0, duration: 0.6 }, 0.4)
                    .fromTo(textRefs.current, { autoAlpha: 0, y: 15 }, { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.6 }, 0.5)
                    .fromTo(specRefs.current, { autoAlpha: 0, scale: 0.95 }, { autoAlpha: 1, scale: 1, stagger: 0.05, duration: 0.5 }, 0.6)
                    .fromTo(badgeRef.current, { autoAlpha: 0, scale: 0.8 }, { autoAlpha: 1, scale: 1, duration: 0.4, ease: "back.out" }, 0.7);
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="about" className="relative w-full h-[100dvh] min-h-[100dvh] bg-white overflow-hidden flex items-center">

            {/* --- Hero Text (Fades out smoothly on scroll) --- */}
            <div ref={heroTitleRef} className="absolute inset-0 z-20 flex flex-col items-center justify-start pt-[14vh] md:pt-[12vh] pointer-events-none px-6 text-center">
                <span className="text-[#14B8A6] font-bold tracking-[0.2em] md:tracking-[0.3em] text-[10px] md:text-sm uppercase mb-3 md:mb-4">Meet The Expert</span>
                <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-[#0A192F] tracking-tight">
                    Precision Spine Care.
                </h2>
            </div>

            {/* ================= MAIN CONTENT LAYOUT ================= */}
            <div className="max-w-7xl mx-auto px-4 md:px-12 w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-between relative z-30 pt-12 md:pt-0 pb-6 md:pb-0">

                {/* --- LEFT COLUMN: Image --- */}
                <div className="w-full md:w-5/12 lg:w-1/2 relative flex justify-center md:justify-start items-center shrink-0 h-auto md:h-full py-4 md:py-16 md:pr-10 lg:pr-16">

                    {/* Image Container */}
                    <div
                        ref={imgWrapperRef}
                        className="relative w-[45vw] sm:w-[40vw] md:w-full max-w-[200px] md:max-w-[420px] aspect-[4/5] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden bg-slate-100 shadow-xl border border-slate-200 z-10 will-change-transform"
                    >
                        {/* TODO: Replace src with Dr. Reddy's studio portrait */}
                        <img
                            src="https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?q=80&w=1000&auto=format&fit=crop"
                            alt="Dr. Rajendra Reddy"
                            className="w-full h-full object-cover"
                        />

                        {/* Premium Inner Gradient */}
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/80 via-transparent to-transparent"></div>

                        {/* Floating Badge */}
                        <div ref={badgeRef} className="absolute bottom-2 md:bottom-5 left-2 md:left-5 right-2 md:right-5 bg-white/10 backdrop-blur-md border border-white/20 p-2 md:p-4 rounded-xl md:rounded-2xl flex items-center gap-2 md:gap-4 shadow-lg">
                            <div className="w-7 h-7 md:w-12 md:h-12 bg-[#14B8A6] rounded-full flex items-center justify-center text-white shrink-0 shadow-[0_0_15px_rgba(20,184,166,0.5)]">
                                <FiAward className="w-3.5 h-3.5 md:w-6 md:h-6" />
                            </div>
                            <div>
                                <p className="text-white font-bold text-[9px] md:text-sm leading-none md:leading-tight mb-0.5 md:mb-0">International</p>
                                <p className="text-white/80 text-[7px] md:text-xs leading-none md:leading-tight">Fellowship Trained</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- RIGHT COLUMN: Content --- */}
                <div
                    ref={contentRef}
                    className="w-full md:w-7/12 lg:w-1/2 flex flex-col justify-start h-auto md:h-full max-h-[55vh] md:max-h-[85vh] overflow-y-auto hide-scrollbar pt-4 md:py-20 lg:pl-6"
                >
                    {/* Header Group */}
                    <div className="mb-5 md:mb-8 text-center md:text-left flex flex-col items-center md:items-start">
                        <div ref={addToTextRefs} className="inline-flex items-center gap-1.5 md:gap-2 text-[#14B8A6] font-bold tracking-widest text-[9px] md:text-xs uppercase mb-2 md:mb-3 bg-[#14B8A6]/10 px-3 md:px-4 py-1 md:py-1.5 rounded-full">
                            <FiActivity size={12} className="md:w-3.5 md:h-3.5" /> Lead Surgeon
                        </div>
                        <h2 ref={addToTextRefs} className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-black text-[#0A192F] tracking-tight leading-[1.1] mb-1.5 md:mb-3">
                            Dr. Rajendra <span className="text-[#14B8A6]">Reddy</span>
                        </h2>
                        <h3 ref={addToTextRefs} className="text-sm md:text-xl text-slate-500 font-medium tracking-wide">
                            Spine Specialist | Advanced Care
                        </h3>
                    </div>

                    {/* Stats Row */}
                    <div ref={addToTextRefs} className="grid grid-cols-2 md:flex gap-3 md:gap-5 mb-5 md:mb-8 w-full">
                        <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start gap-1 md:gap-4 bg-white p-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl shadow-sm border border-slate-100 hover:shadow-md transition-shadow">
                            <div className="text-2xl md:text-4xl font-black text-[#14B8A6] tracking-tighter" ref={experienceCountRef}>
                                0+
                            </div>
                            <div className="text-[9px] md:text-xs uppercase tracking-widest text-slate-400 font-bold leading-tight text-center md:text-left">
                                Years<br className="hidden md:block" /> Experience
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row items-center md:items-center justify-center md:justify-start gap-1 md:gap-4 bg-slate-50 p-3 md:px-5 md:py-4 rounded-xl md:rounded-2xl shadow-sm border border-slate-100">
                            <div className="w-6 h-6 md:w-10 md:h-10 rounded-full bg-white flex items-center justify-center shrink-0 shadow-sm border border-slate-100">
                                <FiCheckCircle className="text-[#14B8A6] w-3 h-3 md:w-[18px] md:h-[18px]" />
                            </div>
                            <div className="text-center md:text-left">
                                <div className="text-[8px] md:text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-0.5">TSMC Reg</div>
                                <div className="text-xs md:text-base font-bold text-[#0A192F] tracking-wide">35214</div>
                            </div>
                        </div>
                    </div>

                    <hr ref={addToTextRefs} className="border-slate-100 my-2 md:my-6 w-full" />

                    {/* Qualifications Section */}
                    <div ref={addToTextRefs} className="my-4 md:my-6 w-full px-2 md:px-0">
                        <h4 className="text-sm md:text-lg font-bold text-[#0A192F] mb-3 md:mb-4 flex items-center justify-center md:justify-start gap-2 md:gap-3">
                            <span className="w-1 md:w-1.5 h-4 md:h-6 bg-[#14B8A6] rounded-full block"></span> Qualifications
                        </h4>
                        <ul className="space-y-2 md:space-y-3">
                            {qualifications.map((qual, idx) => (
                                <li key={idx} className="flex items-start justify-center md:justify-start gap-2 md:gap-3 text-slate-600 font-medium text-[11px] md:text-base text-center md:text-left">
                                    <FiCheckCircle className="text-[#14B8A6] shrink-0 mt-[3px] md:mt-0.5 w-3 h-3 md:w-4 md:h-4 hidden md:block" />
                                    <span className="leading-snug md:leading-relaxed">{qual}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <hr ref={addToTextRefs} className="border-slate-100 my-2 md:my-6 w-full" />

                    {/* Specialisations Grid */}
                    <div ref={addToTextRefs} className="mt-4 md:mt-0 w-full px-2 md:px-0">
                        <h4 className="text-sm md:text-lg font-bold text-[#0A192F] mb-3 md:mb-5 flex items-center justify-center md:justify-start gap-2 md:gap-3">
                            <span className="w-1 md:w-1.5 h-4 md:h-6 bg-[#14B8A6] rounded-full block"></span> Core Specialisations
                        </h4>
                        <div className="grid grid-cols-2 gap-2 md:gap-4 pb-10 md:pb-0">
                            {specialisations.map((spec, idx) => (
                                <div
                                    key={idx}
                                    ref={addToSpecRefs}
                                    className="group bg-white border border-slate-200 rounded-lg md:rounded-xl p-2 md:p-4 flex flex-col md:flex-row items-center md:items-center text-center md:text-left gap-2 md:gap-4 hover:border-[#14B8A6]/50 hover:shadow-lg transition-all duration-300 cursor-default"
                                >
                                    <div className="w-8 h-8 md:w-10 md:h-10 rounded-md md:rounded-lg bg-teal-50 flex items-center justify-center text-[#14B8A6] group-hover:bg-[#14B8A6] group-hover:text-white transition-colors duration-300 shrink-0">
                                        {React.cloneElement(spec.icon, { className: "w-4 h-4 md:w-5 md:h-5" })}
                                    </div>
                                    <span className="font-semibold text-slate-700 text-[10px] md:text-sm group-hover:text-[#0A192F] transition-colors duration-300 leading-tight">
                                        {spec.title}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>

            {/* Helper to hide scrollbar on the right column content for a clean UI */}
            <style jsx>{`
                .hide-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .hide-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
            `}</style>
        </section>
    );
};

export default AboutDoctor;