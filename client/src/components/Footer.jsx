import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons
import {
    FiMapPin, FiPhone, FiMail, FiArrowRight,
    FiClock, FiCalendar, FiChevronUp
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn, FaYoutube } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Footer = () => {
    const footerRef = useRef(null);

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: footerRef.current,
                    start: "top 85%",
                }
            });

            // 1. Clean fade up for the CTA banner
            tl.fromTo(".footer-cta",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }
            )
                // 2. Simple stagger fade for the footer columns
                .fromTo(".footer-col",
                    { opacity: 0, y: 20 },
                    { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power2.out" },
                    "-=0.4"
                )
                // 3. Fade in bottom bar
                .fromTo(".footer-bottom",
                    { opacity: 0 },
                    { opacity: 1, duration: 0.6, ease: "power2.out" },
                    "-=0.2"
                );

        }, footerRef);

        return () => ctx.revert();
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const quickLinks = [
        { name: "Home", href: "#" },
        { name: "About Dr. Reddy", href: "#about" },
        { name: "Spine Treatments", href: "#services" },
        { name: "Global Expertise", href: "#events" },
        { name: "Hospital Affiliations", href: "#experience" }
    ];

    const hospitals = [
        "SLG Hospitals (Ajeenkya DY Patil)",
        "Udai Omni Hospital (Orthopaedic Centre)",
        "KIMS Sunshine Hospital (Gachibowli)"
    ];

    const socials = [
        { icon: <FaLinkedinIn size={18} />, href: "#" },
        { icon: <FaInstagram size={18} />, href: "#" },
        { icon: <FaFacebookF size={18} />, href: "#" },
        { icon: <FaYoutube size={18} />, href: "#" }
    ];

    return (
        <footer ref={footerRef} className="relative pt-24 pb-6 mt-20 overflow-hidden">

            {/* =========================================
                BACKGROUND IMAGE WITH FADE OPACITY
            ========================================= */}
            <div className="absolute inset-0 z-0">
                <img
                    src="https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?q=80&w=800&auto=format&fit=crop"
                    alt="Clinic Background"
                    className="w-full h-full object-cover opacity-15 mix-blend-luminosity"
                />
                {/* Gradient overlay to seamlessly blend the image into the solid dark blue */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/75 to-[#0A192F]/60"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 md:px-12 relative z-10">

                {/* =========================================
                    CLEAN CTA BANNER
                ========================================= */}
                <div className="footer-cta bg-[#14B8A6] rounded-2xl p-8 md:p-10 mb-16 md:mb-24 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
                    {/* Subtle inner pattern for the CTA */}
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>

                    <div className="text-center md:text-left relative z-10">
                        <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 tracking-tight">
                            Ready to start your recovery journey?
                        </h3>
                        <p className="text-teal-50 font-medium text-sm md:text-base">
                            Schedule a comprehensive spine evaluation today.
                        </p>
                    </div>
                    <div className="shrink-0 w-full md:w-auto relative z-10">
                        <a href="#book" className="flex items-center justify-center gap-2 bg-white text-[#0A192F] px-8 py-3.5 rounded-full font-bold hover:bg-slate-50 hover:shadow-lg transition-all duration-300 w-full">
                            <FiCalendar size={18} />
                            Book Consultation
                        </a>
                    </div>
                </div>

                {/* =========================================
                    MAIN FOOTER GRID
                ========================================= */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 mb-16">

                    {/* Brand & Bio (Spans 4 cols) */}
                    <div className="footer-col lg:col-span-4 lg:pr-8">
                        <div className="text-white font-black text-2xl tracking-tight mb-5">
                            Dr. Rajendra <span className="text-[#14B8A6]">Reddy</span>
                        </div>
                        <p className="text-slate-400 font-medium leading-relaxed mb-6 text-sm">
                            Pioneering minimally invasive solutions and advanced endoscopic spine surgeries to deliver exceptional, patient-centric care in Hyderabad.
                        </p>

                        {/* Social Icons */}
                        <div className="flex items-center gap-3">
                            {socials.map((social, idx) => (
                                <a
                                    key={idx}
                                    href={social.href}
                                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-slate-300 hover:bg-[#14B8A6] hover:border-[#14B8A6] hover:text-white transition-all duration-300"
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links (Spans 2 cols) */}
                    <div className="footer-col lg:col-span-2">
                        <h4 className="text-white font-bold text-base mb-5 tracking-wide">Explore</h4>
                        <ul className="flex flex-col gap-3">
                            {quickLinks.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="text-slate-400 hover:text-[#14B8A6] font-medium text-sm transition-colors flex items-center gap-2 group w-fit">
                                        <span>{link.name}</span>
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Affiliated Hospitals (Spans 3 cols) */}
                    <div className="footer-col lg:col-span-3">
                        <h4 className="text-white font-bold text-base mb-5 tracking-wide">Affiliations</h4>
                        <ul className="flex flex-col gap-4">
                            {hospitals.map((hospital, idx) => (
                                <li key={idx} className="flex items-start gap-3">
                                    <FiMapPin className="text-[#14B8A6] shrink-0 mt-1" size={16} />
                                    <span className="text-slate-400 text-sm font-medium leading-relaxed">
                                        {hospital}
                                    </span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info (Spans 3 cols) */}
                    <div className="footer-col lg:col-span-3">
                        <h4 className="text-white font-bold text-base mb-5 tracking-wide">Contact Clinic</h4>
                        <ul className="flex flex-col gap-4 text-sm">
                            <li className="flex items-start gap-3">
                                <FiPhone className="text-[#14B8A6] shrink-0 mt-1" size={16} />
                                <div className="flex flex-col">
                                    <span className="text-slate-400 font-medium mb-1">24/7 Helpline</span>
                                    <a href="tel:+910000000000" className="text-white font-semibold hover:text-[#14B8A6] transition-colors">
                                        +91 00000 00000
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiMail className="text-[#14B8A6] shrink-0 mt-1" size={16} />
                                <div className="flex flex-col">
                                    <span className="text-slate-400 font-medium mb-1">Email Support</span>
                                    <a href="mailto:info@drrajendrareddy.com" className="text-white font-semibold hover:text-[#14B8A6] transition-colors">
                                        info@drrajendrareddy.com
                                    </a>
                                </div>
                            </li>
                            <li className="flex items-start gap-3">
                                <FiClock className="text-[#14B8A6] shrink-0 mt-1" size={16} />
                                <div className="flex flex-col">
                                    <span className="text-slate-400 font-medium mb-1">Working Hours</span>
                                    <span className="text-white font-semibold">Mon - Sat: 9:00 AM - 6:00 PM</span>
                                </div>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* =========================================
                    BOTTOM BAR
                ========================================= */}
                <div className="footer-bottom border-t border-white/10 pt-6 mt-8 flex flex-col md:flex-row items-center justify-between gap-4">
                    <p className="text-slate-500 text-xs font-medium text-center md:text-left">
                        &copy; {new Date().getFullYear()} Dr. Rajendra Reddy. All Rights Reserved.
                    </p>

                    <div className="text-slate-500 text-xs font-medium flex items-center gap-2">
                        Developed By
                        <a href="#" className="text-white font-bold hover:text-[#14B8A6] transition-colors">
                            Vigilixhub
                        </a>
                    </div>
                </div>

            </div>

            {/* Floating Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="absolute bottom-8 right-6 md:right-12 w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center text-white hover:bg-[#14B8A6] hover:border-[#14B8A6] transition-colors duration-300 z-20"
                aria-label="Scroll to top"
            >
                <FiChevronUp size={20} />
            </button>
        </footer>
    );
};

export default Footer;