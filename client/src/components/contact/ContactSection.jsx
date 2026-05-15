import React, { useRef, useLayoutEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// React Icons matching the reference design
import { FiPhone, FiMail, FiClock, FiMapPin, FiSend } from 'react-icons/fi';

gsap.registerPlugin(ScrollTrigger);

const ContactSection = () => {
    const sectionRef = useRef(null);
    const leftColumnRef = useRef(null);
    const rightCardsRef = useRef([]);

    // Helper to store right-side card refs cleanly for GSAP staggering
    rightCardsRef.current = [];
    const addToCards = (el) => {
        if (el && !rightCardsRef.current.includes(el)) {
            rightCardsRef.current.push(el);
        }
    };

    const hospitals = [
        {
            name: "SLG Hospitals",
            subtitle: "Ajeenkya DY Patil Healthcare",
            location: "Survey No. 178, Bachupally, Hyderabad"
        },
        {
            name: "Udai Omni Hospital",
            subtitle: "Multi-Speciality Care",
            location: "Mehdipatnam, Hyderabad"
        },
        {
            name: "KIMS Sunshine Hospital",
            subtitle: "Visiting Consultant",
            location: "Gachibowli, Hyderabad"
        }
    ];

    useLayoutEffect(() => {
        let ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                }
            });

            // 1. Left column content (Heading, Text, Form) staggers in
            tl.fromTo(leftColumnRef.current.children,
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, stagger: 0.15, duration: 0.8, ease: "power3.out" }
            )
                // 2. Right column cards stagger in
                .fromTo(rightCardsRef.current,
                    { opacity: 0, x: 40 },
                    { opacity: 1, x: 0, stagger: 0.2, duration: 0.8, ease: "power2.out" },
                    "-=0.6"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={sectionRef} id="contact" className="w-full py-24 md:py-32 overflow-hidden mt-14">
            <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">

                {/* =========================================
                    LEFT COLUMN: HEADING & FORM
                ========================================= */}
                <div ref={leftColumnRef} className="lg:col-span-7 flex flex-col items-start text-left">

                    <h2 className="text-[2.5rem] sm:text-5xl md:text-[54px] block font-serif font-black italic tracking-tight leading-[1.1] mb-6">
                        Begin a conversation <br className="hidden sm:block" />
                        <span className="text-[#14B8A6]">about your spine health.</span>
                    </h2>

                    <p className="text-slate-600 text-base md:text-lg font-medium leading-relaxed max-w-lg mb-12">
                        Share a few details and our team will get back to you with the next steps usually within one working day.
                    </p>

                    {/* Contact Form Card */}
                    <div className="w-full bg-white rounded-[2rem] p-8 md:p-10 lg:p-12 shadow-[0_20px_40px_-15px_rgba(10,25,47,0.05)] border border-slate-100">
                        <form className="flex flex-col w-full" onSubmit={(e) => e.preventDefault()}>

                            {/* Input: Name */}
                            <div className="flex flex-col mb-8">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Your Name</label>
                                <input
                                    type="text"
                                    placeholder="Full name"
                                    className="w-full border-b border-slate-200 py-3  font-medium focus:outline-none focus:border-[#14B8A6] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-normal"
                                />
                            </div>

                            {/* Input: Email */}
                            <div className="flex flex-col mb-8">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">Email Address</label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full border-b border-slate-200 py-3  font-medium focus:outline-none focus:border-[#14B8A6] transition-colors bg-transparent placeholder:text-slate-300 placeholder:font-normal"
                                />
                            </div>

                            {/* Input: Message */}
                            <div className="flex flex-col mb-12">
                                <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-2">How Can We Help?</label>
                                <textarea
                                    placeholder="Tell us about your concern, symptoms or appointment preference..."
                                    rows="3"
                                    className="w-full border-b border-slate-200 py-3  font-medium focus:outline-none focus:border-[#14B8A6] transition-colors bg-transparent resize-none placeholder:text-slate-300 placeholder:font-normal"
                                ></textarea>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="group self-start inline-flex items-center gap-2 bg-[#0A192F] text-white px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg hover:bg-[#14B8A6] hover:shadow-[0_15px_30px_rgba(20,184,166,0.3)] transition-all duration-300"
                            >
                                Send message
                                <FiSend size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </button>

                        </form>
                    </div>

                </div>

                {/* =========================================
                    RIGHT COLUMN: CONTACT INFO & LOCATIONS
                ========================================= */}
                <div className="lg:col-span-5 flex flex-col gap-6 lg:mt-4">

                    {/* Direct Contact Card (Deep Navy) */}
                    <div
                        ref={addToCards}
                        className="w-full bg-[#0A192F] text-white rounded-[2rem] p-8 md:p-10 shadow-xl"
                    >
                        <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#14B8A6] mb-8">
                            Direct Contact
                        </div>

                        <div className="flex flex-col gap-6">
                            <div className="flex items-start gap-4 group">
                                <FiPhone className="text-slate-400 mt-1 group-hover:text-[#14B8A6] transition-colors" size={18} />
                                <div>
                                    <div className="text-[11px] uppercase tracking-widest text-slate-400 mb-1">Phone</div>
                                    <a href="tel:+919000000000" className="text-lg md:text-xl tracking-wide hover:text-[#14B8A6] transition-colors">+91 90000 00000</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <FiMail className="text-slate-400 mt-1 group-hover:text-[#14B8A6] transition-colors" size={18} />
                                <div>
                                    <div className="text-[11px] uppercase tracking-widest text-slate-400 mb-1">Email</div>
                                    <a href="mailto:care@drrajendrareddy.in" className="text-lg md:text-xl tracking-wide hover:text-[#14B8A6] transition-colors">care@drrajendrareddy.in</a>
                                </div>
                            </div>

                            <div className="flex items-start gap-4 group">
                                <FiClock className="text-slate-400 mt-1 group-hover:text-[#14B8A6] transition-colors" size={18} />
                                <div>
                                    <div className="text-[11px] uppercase tracking-widest text-slate-400 mb-1">Consultation hours</div>
                                    <div className="text-lg md:text-xl tracking-wide">Mon — Sat · 10:00 — 18:00</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Practising At Card (White with Header Image) */}
                    <div
                        ref={addToCards}
                        className="w-full bg-white rounded-[2rem] overflow-hidden shadow-sm border border-slate-100 flex flex-col"
                    >
                        {/* Hospital Header Image */}
                        <div className="w-full h-40 md:h-48 relative bg-slate-200 shrink-0">
                            <img
                                src="https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?q=80&w=800&auto=format&fit=crop"
                                alt="Modern Hospital Building"
                                className="w-full h-full object-cover"
                            />
                            {/* Subtle dark overlay for premium feel */}
                            <div className="absolute inset-0 bg-[#0A192F]/10 mix-blend-multiply"></div>
                        </div>

                        <div className="p-8 md:p-10 flex flex-col">
                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 mb-6">
                                Practising At
                            </div>

                            <div className="flex flex-col">
                                {hospitals.map((hospital, idx) => (
                                    <div key={idx} className={`py-5 flex items-start gap-4 ${idx !== hospitals.length - 1 ? 'border-b border-slate-100' : 'pb-0'}`}>
                                        <FiMapPin className="text-[#14B8A6] mt-1 shrink-0" size={18} />
                                        <div className="flex flex-col">
                                            <h4 className="font-serif italic text-lg md:text-xl  mb-1">{hospital.name}</h4>
                                            <div className="text-[10px] uppercase tracking-widest text-slate-400 font-bold mb-1">{hospital.subtitle}</div>
                                            <p className="text-sm text-slate-500">{hospital.location}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default ContactSection;