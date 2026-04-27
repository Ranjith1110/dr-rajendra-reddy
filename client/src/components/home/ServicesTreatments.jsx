import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons for headers and buttons
import { FiActivity, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ServicesTreatments = () => {
    const sectionRef = useRef(null);
    const boxRef = useRef(null);
    const iconRef = useRef(null);
    const rightRefs = useRef([]);
    const [activeIndex, setActiveIndex] = useState(0);

    // Clean refs to prevent GSAP dupes
    rightRefs.current = [];
    const addToRightRefs = (el) => { if (el && !rightRefs.current.includes(el)) rightRefs.current.push(el); };

    // Premium Content Array using Images instead of Icons
    const services = [
        {
            title: "Endoscopic Spine Surgery",
            desc: "Advanced keyhole procedures with minimal tissue damage. Experience dramatically faster recovery times for slip disc and decompression treatments.",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
            gradient: "from-[#14B8A6] to-[#0D9488]"
        },
        {
            title: "Minimally Invasive Care",
            desc: "Tailored surgical programs designed to treat complex spinal issues with extreme precision, ensuring significantly less pain and quicker mobility.",
            image: "https://images.unsplash.com/photo-1581594693702-fbdc51b2763b?q=80&w=800&auto=format&fit=crop",
            gradient: "from-[#0EA5E9] to-[#0284C7]"
        },
        {
            title: "Advanced Procedures",
            desc: "Dedicated to helping you achieve a pain-free life through targeted interventions like vertebroplasty, kyphoplasty, and regenerative PRP therapy.",
            image: "https://images.unsplash.com/photo-1579684385127-1ef15d508118?q=80&w=800&auto=format&fit=crop",
            gradient: "from-[#8B5CF6] to-[#6D28D9]"
        },
        {
            title: "Comprehensive Wellness",
            desc: "Our care goes far beyond surgery. We offer holistic preventive assessments, expert posture evaluation, and ergonomic screening for lasting health.",
            image: "https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop",
            gradient: "from-[#F59E0B] to-[#D97706]"
        }
    ];

    // --- 1. GSAP Scroll Navigation (Desktop Right Side) ---
    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            // Only apply the scroll-spy logic on desktop screens
            let mm = gsap.matchMedia();

            mm.add("(min-width: 768px)", () => {
                rightRefs.current.forEach((item, index) => {
                    // Update the active index based on which text is in the center
                    ScrollTrigger.create({
                        trigger: item,
                        start: "top center",
                        end: "bottom center",
                        onToggle: self => {
                            if (self.isActive) setActiveIndex(index);
                        }
                    });

                    // Smooth fade-in and slide up for the text blocks
                    gsap.fromTo(item,
                        { opacity: 0.15, x: 30 },
                        {
                            opacity: 1, x: 0,
                            duration: 0.6,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: item,
                                start: "top 65%",
                                end: "bottom 35%",
                                toggleActions: "play reverse play reverse",
                            }
                        }
                    );
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // --- 2. Dynamic 3D Image Transition Logic ---
    useEffect(() => {
        // Whenever the user scrolls to a new section, morph the 3D image block
        gsap.fromTo(iconRef.current,
            { scale: 0.5, opacity: 0, rotationY: 90 },
            { scale: 1, opacity: 1, rotationY: 0, duration: 0.6, ease: "back.out(1.5)" }
        );
    }, [activeIndex]);

    // --- 3. Interactive 3D Mouse Hover Effect ---
    const handleMouseMove = (e) => {
        if (!boxRef.current) return;
        const rect = boxRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        // Limit the tilt angle for a realistic feel
        const rotateX = ((y - centerY) / centerY) * -15;
        const rotateY = ((x - centerX) / centerX) * 15;

        gsap.to(boxRef.current, {
            rotateX, rotateY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        // Snap back to 0 perfectly when mouse leaves
        gsap.to(boxRef.current, {
            rotateX: 0, rotateY: 0,
            duration: 0.8,
            ease: "power3.out"
        });
    };

    return (
        <section ref={sectionRef} id="services" className="relative w-full bg-[#FAFAFA] border-t border-slate-100">
            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row relative">

                {/* =========================================
                    DESKTOP LEFT: Sticky 3D Interface
                ========================================= */}
                <div className="hidden md:flex md:w-[45%] sticky top-0 h-screen flex-col justify-center items-start pr-12 lg:pr-20">

                    <div className="inline-flex items-center gap-2 text-[#14B8A6] font-bold tracking-[0.2em] text-[10px] uppercase mb-5 bg-[#14B8A6]/10 px-4 py-2 rounded-full">
                        <FiActivity size={14} /> Medical Excellence
                    </div>

                    <h2 className="text-4xl lg:text-6xl font-black text-[#0A192F] tracking-tight mb-12 leading-[1.1]">
                        Future-Ready <br />
                        <span className="text-[#14B8A6]">Spine Care.</span>
                    </h2>

                    {/* The 3D Pliable Box */}
                    <div
                        ref={boxRef}
                        onMouseMove={handleMouseMove}
                        onMouseLeave={handleMouseLeave}
                        className="relative w-full aspect-square max-w-[380px] rounded-[3rem] bg-white border border-slate-200 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.08)] flex items-center justify-center cursor-pointer will-change-transform"
                        style={{ transformStyle: 'preserve-3d', perspective: '1000px' }}
                    >
                        {/* The Animated Image Container inside the box */}
                        <div ref={iconRef} className="relative z-10 flex items-center justify-center w-full h-full" style={{ transformStyle: 'preserve-3d' }}>

                            {/* Glowing shadow pushed back for depth */}
                            <div
                                className={`absolute w-52 h-52 rounded-[2rem] bg-gradient-to-br ${services[activeIndex].gradient} opacity-25 blur-2xl`}
                                style={{ transform: 'translateZ(-20px)' }}
                            ></div>

                            {/* Physical floating IMAGE block pushed OUT towards the user */}
                            <div
                                className={`relative w-48 h-48 rounded-[2rem] shadow-2xl shadow-[#14B8A6]/20 overflow-hidden border-4 border-white bg-slate-100`}
                                style={{ transform: 'translateZ(80px)' }}
                            >
                                {/* Subtle gradient overlay to tie the image into the brand colors */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${services[activeIndex].gradient} opacity-20 mix-blend-overlay z-10 pointer-events-none`}></div>

                                <img
                                    src={services[activeIndex].image}
                                    alt={services[activeIndex].title}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                        </div>
                    </div>
                </div>

                {/* =========================================
                    DESKTOP RIGHT: Scrolling Story Text
                ========================================= */}
                <div className="hidden md:block md:w-[55%] pt-[25vh] pb-[25vh] pl-10 lg:pl-16 border-l border-slate-200/50">
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            ref={addToRightRefs}
                            className="min-h-[50vh] flex flex-col justify-center py-10"
                        >
                            <div className="text-[#14B8A6] font-mono text-xl lg:text-2xl font-bold mb-4 opacity-50">
                                0{idx + 1}
                            </div>
                            <h3 className="text-3xl lg:text-4xl font-bold text-[#0A192F] mb-6 tracking-tight pr-4">
                                {service.title}
                            </h3>
                            <p className="text-lg lg:text-xl text-slate-500 leading-relaxed mb-8 max-w-xl font-medium">
                                {service.desc}
                            </p>
                            <button className="w-fit inline-flex items-center gap-2 text-[#0A192F] font-bold pb-1 border-b-2 border-[#14B8A6] hover:gap-4 transition-all duration-300">
                                Explore Procedure <FiArrowRight className="text-[#14B8A6]" />
                            </button>
                        </div>
                    ))}
                </div>

                {/* =========================================
                    MOBILE VIEW: Stacked Elegant Cards
                ========================================= */}
                <div className="md:hidden flex flex-col w-full pt-20 pb-20">

                    {/* Mobile Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 text-[#14B8A6] font-bold tracking-[0.2em] text-[10px] uppercase mb-4 bg-[#14B8A6]/10 px-4 py-2 rounded-full">
                            <FiActivity size={12} /> Medical Excellence
                        </div>
                        <h2 className="text-4xl font-black text-[#0A192F] tracking-tight leading-[1.1]">
                            Future-Ready <br />
                            <span className="text-[#14B8A6]">Spine Care.</span>
                        </h2>
                    </div>

                    {/* Mobile Cards */}
                    <div className="flex flex-col gap-8">
                        {services.map((service, idx) => (
                            <div key={idx} className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-100 flex flex-col">

                                {/* Mobile Image Header */}
                                <div className="w-full h-48 sm:h-56 rounded-2xl overflow-hidden mb-6 relative shadow-md">
                                    <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-20 mix-blend-overlay z-10 pointer-events-none`}></div>
                                    <img
                                        src={service.image}
                                        alt={service.title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="text-[#14B8A6] font-mono text-sm font-bold mb-2">0{idx + 1}</div>
                                <h3 className="text-2xl font-bold text-[#0A192F] mb-4 tracking-tight">{service.title}</h3>
                                <p className="text-slate-500 leading-relaxed mb-8 text-sm">{service.desc}</p>

                                <button className="mt-auto w-fit inline-flex items-center gap-2 text-[#0A192F] text-sm font-bold pb-1 border-b-2 border-[#14B8A6]">
                                    Explore Procedure <FiArrowRight className="text-[#14B8A6]" />
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
};

export default ServicesTreatments;