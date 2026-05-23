import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Swiper imports
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

// React Icons
import { FiActivity, FiShield, FiStar, FiArrowLeft, FiArrowRight } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ConditionsWeTreat = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const sliderRef = useRef(null);

    // Formatted Data based on your exact list
    const medicalData = [
        // --- CONDITIONS TREATED ---
        { title: "Slip Disc / Disc Herniation", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Sciatica", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Spinal Canal Stenosis", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Cervical Disc Problems", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Cervical Radiculopathy", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Lumbar Radiculopathy", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Degenerative Spine Disorders", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Failed Back Surgery Syndrome", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Spondylolisthesis", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Spine Trauma & Fractures", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Spine Infections", category: "Conditions Treated", icon: <FiActivity size={24} /> },
        { title: "Osteoporotic Spine Fractures", category: "Conditions Treated", icon: <FiActivity size={24} /> },

        // --- PAIN & REHABILITATION ---
        { title: "Image Guided Spine Injections", category: "Pain & Rehab", icon: <FiShield size={24} /> },
        { title: "Nerve Root Blocks", category: "Pain & Rehab", icon: <FiShield size={24} /> },
        { title: "Epidural Steroid Injections", category: "Pain & Rehab", icon: <FiShield size={24} /> },
        { title: "Radiofrequency Ablation", category: "Pain & Rehab", icon: <FiShield size={24} /> },
        { title: "Post-Surgical Rehab Guidance", category: "Pain & Rehab", icon: <FiShield size={24} /> },

        // --- ADVANCED / PREMIUM SERVICES ---
        { title: "Motion Preservation Surgery", category: "Premium Service", icon: <FiStar size={24} /> },
        { title: "Rapid Recovery Spine Surgery", category: "Premium Service", icon: <FiStar size={24} /> },
        { title: "Ultra-Minimally Invasive Surgery", category: "Premium Service", icon: <FiStar size={24} /> },
        { title: "Precision Endoscopic Care", category: "Premium Service", icon: <FiStar size={24} /> },
        { title: "Personalized Treatment Plans", category: "Premium Service", icon: <FiStar size={24} /> },
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

    return (
        <section ref={sectionRef} className="w-full bg-[#F7F5F0] py-24 md:py-32 overflow-hidden">
            <div className="max-w-7xl mx-auto px-6 md:px-12">

                {/* =========================================
                    HEADER & CUSTOM NAVIGATION
                ========================================= */}
                <div ref={headerRef} className="flex flex-col md:flex-row md:items-end justify-between gap-6 md:gap-16 mb-12">

                    {/* Left: Main Title */}
                    <div className="md:w-2/3">
                        <h2 className="text-4xl sm:text-5xl md:text-6xl block font-serif font-black italic tracking-tight mb-6 leading-tight">
                            Comprehensive
                            <span className="text-[#14B8A6]"> Care.</span>
                        </h2>
                        <p className="md:text-lg font-semibold max-w-2xl text-slate-700">
                            From everyday back pain and complex spinal injuries to advanced rehabilitation and motion-preservation surgeries.
                        </p>
                    </div>

                    {/* Right: Custom Swiper Navigation Buttons */}
                    <div className="md:w-1/3 flex justify-start md:justify-end gap-3 mt-4 md:mt-0">
                        <button className="swiper-prev-btn w-12 h-12 rounded-full border border-[#0A192F]/20 flex items-center justify-center text-[#0A192F] hover:bg-[#14B8A6] hover:text-white hover:border-[#14B8A6] transition-all duration-300 shadow-sm active:scale-95">
                            <FiArrowLeft size={20} />
                        </button>
                        <button className="swiper-next-btn w-12 h-12 rounded-full bg-[#0A192F] flex items-center justify-center text-white hover:bg-[#14B8A6] transition-all duration-300 shadow-md active:scale-95">
                            <FiArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* =========================================
                    SWIPER CAROUSEL
                ========================================= */}
                <div ref={sliderRef} className="w-full pb-12">
                    <Swiper
                        modules={[Navigation, Autoplay]}
                        navigation={{
                            prevEl: '.swiper-prev-btn',
                            nextEl: '.swiper-next-btn',
                        }}
                        autoplay={{
                            delay: 4000,
                            disableOnInteraction: false,
                        }}
                        spaceBetween={24}
                        slidesPerView={1}
                        breakpoints={{
                            640: { slidesPerView: 2 },
                            1024: { slidesPerView: 3 },
                            1280: { slidesPerView: 4 },
                        }}
                        className="w-full h-full custom-swiper"
                    >
                        {medicalData.map((item, idx) => (
                            <SwiperSlide key={idx} className="h-auto">
                                <div className="group bg-white rounded-3xl p-8 shadow-sm border border-slate-100 hover:shadow-[0_20px_40px_-15px_rgba(10,25,47,0.08)] hover:-translate-y-1 transition-all duration-500 flex flex-col h-full min-h-[280px]">

                                    {/* Category Badge */}
                                    <div className="mb-6 flex justify-between items-start">
                                        <div className={`px-3 py-1 text-[10px] uppercase tracking-widest font-bold rounded-full
                                            ${item.category === 'Premium Service' ? 'bg-[#0A192F] text-white' :
                                                item.category === 'Pain & Rehab' ? 'bg-orange-100 text-orange-700' :
                                                    'bg-[#14B8A6]/10 text-[#14B8A6]'}`
                                        }>
                                            {item.category}
                                        </div>
                                    </div>

                                    {/* Icon Container */}
                                    <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-6 transition-transform duration-300 origin-left group-hover:scale-110 text-[#0A192F] bg-white shadow-sm border border-slate-100 group-hover:bg-[#14B8A6]/10 group-hover:border-transparent group-hover:text-[#14B8A6]`}>
                                        {item.icon}
                                    </div>

                                    {/* Card Title */}
                                    <h3 className="text-xl md:text-2xl font-bold leading-snug tracking-tight text-[#0A192F] mt-auto group-hover:text-[#14B8A6] transition-colors duration-300">
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

export default ConditionsWeTreat;