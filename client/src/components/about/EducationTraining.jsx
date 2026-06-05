import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EducationTraining = () => {
    const sectionRef = useRef(null);
    const textRef = useRef(null);
    const listRefs = useRef([]);

    // Helper to store list item refs cleanly for GSAP staggering
    listRefs.current = [];
    const addToList = (el) => { if (el && !listRefs.current.includes(el)) listRefs.current.push(el); };

    // Content extracted directly from your reference image
    const educationList = [
        { id: "01", text: "BSc" },
        { id: "02", text: "MBBS — Bangalore Medical College" },
        { id: "03", text: "MS Orthopaedics — Bangalore Medical College" },
        { id: "04", text: "FRGUHS (Spine Surgery)" },
        { id: "05", text: "Fellowship in Endoscopic Spine Surgery" },
        { id: "06", text: "Fellowship in Advanced Spine Surgery — Barcelona, Spain, Australia and South korea." }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // 1. Text Content staggers in from the left
            tl.fromTo(textRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            )
                // 2. Education list cards stagger in from the right
                .fromTo(listRefs.current,
                    { opacity: 0, x: 30 },
                    { opacity: 1, x: 0, stagger: 0.1, duration: 0.8, ease: "power2.out" },
                    "-=0.6"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} className="relative w-full py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10 flex flex-col lg:flex-row items-start gap-16 lg:gap-20">

                {/* =========================================
                    LEFT: CONTENT & TYPOGRAPHY
                ========================================= */}
                <div ref={textRef} className="w-full lg:w-5/12 flex flex-col items-start">

                    {/* Styled exactly like InternationalTraining.jsx heading */}
                    <h2 className="text-4xl lg:text-6xl block font-serif font-black italic tracking-tight leading-[1.1]">
                        A foundation <br className="hidden sm:block" />
                        <span className="text-[#14B8A6]">built across India and Europe.</span>
                    </h2>

                </div>

                {/* =========================================
                    RIGHT: STACKED LIST CARDS
                ========================================= */}
                <div className="w-full lg:w-7/12 flex flex-col gap-3 md:gap-4">
                    {educationList.map((item, idx) => (
                        <div
                            key={idx}
                            ref={addToList}
                            className="group bg-white rounded-2xl p-5 md:p-6 flex items-center gap-6 shadow-sm border border-slate-100 hover:shadow-md hover:border-[#14B8A6]/30 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            {/* Number Indicator */}
                            <span className="text-[#14B8A6] font-serif text-xl md:text-2xl italic opacity-80 group-hover:opacity-100 transition-opacity w-8 shrink-0">
                                {item.id}
                            </span>

                            {/* Education Text */}
                            <span className=" text-sm md:text-base font-medium">
                                {item.text}
                            </span>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default EducationTraining;