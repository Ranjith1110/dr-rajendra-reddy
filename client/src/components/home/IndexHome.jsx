import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { FiCalendar, FiArrowRight } from 'react-icons/fi';

// Relative path to your video
import heroVideo from '../../assets/demo.mp4';

const IndexHome = () => {
    const heroRef = useRef(null);
    const videoRef = useRef(null);
    // Use an array to store refs cleanly
    const textRefs = useRef([]);

    // Helper to add elements to the ref array
    const addToRefs = (el) => {
        if (el && !textRefs.current.includes(el)) {
            textRefs.current.push(el);
        }
    };

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // 1. Cinematic Video settle effect
            tl.fromTo(videoRef.current,
                { scale: 1.15, filter: "brightness(0.6)" },
                { scale: 1.05, filter: "brightness(1)", duration: 2.5, ease: "power3.out" }
            );

            // 2. Smooth, staggered text reveal
            tl.fromTo(textRefs.current,
                { y: 40, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, stagger: 0.15, ease: "power3.out" },
                "-=2" // Start this animation while the video is still settling
            );

        }, heroRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={heroRef} className="relative w-full h-[100dvh] min-h-[600px] flex items-center justify-center overflow-hidden bg-black">

            {/* --- Background Looping Video --- */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover origin-center"
                >
                    <source src={heroVideo} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                {/* --- Darker Black Overlays --- */}
                {/* 1. Universal solid black tint to darken the entire video */}
                <div className="absolute inset-0 bg-black/50 z-10"></div>
                
                {/* 2. Heavy black gradient for ultra-clear text readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-transparent md:bg-gradient-to-r md:from-black md:via-black/80 md:to-transparent z-10"></div>
            </div>

            {/* --- Hero Content --- */}
            <div className="relative z-20 max-w-7xl mx-auto w-full px-5 sm:px-8 md:px-12 flex flex-col justify-end md:justify-center h-full pb-32 md:pb-0 pt-24 md:pt-20">

                <div className="max-w-3xl">

                    {/* Main Headline */}
                    <h1
                        ref={addToRefs}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight leading-[1.15] md:leading-[1.1] mb-5 md:mb-6"
                    >
                        Relieve Pain. <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#2DD4BF] to-[#0D9488]">
                            Restore Mobility.
                        </span>
                    </h1>

                    {/* Sub-headline */}
                    <p
                        ref={addToRefs}
                        className="text-base sm:text-lg md:text-xl text-slate-300 font-light leading-relaxed mb-8 md:mb-10 max-w-xl md:max-w-2xl"
                    >
                        Pioneering minimally invasive solutions to complex spinal conditions. Get expert care from Dr. Rajendra Reddy to return to an active, pain-free life.
                    </p>

                    {/* Call to Action Buttons */}
                    <div
                        ref={addToRefs}
                        className="flex flex-col sm:flex-row items-start sm:items-center gap-4 md:gap-5"
                    >
                        <a
                            href="#book"
                            className="flex items-center justify-center gap-2 bg-[#0D9488] text-white px-8 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold hover:bg-[#0F766E] hover:shadow-[0_10px_30px_rgba(13,148,136,0.4)] transition-all duration-300 active:scale-95 w-full sm:w-auto"
                        >
                            <FiCalendar size={18} />
                            Book Consultation
                        </a>

                        <a
                            href="#treatments"
                            className="flex items-center justify-center gap-2 bg-transparent text-white border border-white/30 px-8 py-3.5 md:py-4 rounded-full text-sm md:text-base font-semibold hover:bg-white/10 hover:border-white transition-all duration-300 w-full sm:w-auto group"
                        >
                            Explore Treatments
                            <FiArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                        </a>
                    </div>
                </div>

            </div>

            {/* --- Scroll Down Indicator --- */}
            <div
                ref={addToRefs}
                className="absolute bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
            >
                <span className="text-white/50 text-[10px] md:text-xs font-semibold tracking-widest uppercase">Scroll</span>
                <div className="w-[1px] h-10 md:h-12 bg-white/20 relative overflow-hidden">
                    <div className="absolute top-0 left-0 w-full h-1/2 bg-[#2DD4BF] animate-[scrolldown_1.5s_ease-in-out_infinite]"></div>
                </div>
            </div>

            <style jsx>{`
                @keyframes scrolldown {
                    0% { transform: translateY(-100%); }
                    100% { transform: translateY(200%); }
                }
            `}</style>
        </section>
    );
};

export default IndexHome;