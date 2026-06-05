import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons
import { FiAward, FiPlus, FiStar, FiGrid, FiArrowUpRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const InternationalTraining = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const cardsRef = useRef([]);

    // Helper to store card refs cleanly
    cardsRef.current = [];
    const addToCards = (el) => { if (el && !cardsRef.current.includes(el)) cardsRef.current.push(el); };

    // Content mapped directly from your reference image
    const trainingStats = [
        { icon: <FiAward size={22} strokeWidth={1.5} />, text: "FRGUHS Spine Surgery" },
        { icon: <FiPlus size={22} strokeWidth={1.5} />, text: "Fellowship Endoscopic" },
        { icon: <FiStar size={22} strokeWidth={1.5} />, text: "Fellowship Barcelona, Australia and South korea." },
        { icon: <FiGrid size={22} strokeWidth={1.5} />, text: "3 Hospital affiliations" }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            // 1. Text Content staggers in from the left
            tl.fromTo(textRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            )
                // 2. Glassmorphic Cards stagger in
                .fromTo(cardsRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" },
                    "-=0.6"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full bg-[#0A192F] py-24 md:py-32 overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-center gap-16 lg:gap-20">

                {/* =========================================
                    LEFT: CONTENT & TYPOGRAPHY
                ========================================= */}
                <div ref={textRef} className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left">

                
                    <h2 className="text-[2.5rem] sm:text-5xl block font-serif font-black italic text-white tracking-tight leading-[1.1] mb-6">
                        Trained where the <br className="hidden sm:block" />
                        future of spine surgery <br className="hidden sm:block" />
                        is shaped Barcelona, Australia and South korea.
                    </h2>

                    <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-10 max-w-lg font-light">
                        Dr. Reddy's training under world-renowed spine surgeons in Spain, Australia and South korea has helped him bring world class surgical techniques to Hyderabad.
                    </p>

                    <a
                        href="#about"
                        className="inline-flex items-center justify-center gap-2 bg-white  px-7 py-3.5 rounded-full text-sm font-bold hover:bg-[#14B8A6] hover:text-white hover:shadow-[0_10px_20px_rgba(20,184,166,0.3)] transition-all duration-300 group"
                    >
                        Read full biography
                        <FiArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>

                </div>

                {/* =========================================
                    RIGHT: 2x2 GLASSMORPHIC GRID
                ========================================= */}
                <div className="w-full lg:w-1/2 flex justify-center lg:justify-end">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5 w-full max-w-lg">

                        {trainingStats.map((stat, idx) => (
                            <div
                                key={idx}
                                ref={addToCards}
                                className="group bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-6 md:p-8 flex flex-col gap-6 hover:border-[#14B8A6]/50 hover:bg-white/10 transition-colors duration-300"
                            >
                                <div className="text-[#14B8A6] opacity-90 group-hover:scale-110 transition-transform duration-300 origin-left">
                                    {stat.icon}
                                </div>
                                <span className="text-white text-base md:text-lg">
                                    {stat.text}
                                </span>
                            </div>
                        ))}

                    </div>
                </div>

            </div>
        </section>
    );
};

export default InternationalTraining;