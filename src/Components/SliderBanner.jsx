/* eslint-disable no-unused-vars */
import { useContext } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link } from "react-router-dom";
import { AuthContext } from "../Provider/AuthContext";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import sliderBanner1 from "../assets/mainSlider-1.jpeg";
import sliderBanner2 from "../assets/mainSlider-2.jpg";
import sliderBanner3 from "../assets/mainSlider-3.jpg";
import sliderBanner4 from "../assets/mainSlider-4.jpg";
import sliderBanner5 from "../assets/mainSlider-5.jpg";
import sliderBanner6 from "../assets/mainSlider-7.jpg";

const SliderBanner = () => {
    const { user } = useContext(AuthContext);

    const slides = [
        {
            img: sliderBanner1,
            title: ["Where Creativity Meets Canvas 🎨", "Unleash Your Imagination", "Start Creating Today"],
            subtitle: "Explore breathtaking artworks crafted by emerging creators.",
        },
        {
            img: sliderBanner2,
            title: ["Discover the Artists Behind the Magic ✨", "Meet the Creator", "Art That Speaks"],
            subtitle: "Celebrate passion and creativity in every masterpiece.",
        },
        {
            img: sliderBanner3,
            title: ["Dream. Create. Inspire. 🌈", "A World of Imagination", "Limitless Expression"],
            subtitle: "Join a community where imagination becomes timeless art.",
        },
        {
            img: sliderBanner4,
            title: ["Colors That Speak Louder Than Words 🖌️", "Vibrant. Bold. Emotional.", "Every Color Has a Story"],
            subtitle: "Experience emotions painted through vivid hues and bold strokes.",
        },
        {
            img: sliderBanner5,
            title: ["Imagine Without Limits 🪄", "Think. Design. Create.", "Art Beyond Boundaries"],
            subtitle: "Step into a world where creativity flows beyond boundaries.",
        },
        {
            img: sliderBanner6,
            title: ["Every Brushstroke Tells a Story 💫", "Feel the Emotion", "Stories in Every Stroke"],
            subtitle: "Uncover narratives hidden in the details of each artwork.",
        },
    ];

    return (
        <div className="px-4 md:px-10">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 8000, disableOnInteraction: false }}
                loop
                navigation
                pagination={{ clickable: true }}
                speed={1100}
                className="relative rounded-2xl shadow-2xl overflow-hidden"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        {/* 60–70% of viewport height */}
                        <div
                            className="h-[65vh] min-h-[420px] max-h-[640px] bg-cover bg-center flex items-center justify-center relative"
                            style={{ backgroundImage: `url(${slide.img})` }}
                        >
                            <div className="absolute inset-0 bg-linear-to-b from-black/35 to-black/75" />

                            <motion.div
                                initial={{ opacity: 0, y: 35 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.9, ease: "easeOut" }}
                                className="relative z-10 text-center text-white p-6 max-w-4xl"
                            >
                                <motion.h1
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.2, duration: 0.9 }}
                                    className="text-3xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF]"
                                >
                                    <Typewriter
                                        words={slide.title}
                                        loop
                                        cursor
                                        cursorStyle="|"
                                        typeSpeed={70}
                                        deleteSpeed={45}
                                        delaySpeed={1200}
                                    />
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.35, duration: 0.9 }}
                                    className="text-base md:text-xl text-gray-200"
                                >
                                    {slide.subtitle}
                                </motion.p>

                                {/* CTA buttons */}
                                <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
                                    <Link
                                        to="/explore"
                                        className="px-6 py-3 rounded-xl text-white font-semibold shadow-lg
                      bg-linear-to-r from-[#6C63FF] to-[#FF6584] hover:opacity-95 transition"
                                    >
                                        Explore Artworks
                                    </Link>

                                    {user ? (
                                        <Link
                                            to="/dashboard"
                                            className="px-6 py-3 rounded-xl font-semibold border border-white/40
                        bg-white/10 hover:bg-white/15 backdrop-blur transition"
                                        >
                                            Go to Dashboard
                                        </Link>
                                    ) : (
                                        <Link
                                            to="/register"
                                            className="px-6 py-3 rounded-xl font-semibold border border-white/40
                        bg-white/10 hover:bg-white/15 backdrop-blur transition"
                                        >
                                            Join as an Artist
                                        </Link>
                                    )}
                                </div>
                            </motion.div>

                            {/* Scroll hint */}
                            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10">
                                <div className="flex flex-col items-center gap-1 text-white/80">
                                    <span className="text-xs">Scroll</span>
                                    <span className="animate-bounce text-xl">⌄</span>
                                </div>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderBanner;
