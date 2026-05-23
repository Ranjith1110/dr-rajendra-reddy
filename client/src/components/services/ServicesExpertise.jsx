import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Swiper imports (Pagination removed)
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// React Icons
import { FiActivity, FiSearch, FiCheckSquare, FiArrowLeft, FiArrowRight, FiArrowUpRight, FiLayers } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ServicesExpertise = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const sliderRef = useRef(null);

    // Formatted Data based exactly on your provided list (No data omitted)
    const servicesData = [
        // --- COMPREHENSIVE EVALUATION ---
        { title: "Comprehensive Spine Evaluation", category: "Evaluation", icon: <FiSearch size={22} /> },
        { title: "Back Pain Assessment", category: "Evaluation", icon: <FiSearch size={22} /> },
        { title: "Neck Pain Evaluation", category: "Evaluation", icon: <FiSearch size={22} /> },
        { title: "Sciatica Diagnosis & Treatment", category: "Evaluation", icon: <FiCheckSquare size={22} /> },
        { title: "Second Opinion for Spine Surgery", category: "Evaluation", icon: <FiLayers size={22} /> },
        { title: "Non-Surgical Spine Care", category: "Evaluation", icon: <FiCheckSquare size={22} /> },

        // --- ENDOSCOPIC SPINE SURGERY ---
        { title: "Full Endoscopic Spine Surgery", category: "Endoscopic Surgery", icon: <FiActivity size={22} /> },
        { title: "Endoscopic Discectomy", category: "Endoscopic Surgery", icon: <FiActivity size={22} /> },
        { title: "Endoscopic Sciatica Surgery", category: "Endoscopic Surgery", icon: <FiActivity size={22} /> },
        { title: "Endoscopic Lumbar Decompression", category: "Endoscopic Surgery", icon: <FiActivity size={22} /> },
        { title: "Endoscopic Cervical Spine Surgery", category: "Endoscopic Surgery", icon: <FiActivity size={22} /> },
        { title: "Daycare Endoscopic Spine Procedures", category: "Endoscopic Surgery", icon: <FiActivity size={22} /> }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // 1. Header elements reveal
            tl.fromTo(headerRef.current.children,
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            )
                // 2. Slider container fade in
                .fromTo(sliderRef.current,
                    { opacity: 0, y: 30 },
                    { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" },
                    "-=0.4"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    // Helper function to assign elegant badge colors based on category
    const getBadgeStyle = (category) => {
        if (category === 'Endoscopic Surgery') return 'bg-[#0A192F] text-white';
        return 'bg-[#14B8A6]/10 text-[#14B8A6]'; // Teal for Evaluations
    };

    return (
        <section ref={sectionRef} className="w-full bg-white py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* =========================================
                    HEADER & CUSTOM NAVIGATION
                ========================================= */}
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-16 mb-12 lg:mb-16">

                    {/* Left: Main Title */}
                    <div className="md:w-2/3">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl block font-serif font-black italic tracking-tight mb-6 leading-tight">
                            Services & Expertise, <br className="hidden lg:block" />
                            <span className="italic text-[#14B8A6]">for every spine.</span>
                        </h2>
                        <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-2xl">
                            From thorough non-surgical assessments and second opinions to state-of-the-art daycare endoscopic procedures.
                        </p>
                    </div>

                    {/* Right: Custom Swiper Navigation Buttons */}
                    <div className="md:w-1/3 flex justify-start md:justify-end gap-3 mt-4 md:mt-0">
                        {/* Unique class names used here to prevent conflict with other sliders */}
                        <button className="services-prev-btn w-12 h-12 rounded-full border border-slate-300 flex items-center justify-center text-[#0A192F] hover:bg-[#14B8A6] hover:text-white hover:border-[#14B8A6] transition-all duration-300 shadow-sm active:scale-95">
                            <FiArrowLeft size={20} />
                        </button>
                        <button className="services-next-btn w-12 h-12 rounded-full bg-[#0A192F] flex items-center justify-center text-white hover:bg-[#14B8A6] transition-all duration-300 shadow-md active:scale-95">
                            <FiArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* =========================================
                    SWIPER CAROUSEL (Looping & No Dots)
                ========================================= */}
                <div ref={sliderRef} className="w-full pb-8">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        loop={true} // Enabled infinite looping
                        navigation={{
                            prevEl: '.services-prev-btn',
                            nextEl: '.services-next-btn',
                        }}
                        autoplay={{
                            delay: 3500,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={20}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 24 },
                            1024: { slidesPerView: 3, spaceBetween: 24 },
                            1280: { slidesPerView: 4, spaceBetween: 24 },
                        }}
                        className="w-full h-full"
                    >
                        {servicesData.map((item, idx) => (
                            <SwiperSlide key={idx} className="h-auto">
                                <div className="group bg-[#F9F8F6] rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(10,25,47,0.08)] hover:-translate-y-1 hover:bg-white transition-all duration-500 flex flex-col h-full min-h-[300px] cursor-pointer">

                                    {/* Category Badge */}
                                    <div className="mb-8 flex justify-between items-start">
                                        <div className={`px-3 py-1.5 text-[9px] md:text-[10px] uppercase tracking-widest font-bold rounded-full ${getBadgeStyle(item.category)}`}>
                                            {item.category}
                                        </div>
                                    </div>

                                    {/* Icon Container */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 origin-left group-hover:scale-110 text-[#0A192F] bg-white shadow-sm border border-slate-100 group-hover:bg-[#14B8A6]/10 group-hover:border-transparent group-hover:text-[#14B8A6]`}>
                                        {item.icon}
                                    </div>

                                    {/* Card Title (Elegant serif) */}
                                    <h3 className="text-xl md:text-[22px] font-normal leading-snug tracking-tight text-[#0A192F] mt-auto group-hover:text-[#14B8A6] transition-colors duration-300">
                                        {item.title}
                                    </h3>

                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

            </div>
        </section>
    );
};

export default ServicesExpertise;