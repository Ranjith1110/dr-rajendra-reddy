import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const InsidePractice = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const imageRefs = useRef([]);

    // Array of your images for easy management
    const practiceImages = [
        "/compassion/1.jpeg",
        "/compassion/2.jpeg",
        "/compassion/4.jpeg",
        "/compassion/5.jpeg",
        "/compassion/6.jpeg",
        "/compassion/3.jpeg",
        "/compassion/7.jpeg"
    ];

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
            // 2. Stagger Reveal the Masonry Images
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
                    DYNAMIC MASONRY GALLERY
                    This prevents any image cropping by letting 
                    images use their natural aspect ratios.
                ========================================= */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 md:gap-4">
                    {practiceImages.map((src, index) => (
                        <div
                            key={index}
                            ref={addToImages}
                            className="break-inside-avoid inline-block w-full mb-4 md:mb-6 relative rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group shadow-sm bg-slate-100"
                        >
                            <img
                                src={src}
                                alt={`Practice Facility ${index + 1}`}
                                // h-auto ensures the image defines its own height, preventing cropping
                                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                            />
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
};

export default InsidePractice;