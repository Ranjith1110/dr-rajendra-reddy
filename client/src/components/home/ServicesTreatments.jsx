import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons
import { FiActivity, FiTarget, FiShield, FiLayers } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ServicesTreatments = () => {
    const sectionRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Original Medical Content adapted into the 4-card layout
    const services = [
        {
            title: "Endoscopic Spine Surgery",
            desc: "Advanced keyhole procedures with minimal tissue damage. Experience faster recovery times for slip disc and decompression treatments.",
            icon: <FiActivity size={28} strokeWidth={1.5} />
        },
        {
            title: "Minimally Invasive",
            desc: "Tailored surgical programs designed to treat complex spinal issues with extreme precision, ensuring less pain and quicker mobility.",
            icon: <FiTarget size={28} strokeWidth={1.5} />
        },
        {
            title: "Advanced Procedures",
            desc: "Dedicated to helping you achieve a pain-free life through targeted interventions like vertebroplasty, kyphoplasty, and regenerative PRP.",
            icon: <FiShield size={28} strokeWidth={1.5} />
        },
        {
            title: "Comprehensive Wellness",
            desc: "Our care goes beyond surgery. We offer holistic preventive assessments, posture evaluation, and ergonomic screening for lasting health.",
            icon: <FiLayers size={28} strokeWidth={1.5} />
        }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                }
            });

            // Animate Header Section
            tl.fromTo(".header-anim",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            );

            // Animate Cards Staggering in
            tl.fromTo(".card-anim",
                { opacity: 0, y: 40 },
                { opacity: 1, y: 0, stagger: 0.1, duration: 0.8, ease: "power3.out" },
                "-=0.4"
            );
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="services" className="relative w-full py-24 md:py-32 overflow-hidden">
            
            <div className="max-w-7xl mx-auto px-6 md:px-12">
                
                {/* --- HEADER LAYOUT --- */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 md:mb-20 gap-8">
                    <div className="max-w-3xl">
                        <h2 className="header-anim text-4xl sm:text-5xl md:text-6xl font-black text-[#0A192F] tracking-tight mb-6">
                            Services & <span className="text-[#14B8A6]">Treatments</span>
                        </h2>
                        <p className="header-anim text-base md:text-lg text-slate-500 leading-relaxed max-w-2xl font-medium">
                            Our commitment to your spine health goes beyond just surgical procedures. Discover the advanced treatments that set us apart and ensure you have the best experience on your recovery journey.
                        </p>
                    </div>
                    
                    <div className="header-anim shrink-0">
                        <a 
                            href="#book" 
                            className="inline-block bg-[#14B8A6] text-white px-8 py-3.5 rounded-full font-bold hover:bg-[#0f9587] hover:shadow-lg hover:shadow-teal-500/20 hover:-translate-y-0.5 transition-all duration-300"
                        >
                            Explore All
                        </a>
                    </div>
                </div>

                {/* --- 4-COLUMN CARDS GRID --- */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-stretch">
                    {services.map((service, index) => {
                        const isActive = activeIndex === index;

                        return (
                            <div
                                key={index}
                                onMouseEnter={() => setActiveIndex(index)}
                                className={`card-anim flex flex-col p-6 rounded-[2rem] transition-all duration-500 ease-out cursor-pointer h-full border
                                    ${isActive 
                                        ? "bg-[#0A192F] text-white border-[#0A192F] scale-[1.02] shadow-[0_20px_40px_-10px_rgba(10,25,47,0.3)]" 
                                        : "bg-white text-[#0A192F] border-slate-200 hover:border-slate-300"
                                    }
                                `}
                            >
                                {/* Icon */}
                                <div className={`mb-10 transition-colors duration-500 ${isActive ? "text-[#14B8A6]" : "text-[#14B8A6]"}`}>
                                    {service.icon}
                                </div>

                                {/* Content */}
                                <h3 className={`text-2xl md:text-3xl font-bold tracking-tight mb-5 leading-tight transition-colors duration-500 pr-4`}>
                                    {service.title.split(' ').map((word, i) => (
                                        <React.Fragment key={i}>
                                            {word} <br />
                                        </React.Fragment>
                                    ))}
                                </h3>

                                <p className={`text-sm leading-relaxed mb-6 transition-colors duration-500 font-medium ${isActive ? "text-slate-300" : "text-slate-500"}`}>
                                    {service.desc}
                                </p>

                                {/* Button aligned to bottom */}
                                <div className="mt-auto pt-4">
                                    <button 
                                        className={`px-6 py-3 rounded-full text-sm font-bold transition-all duration-500 w-fit
                                            ${isActive 
                                                ? "bg-[#14B8A6] text-white" 
                                                : "bg-slate-100 text-[#0A192F]"
                                            }
                                        `}
                                    >
                                        Learn More
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>

            </div>
        </section>
    );
};

export default ServicesTreatments;