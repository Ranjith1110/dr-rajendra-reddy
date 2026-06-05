import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const StatsMarquee = () => {
    const sectionRef = useRef(null);
    const marqueeRef = useRef(null);
    const countersRef = useRef([]);

    // Ensure clean storage of counter DOM refs
    countersRef.current = [];
    const addToCounters = (el) => {
        if (el && !countersRef.current.includes(el)) {
            countersRef.current.push(el);
        }
    };

    // --- Marquee Data ---
    // Repeating items to ensure a seamless infinite scroll loop
    const marqueeItems = [
        "MS ORTHOPAEDICS",
        "FRGUHS • SPINE SURGERY",
        "FELLOWSHIP • ENDOSCOPIC SPINE SURGERY",
        "FELLOWSHIP • Barcelona, Spain, Australia and South korea.",
        "TSMC: 35214",
        "MS ORTHOPAEDICS",
        "FRGUHS • SPINE SURGERY",
        "FELLOWSHIP • ENDOSCOPIC SPINE SURGERY",
        "FELLOWSHIP • Barcelona, Spain, Australia and South korea.",
        "TSMC: 35214"
    ];

    // --- Statistics Data ---
    const statsData = [
        {
            target: 1500,
            suffix: "+",
            label: "PROCEDURES PERFORMED"
        },
        {
            target: 6,
            suffix: "+ yrs",
            label: "SPINE SPECIALTY PRACTICE"
        },
        {
            target: 98,
            suffix: "%",
            label: "PATIENT SATISFACTION"
        },
        {
            target: 6,
            suffix: "",
            label: "TOP HOSPITALS SERVED"
        }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            // 1. Infinite Horizontal Scrolling Marquee
            gsap.to(marqueeRef.current, {
                xPercent: -50,
                ease: "none",
                duration: 35,
                repeat: -1
            });

            // 2. Animated Number Counters triggered on scroll
            countersRef.current.forEach((counterEl, index) => {
                const targetValue = statsData[index].target;
                const suffixObj = statsData[index].suffix;
                const currentCount = { val: 0 };

                gsap.to(currentCount, {
                    val: targetValue,
                    duration: 2,
                    ease: "power2.out",
                    scrollTrigger: {
                        trigger: counterEl,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    onUpdate: () => {
                        if (counterEl) {
                            counterEl.innerText = Math.ceil(currentCount.val) + suffixObj;
                        }
                    }
                });
            });

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            className="w-full overflow-hidden"
        >
            {/* =========================================
                TOP SECTION: INFINITE MARQUEE
            ========================================= */}
            <div className="w-full bg-[#FAFAFA] border-b border-slate-200 py-3.5 overflow-hidden select-none">
                <div className="flex w-max">
                    <div ref={marqueeRef} className="flex items-center whitespace-nowrap">
                        {marqueeItems.map((item, idx) => (
                            <div key={idx} className="flex items-center">
                                <span className=" text-xs md:text-sm font-bold tracking-[0.15em] uppercase px-4 md:px-8">
                                    {item}
                                </span>
                                {/* Signature teal accent divider */}
                                <span className="text-[#14B8A6] text-xs px-2">✦</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* =========================================
                BOTTOM SECTION: STATISTICS GRID
            ========================================= */}
            <div className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-24">
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
                    {statsData.map((stat, idx) => (
                        <div key={idx} className="flex flex-col items-center text-center">

                            {/* Premium Serif Number Display in Dark Navy */}
                            <div
                                ref={addToCounters}
                                className="text-4xl sm:text-5xl md:text-6xl font-normal  tracking-tight font-serif mb-2 md:mb-3"
                            >
                                0{stat.suffix}
                            </div>

                            {/* Highly Readable Metric Label in Slate Accent */}
                            <p className="text-slate-500 text-[10px] sm:text-xs font-bold tracking-[0.12em] uppercase max-w-[180px] leading-relaxed">
                                {stat.label}
                            </p>

                        </div>
                    ))}
                </div>
            </div>

        </section>
    );
};

export default StatsMarquee;