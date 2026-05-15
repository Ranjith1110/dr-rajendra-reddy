import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { FiArrowDown, FiStar, FiCheckCircle, FiAward, FiActivity } from 'react-icons/fi';

const AboutHero = () => {
    const heroRef = useRef(null);
    const textRefs = useRef([]);

    // Refs for the floating dashboard elements
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);
    const badgeRef = useRef(null);
    const centerRingRef = useRef(null);

    // Helper to push text elements into the ref array cleanly
    textRefs.current = [];
    const addToTextRefs = (el) => { if (el && !textRefs.current.includes(el)) textRefs.current.push(el); };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            // Initial States
            gsap.set(textRefs.current, { yPercent: 120, rotation: 3 });
            gsap.set([card1Ref.current, card2Ref.current, card3Ref.current, badgeRef.current], {
                autoAlpha: 0,
                y: 50,
                scale: 0.9,
                rotationX: 15,
                transformPerspective: 1000
            });
            gsap.set(centerRingRef.current, { scale: 0, autoAlpha: 0 });

            // 1. Text Reveal
            tl.to(textRefs.current, {
                yPercent: 0,
                rotation: 0,
                stagger: 0.15,
                duration: 1.2,
                ease: "power4.out"
            })
                // 2. Center Abstract Ring Reveal
                .to(centerRingRef.current, {
                    scale: 1,
                    autoAlpha: 1,
                    duration: 1.5,
                    ease: "elastic.out(1, 0.5)"
                }, "-=0.8")
                // 3. Floating Metric Cards pop in
                .to([card1Ref.current, card2Ref.current, card3Ref.current, badgeRef.current], {
                    autoAlpha: 1,
                    y: 0,
                    scale: 1,
                    rotationX: 0,
                    stagger: 0.15,
                    duration: 1.2,
                    ease: "back.out(1.2)"
                }, "-=1");

        }, heroRef);

        return () => ctx.revert();
    }, []);

    // --- Interactive Mouse Parallax Effect ---
    const handleMouseMove = (e) => {
        if (window.innerWidth < 1024) return; // Only apply on desktop

        const { clientX, clientY } = e;
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const moveX = (clientX - centerX) / centerX;
        const moveY = (clientY - centerY) / centerY;

        // Apply different depths/speeds to each card to create 3D space
        gsap.to(card1Ref.current, { x: moveX * 40, y: moveY * 40, rotateX: moveY * -10, rotateY: moveX * 10, duration: 1, ease: "power2.out" });
        gsap.to(card2Ref.current, { x: moveX * -30, y: moveY * -30, rotateX: moveY * -5, rotateY: moveX * 5, duration: 1, ease: "power2.out" });
        gsap.to(card3Ref.current, { x: moveX * 20, y: moveY * 20, rotateX: moveY * -15, rotateY: moveX * 15, duration: 1, ease: "power2.out" });
        gsap.to(badgeRef.current, { x: moveX * -50, y: moveY * -50, duration: 1, ease: "power2.out" });
    };

    const handleMouseLeave = () => {
        gsap.to([card1Ref.current, card2Ref.current, card3Ref.current, badgeRef.current], {
            x: 0, y: 0, rotateX: 0, rotateY: 0,
            duration: 1.5,
            ease: "elastic.out(1, 0.3)"
        });
    };

    const scrollToAbout = () => {
        const aboutSection = document.getElementById('about');
        if (aboutSection) {
            aboutSection.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section
            ref={heroRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="relative w-full min-h-[100dvh] pt-26 pb-20 md:pb-24 flex items-center overflow-hidden"
        >

            <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">

                {/* =========================================
                    LEFT: MASSIVE TYPOGRAPHY
                ========================================= */}
                <div className="lg:col-span-6 flex flex-col justify-center text-center lg:text-left z-20">


                    <h1 className="text-[56px] sm:text-[72px] md:text-[90px] mt-10 leading-[0.95] tracking-tight mb-8 flex flex-col items-center lg:items-start">
                        <div className="overflow-hidden pb-2">
                            <span ref={addToTextRefs} className="block font-serif font-black italic">
                               Restoring Quality of Life.
                            </span>
                        </div>
                    </h1>

                    <div className="overflow-hidden mb-10 flex justify-center lg:justify-start">
                        <p ref={addToTextRefs} className="text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-md">
                            Dr. Rajendra Reddy is a pioneer in endoscopic spine surgery, dedicated to eliminating pain through world-class, minimally invasive techniques.
                        </p>
                    </div>

                    <div className="overflow-hidden flex justify-center lg:justify-start">
                        <button
                            ref={addToTextRefs}
                            onClick={scrollToAbout}
                            className="group inline-flex items-center gap-3 bg-[#0A192F] text-white px-8 py-4 rounded-full font-bold shadow-[0_10px_30px_rgba(10,25,47,0.2)] hover:bg-[#14B8A6] hover:shadow-[0_20px_40px_rgba(20,184,166,0.3)] hover:-translate-y-1 transition-all duration-300"
                        >
                            Read Full Biography
                            <FiArrowDown className="group-hover:translate-y-1 transition-transform" size={18} />
                        </button>
                    </div>

                </div>

                {/* =========================================
                    RIGHT: 3D FLOATING METRICS DASHBOARD
                ========================================= */}
                <div className="lg:col-span-6 relative flex justify-center items-center mt-10 lg:mt-0 z-10 h-[500px] md:h-[650px] w-full" style={{ perspective: '1500px' }}>

                    {/* Abstract Center Rings */}
                    <div ref={centerRingRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[250px] h-[250px] md:w-[350px] md:h-[350px] border-[2px] border-[#14B8A6]/20 rounded-full animate-[spin_20s_linear_infinite]"></div>
                        <div className="absolute w-[150px] h-[150px] md:w-[200px] md:h-[200px] border-[1px] border-[#0A192F]/10 rounded-full animate-[spin_15s_linear_infinite_reverse]"></div>
                        <div className="absolute w-4 h-4 bg-[#14B8A6] rounded-full blur-[10px] opacity-50 animate-pulse"></div>
                    </div>

                    {/* Spinning SVG Badge (Top Left Area) */}
                    <div
                        ref={badgeRef}
                        className="absolute top-10 left-4 md:top-20 md:left-12 w-28 h-28 md:w-36 md:h-36 z-30 animate-[spin_10s_linear_infinite] will-change-transform"
                    >
                        <svg viewBox="0 0 100 100" width="100%" height="100%" className="drop-shadow-lg">
                            <defs>
                                <path id="circle" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" />
                            </defs>
                            <text fontSize="11.5" fill="#0A192F" fontWeight="900" letterSpacing="1.5">
                                <textPath href="#circle">
                                    EXPERT SPINE SURGEON • HYDERABAD •
                                </textPath>
                            </text>
                        </svg>
                        <div className="absolute inset-0 flex items-center justify-center text-[#14B8A6]">
                            <FiStar size={24} className="animate-pulse" />
                        </div>
                    </div>

                    {/* Card 1: Experience (Top Right) */}
                    <div
                        ref={card1Ref}
                        className="absolute top-4 right-0 md:top-16 md:right-8 bg-[#0A192F] text-white p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_rgba(10,25,47,0.3)] w-[220px] md:w-[260px] z-20 will-change-transform"
                    >
                        <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center text-[#14B8A6] mb-6">
                            <FiAward size={24} />
                        </div>
                        <div className="text-4xl md:text-5xl font-serif mb-2">15<span className="text-[#14B8A6] font-sans font-black">+</span></div>
                        <div className="text-slate-400 text-xs md:text-sm font-bold uppercase tracking-widest leading-snug">
                            Years of <br /> Surgical Excellence
                        </div>
                    </div>

                    {/* Card 2: Procedures (Bottom Right) */}
                    <div
                        ref={card2Ref}
                        className="absolute bottom-12 right-4 md:bottom-24 md:right-0 bg-gradient-to-br from-[#14B8A6] to-[#0D9488] text-white p-6 md:p-8 rounded-[2rem] shadow-[0_20px_40px_rgba(20,184,166,0.4)] w-[200px] md:w-[240px] z-40 will-change-transform"
                    >
                        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center text-white mb-4">
                            <FiActivity size={20} />
                        </div>
                        <div className="text-3xl md:text-4xl font-black mb-1">1500+</div>
                        <div className="text-teal-100 text-[10px] md:text-xs font-bold uppercase tracking-widest">
                            Successful Procedures
                        </div>
                    </div>

                    {/* Card 3: Board Certified (Bottom Left) */}
                    <div
                        ref={card3Ref}
                        className="absolute bottom-4 left-0 md:bottom-16 md:left-4 bg-white/80 backdrop-blur-xl border border-white p-5 md:p-6 rounded-[1.5rem] shadow-[0_20px_40px_rgba(0,0,0,0.08)] flex items-center gap-4 w-[260px] md:w-[300px] z-30 will-change-transform"
                    >
                        <div className="w-12 h-12 rounded-xl bg-teal-50 flex items-center justify-center text-[#14B8A6] shrink-0 border border-teal-100">
                            <FiCheckCircle size={24} />
                        </div>
                        <div>
                            <h3 className="font-black  text-lg md:text-xl leading-none mb-1">Board Certified</h3>
                            <p className="text-slate-500 text-[10px] md:text-xs font-bold uppercase tracking-wide">International Fellow</p>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
};

export default AboutHero;