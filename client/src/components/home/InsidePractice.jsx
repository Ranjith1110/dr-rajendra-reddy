import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { FiX } from 'react-icons/fi'; // Imported for the close button

gsap.registerPlugin(ScrollTrigger);

const InsidePractice = () => {
    const sectionRef = useRef(null);
    const headerRef = useRef(null);
    const imageRefs = useRef([]);

    // State to handle the full-screen modal
    const [selectedImage, setSelectedImage] = useState(null);

    // Array of your images for easy management
    const practiceImages = [
        "/compassion/6.jpeg",
        "/compassion/1.jpeg",
        "/compassion/5.jpeg",
        "/compassion/3.jpeg",
        "/compassion/8.jpeg",
        "/compassion/9.jpeg",
    ];

    // Helper to store image refs without duplication for GSAP staggering
    imageRefs.current = [];
    const addToImages = (el) => {
        if (el && !imageRefs.current.includes(el)) {
            imageRefs.current.push(el);
        }
    };

    // Lock background scrolling when modal is open for a premium experience
    useEffect(() => {
        if (selectedImage) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        // Cleanup function
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [selectedImage]);

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
                // 2. Stagger Reveal the Grid Images
                .fromTo(imageRefs.current,
                    { opacity: 0, y: 40, scale: 0.95 },
                    { opacity: 1, y: 0, scale: 1, stagger: 0.1, duration: 0.8, ease: "back.out(1.2)" },
                    "-=0.4"
                );

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <>
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
                        PERFECTLY SYMMETRICAL GRID
                        Forces all images to conform to an exact 4:3 
                        aspect ratio so the layout is totally flush.
                    ========================================= */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
                        {practiceImages.map((src, index) => (
                            <div
                                key={index}
                                ref={addToImages}
                                onClick={() => setSelectedImage(src)} // Open modal on click
                                className="relative w-full aspect-[4/3] rounded-[1.5rem] md:rounded-[2rem] overflow-hidden group shadow-sm bg-slate-100 cursor-pointer"
                            >
                                <img
                                    src={src}
                                    alt={`Practice Facility ${index + 1}`}
                                    // h-full and object-cover guarantee the image fills the 4:3 container perfectly
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                {/* Hover overlay to indicate it's clickable */}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-[#0A192F]/10 transition-colors duration-300 pointer-events-none"></div>
                            </div>
                        ))}
                    </div>

                </div>
            </section>

            {/* =========================================
                FULL SCREEN IMAGE MODAL
            ========================================= */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm transition-opacity duration-300"
                    onClick={() => setSelectedImage(null)} // Close when clicking the backdrop
                >
                    {/* Close Button */}
                    <button
                        onClick={() => setSelectedImage(null)}
                        className="absolute top-6 right-6 md:top-8 md:right-8 text-white/70 hover:text-white bg-black/50 hover:bg-[#14B8A6] rounded-full p-2 transition-all duration-300 z-[110]"
                        aria-label="Close modal"
                    >
                        <FiX size={28} />
                    </button>

                    {/* The Full Screen Image */}
                    <img
                        src={selectedImage}
                        alt="Full screen view"
                        className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl scale-100 animate-[fadeIn_0.3s_ease-out]"
                        onClick={(e) => e.stopPropagation()} // Prevent clicking the image itself from closing the modal
                    />
                </div>
            )}
        </>
    );
};

export default InsidePractice;