import React, { useState, useRef, useLayoutEffect, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'; // IMPORT REACT ROUTER
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import {
    FiMenu, FiX, FiPhone, FiMapPin,
    FiCalendar, FiActivity, FiArrowRight
} from 'react-icons/fi';
import { FaFacebookF, FaInstagram, FaLinkedinIn } from 'react-icons/fa';

gsap.registerPlugin(ScrollTrigger);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation(); // Gets the current route

    // DOM Refs
    const wrapperRef = useRef(null);
    const navRef = useRef(null);
    const overlayRef = useRef(null);
    const curtainRef = useRef(null);
    const menuLinksRef = useRef([]);
    const tl = useRef(null);

    const isOpenRef = useRef(isOpen);
    useEffect(() => {
        isOpenRef.current = isOpen;
    }, [isOpen]);

    // TRUE ROUTING PATHS
    const navLinks = [
        { num: '01', name: 'Home', path: '/' },
        { num: '02', name: 'About Doctor', path: '/about' },
        { num: '03', name: 'Spine Treatments', path: '/services' },
        { num: '04', name: 'Contact Us', path: '/contact' },
    ];

    const socials = [
        { icon: <FaInstagram size={20} />, url: '#' },
        { icon: <FaLinkedinIn size={20} />, url: '#' },
        { icon: <FaFacebookF size={20} />, url: '#' },
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {

            const showNavShadow = gsap.to(navRef.current, {
                y: 8,
                boxShadow: "0 25px 50px -12px rgba(10, 25, 47, 0.15)",
                backgroundColor: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(16px)",
                paddingTop: "10px",
                paddingBottom: "10px",
                paused: true,
                duration: 0.4,
                ease: "power2.out"
            });

            ScrollTrigger.create({
                start: 0,
                end: "max",
                onUpdate: (self) => {
                    const currentScroll = self.scroll();
                    const isScrollingDown = self.direction === 1;
                    const isScrollingUp = self.direction === -1;

                    if (currentScroll > 80) showNavShadow.play();
                    else showNavShadow.reverse();

                    if (currentScroll <= 80 || isOpenRef.current) {
                        gsap.to(wrapperRef.current, { yPercent: 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
                    } else if (isScrollingDown) {
                        gsap.to(wrapperRef.current, { yPercent: -150, duration: 0.4, ease: "power3.inOut", overwrite: "auto" });
                    } else if (isScrollingUp) {
                        gsap.to(wrapperRef.current, { yPercent: 0, duration: 0.4, ease: "power3.out", overwrite: "auto" });
                    }
                },
            });

            gsap.set([curtainRef.current, overlayRef.current], {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                display: "none"
            });
            gsap.set(menuLinksRef.current, { y: 60, opacity: 0 });

            tl.current = gsap.timeline({ paused: true })
                .to(curtainRef.current, { display: "block", clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.7, ease: "power4.inOut" })
                .to(overlayRef.current, { display: "block", clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", duration: 0.7, ease: "power4.inOut" }, "-=0.5")
                .to(menuLinksRef.current, { y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power3.out" }, "-=0.3")
                .fromTo(".menu-fade-in", { opacity: 0, y: 20 }, { opacity: 1, y: 0, stagger: 0.1, duration: 0.6, ease: "power3.out" }, "-=0.5");
        });

        return () => ctx.revert();
    }, []);

    useEffect(() => {
        if (!tl.current) return;
        if (isOpen) {
            document.body.style.overflow = "hidden";
            tl.current.play();
        } else {
            document.body.style.overflow = "auto";
            tl.current.reverse();
        }
        return () => { document.body.style.overflow = "auto"; };
    }, [isOpen]);

    return (
        <>
            <div ref={wrapperRef} className="fixed top-0 left-0 w-full z-50 px-4 md:px-8 pt-4 md:pt-6 pointer-events-none">
                <nav ref={navRef} className="pointer-events-auto max-w-7xl mx-auto bg-white/80 backdrop-blur-2xl border border-slate-200/60 rounded-full py-3.5 px-5 md:px-8 transition-colors duration-500 flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.04)]">

                    <div className="flex-shrink-0 cursor-pointer z-[60] relative flex items-center gap-3">
                        {/* Make the logo route to home */}
                        <Link to="/" onClick={() => setIsOpen(false)} className={`text-xl md:text-2xl font-black tracking-tight transition-colors duration-500 ${isOpen ? 'text-white' : ''}`}>
                            Dr. Rajendra<span className="text-[#14B8A6]"> Reddy</span>
                        </Link>
                    </div>

                    <div className="hidden lg:flex items-center space-x-10">
                        {navLinks.map((link, index) => {
                            // Check if the current route matches the link to highlight it
                            const isActive = location.pathname === link.path;

                            return (
                                <Link
                                    key={index}
                                    to={link.path}
                                    className={`text-sm font-bold transition-colors duration-300 tracking-wide ${isActive ? 'text-[#14B8A6]' : 'text-[#334155] hover:text-[#14B8A6]'}`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </div>

                    <div className="flex items-center space-x-3 md:space-x-5 z-[60]">
                        <Link to="/contact" className="hidden md:flex items-center gap-2 justify-center bg-[#0A192F] text-white px-6 py-2.5 rounded-full text-sm font-semibold shadow-xl shadow-[#0A192F]/20 hover:bg-[#14B8A6] hover:shadow-teal-500/30 hover:-translate-y-0.5 transition-all duration-300 group">
                            <FiCalendar size={16} className="group-hover:scale-110 transition-transform" />
                            <span>Book Consultation</span>
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className={`p-2.5 rounded-full transition-all duration-500 flex items-center justify-center shadow-sm ${isOpen ? "bg-white/10 text-white hover:bg-white/20 border border-white/20" : "bg-slate-100  hover:bg-slate-200 border border-slate-200"}`}
                        >
                            {isOpen ? <FiX size={22} strokeWidth={2.5} /> : <FiMenu size={22} strokeWidth={2.5} />}
                        </button>
                    </div>
                </nav>
            </div>

            {/* Mobile Menu Overlays */}
            <div ref={curtainRef} className="fixed inset-0 z-[35] bg-[#14B8A6]"></div>
            <div ref={overlayRef} className="fixed inset-0 z-[40] bg-[#0A192F] overflow-y-auto overflow-x-hidden">
                <div className="max-w-7xl mx-auto w-full px-6 md:px-12 pt-32 pb-20 flex flex-col lg:flex-row justify-between items-start min-h-screen relative z-10">

                    <div className="flex flex-col w-full lg:w-3/5 mb-16 lg:mb-0 mt-4 md:mt-8">

                        {/* Mobile Links using React Router Link */}
                        <div className="flex flex-col space-y-2 md:space-y-4 w-full">
                            {navLinks.map((link, index) => (
                                <div key={index} className="overflow-hidden">
                                    <Link
                                        to={link.path}
                                        onClick={() => setIsOpen(false)}
                                        ref={el => menuLinksRef.current[index] = el}
                                        className="group flex items-baseline w-fit py-2"
                                    >
                                        <span className="text-[#14B8A6] font-mono text-sm md:text-xl mr-6 md:mr-10 font-light opacity-60 group-hover:opacity-100 transition-opacity duration-300">
                                            {link.num}
                                        </span>
                                        <div className="relative text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-white/80 group-hover:text-white transition-all duration-500 tracking-tighter">
                                            {link.name}
                                            <span className="absolute left-0 bottom-1 md:bottom-2 w-0 h-1.5 md:h-2 bg-[#14B8A6] transition-all duration-500 ease-out group-hover:w-full"></span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>

                        <div className="menu-fade-in pt-12 block md:hidden">
                            <Link to="/contact" onClick={() => setIsOpen(false)} className="flex items-center justify-center gap-2 bg-[#14B8A6] text-white px-8 py-4 rounded-full text-lg font-bold shadow-lg shadow-teal-500/30 active:scale-95 transition-all w-full">
                                <FiCalendar size={20} />
                                Book Consultation
                            </Link>
                        </div>
                    </div>

                    <div className="w-full lg:w-1/3 flex flex-col space-y-12 lg:mt-24">
                        <div className="menu-fade-in space-y-6">
                            <h3 className="text-[#14B8A6] text-xs uppercase tracking-[0.2em] font-bold flex items-center gap-2">
                                <FiPhone size={14} /> Contact Clinic
                            </h3>
                            <div className="space-y-6 text-white/90">
                                <a href="tel:+910000000000" className="block group w-fit">
                                    <p className="text-sm text-white/50 mb-1 font-mono uppercase tracking-wider">Appointments</p>
                                    <p className="text-2xl md:text-3xl font-light group-hover:text-[#14B8A6] transition-colors">+91 00000 00000</p>
                                </a>
                                <a href="mailto:info@drrajendrareddy.com" className="block group w-fit">
                                    <p className="text-sm text-white/50 mb-1 font-mono uppercase tracking-wider">Email</p>
                                    <p className="text-lg md:text-xl font-light group-hover:text-[#14B8A6] transition-colors">info@drrajendrareddy.com</p>
                                </a>
                            </div>
                        </div>

                        <div className="menu-fade-in pt-8 border-t border-white/10 flex gap-4">
                            {socials.map((social, idx) => (
                                <a key={idx} href={social.url} className="p-3.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:text-white hover:bg-[#14B8A6] hover:border-[#14B8A6] transition-all">
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Navbar;