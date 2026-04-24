import React, { useRef, useLayoutEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons
import {
    FiActivity, FiTarget, FiShield, FiPlus,
    FiCheck, FiFeather, FiLayers, FiSun
} from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ServicesTreatments = () => {
    const sectionRef = useRef(null);
    const categoryRefs = useRef([]);
    const [activeSection, setActiveSection] = useState(0);

    // Clear refs on re-render to prevent duplication
    categoryRefs.current = [];
    const addToCategoryRefs = (el) => { if (el && !categoryRefs.current.includes(el)) categoryRefs.current.push(el); };

    const servicesData = [
        {
            id: 'treatments',
            title: 'Treatments & Services',
            icon: <FiActivity />,
            items: [
                "Endoscopic Spine Surgery (Keyhole)",
                "Minimally Invasive Spine Surgery (MISS)",
                "Slip Disc / Disc Herniation Treatment",
                "Sciatica Treatment",
                "Spinal Stenosis Management",
                "Degenerative Spine Disorders",
                "Spine Trauma Management",
                "Vertebral Compression Fracture",
                "Revision Spine Surgery",
                "Non-Surgical Spine Care"
            ]
        },
        {
            id: 'advanced',
            title: 'Advanced Procedures',
            icon: <FiTarget />,
            items: [
                "Percutaneous Endoscopic Discectomy",
                "Endoscopic Decompression Surgery",
                "Minimally Invasive Spine Fixation",
                "Vertebroplasty & Kyphoplasty",
                "Regenerative Therapies (PRP / Biologics)",
                "Pain Management Interventions"
            ]
        },
        {
            id: 'programs',
            title: 'Packages & Programs',
            icon: <FiShield />,
            items: [
                "Spine Health Screening Programs",
                "Preventive Spine Assessment (ASRI)",
                "Posture & Ergonomic Evaluation",
                "Corporate Spine Wellness Programs"
            ]
        }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            let mm = gsap.matchMedia();

            // DESKTOP & TABLET ANIMATIONS
            mm.add("(min-width: 768px)", () => {
                categoryRefs.current.forEach((catRef, index) => {
                    const cards = catRef.querySelectorAll('.service-card');

                    // 1. Reveal Animation (Cards stagger in)
                    gsap.fromTo(cards,
                        { autoAlpha: 0, y: 40, scale: 0.95 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            scale: 1,
                            stagger: 0.05,
                            duration: 0.6,
                            ease: "back.out(1.2)",
                            scrollTrigger: {
                                trigger: catRef,
                                start: "top 75%", // Triggers when category enters lower quarter of screen
                                toggleActions: "play none none reverse", // Replays on scroll back up
                                onEnter: () => setActiveSection(index),
                                onEnterBack: () => setActiveSection(index)
                            }
                        }
                    );

                    // 2. Focus Shift (Fades out when scrolling past)
                    gsap.to(catRef, {
                        autoAlpha: 0.3,
                        scale: 0.98,
                        scrollTrigger: {
                            trigger: catRef,
                            start: "top 15%", // Fades when it hits the top of the screen
                            end: "bottom 0%",
                            scrub: true // Smoothly scrubs the fade effect based on scroll velocity
                        }
                    });
                });
            });

            // MOBILE ANIMATIONS
            mm.add("(max-width: 767px)", () => {
                categoryRefs.current.forEach((catRef, index) => {
                    const cards = catRef.querySelectorAll('.service-card');

                    gsap.fromTo(cards,
                        { autoAlpha: 0, y: 20 },
                        {
                            autoAlpha: 1,
                            y: 0,
                            stagger: 0.08,
                            duration: 0.5,
                            ease: "power2.out",
                            scrollTrigger: {
                                trigger: catRef,
                                start: "top 85%",
                                toggleActions: "play none none reverse",
                                onEnter: () => setActiveSection(index),
                                onEnterBack: () => setActiveSection(index)
                            }
                        }
                    );
                });
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Helper to assign a random icon to items for a premium look
    const getRandomIcon = (idx) => {
        const icons = [<FiPlus />, <FiCheck />, <FiFeather />, <FiLayers />, <FiSun />];
        return icons[idx % icons.length];
    };

    return (
        <section ref={sectionRef} id="treatments" className="relative w-full bg-[#FAFAFA] py-20 md:py-32 overflow-hidden">

            <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row relative">

                {/* --- LEFT COLUMN: Sticky Storytelling Indicator --- */}
                <div className="w-full md:w-1/3 md:pr-12 relative z-20 mb-12 md:mb-0">
                    {/* Using sticky top for smooth, non-glitchy pinning behavior */}
                    <div className="md:sticky md:top-32 left-0">

                        <div className="inline-flex items-center gap-2 text-[#14B8A6] font-bold tracking-widest text-[10px] md:text-xs uppercase mb-3 bg-[#14B8A6]/10 px-3 py-1.5 rounded-full">
                            <FiActivity size={14} /> Comprehensive Care
                        </div>

                        <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-[#0A192F] tracking-tight leading-[1.1] mb-6 md:mb-10">
                            Services & <br className="hidden md:block" />
                            <span className="text-[#14B8A6]">Treatments</span>
                        </h2>

                        <p className="text-slate-500 font-medium mb-10 max-w-sm">
                            Advanced spine care solutions tailored to restore your mobility and eliminate pain through precision medicine.
                        </p>

                        {/* Interactive Desktop Index */}
                        <div className="hidden md:flex flex-col gap-4 border-l-2 border-slate-200 pl-6 relative">
                            {/* Animated Active Line Indicator */}
                            <div
                                className="absolute left-[-2px] w-[2px] bg-[#14B8A6] transition-all duration-500 ease-out"
                                style={{
                                    top: `${activeSection * (100 / servicesData.length)}%`,
                                    height: `${100 / servicesData.length}%`
                                }}
                            ></div>

                            {servicesData.map((category, idx) => (
                                <div
                                    key={idx}
                                    className={`transition-all duration-300 ease-out cursor-default flex items-center gap-4 ${activeSection === idx
                                            ? "text-[#14B8A6] translate-x-2"
                                            : "text-slate-400 hover:text-slate-600"
                                        }`}
                                >
                                    <div className={`p-2 rounded-lg transition-colors duration-300 ${activeSection === idx ? "bg-[#14B8A6]/10" : "bg-transparent"}`}>
                                        {category.icon}
                                    </div>
                                    <span className="font-bold text-sm tracking-wide uppercase">{category.title}</span>
                                </div>
                            ))}
                        </div>

                    </div>
                </div>

                {/* --- RIGHT COLUMN: Scrolling Service Content --- */}
                <div className="w-full md:w-2/3 flex flex-col pb-20 md:pb-64 relative z-10">

                    {servicesData.map((category, index) => (
                        <div
                            key={index}
                            ref={addToCategoryRefs}
                            className="mb-16 md:mb-32 w-full pt-10" // Padding top to give breathing room as it scrolls up
                        >
                            {/* Mobile Category Title */}
                            <div className="md:hidden flex items-center gap-3 mb-6">
                                <div className="w-10 h-10 rounded-xl bg-[#14B8A6]/10 text-[#14B8A6] flex items-center justify-center">
                                    {category.icon}
                                </div>
                                <h3 className="text-xl font-bold text-[#0A192F]">{category.title}</h3>
                            </div>

                            {/* Service Cards Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-5">
                                {category.items.map((item, idx) => (
                                    <div
                                        key={idx}
                                        className="service-card group bg-white border border-slate-200/60 rounded-2xl p-4 md:p-5 flex items-start gap-4 hover:border-[#14B8A6]/50 hover:shadow-[0_15px_30px_-5px_rgba(20,184,166,0.15)] transition-all duration-300 hover:-translate-y-1 cursor-default relative overflow-hidden"
                                    >
                                        {/* Subtle Hover Gradient Inside Card */}
                                        <div className="absolute inset-0 bg-gradient-to-br from-[#14B8A6]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                                        <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center text-[#14B8A6] group-hover:bg-[#14B8A6] group-hover:text-white transition-colors duration-300 shrink-0 relative z-10">
                                            {getRandomIcon(idx)}
                                        </div>

                                        <div className="relative z-10 pt-1">
                                            <h4 className="font-bold text-slate-700 text-sm md:text-base group-hover:text-[#0A192F] transition-colors duration-300 leading-tight">
                                                {item}
                                            </h4>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default ServicesTreatments;