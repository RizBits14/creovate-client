/* eslint-disable no-unused-vars */
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { motion } from "framer-motion";
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
    const slides = [
        {
            img: sliderBanner1,
            title: "Where Creativity Meets Canvas 🎨",
            subtitle: "Explore breathtaking art pieces crafted by emerging artists.",
        },
        {
            img: sliderBanner2,
            title: "Discover the Artists Behind the Magic ✨",
            subtitle: "Celebrate creativity and passion in every masterpiece.",
        },
        {
            img: sliderBanner3,
            title: "Dream. Create. Inspire. 🌈",
            subtitle: "Join a community where artists turn imagination into timeless art."
        },
        {
            img: sliderBanner4,
            title: "Colors That Speak Louder Than Words 🖌️",
            subtitle: "Experience emotions painted through vivid hues and bold strokes."
        },
        {
            img: sliderBanner5,
            title: "Imagine Without Limits 🪄",
            subtitle: "Step into a world where creativity flows beyond boundaries."
        },
        {
            img: sliderBanner6,
            title: "Every Brushstroke Tells a Story 💫",
            subtitle: "Uncover the narratives hidden in the details of each artwork."
        },
    ];

    return (
        <div className="mt-6 md:mt-10 px-4 md:px-10">
            <Swiper
                modules={[Autoplay, Navigation, Pagination]}
                autoplay={{ delay: 4000, disableOnInteraction: false }}
                loop
                navigation
                pagination={{ clickable: true }}
                speed={1200}
                className="relative rounded-2xl shadow-2xl overflow-hidden"
            >
                {slides.map((slide, index) => (
                    <SwiperSlide key={index}>
                        <div className="h-[400px] md:h-[520px] bg-cover bg-center flex items-center justify-center roun relative" style={{ backgroundImage: `url(${slide.img})` }}>
                            <div className="absolute inset-0 bg-linear-to-b from-black/40 to-black/70"></div>

                            <motion.div
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 1, ease: "easeOut" }}
                                className="relative z-10 text-center text-white p-6 max-w-3xl"
                            >
                                <motion.h1
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.2, duration: 1 }}
                                    className="text-3xl md:text-5xl font-extrabold tracking-wide mb-4 bg-clip-text text-transparent bg-linear-to-r from-[#6C63FF] via-[#FF6584] to-[#6C63FF]"
                                >
                                    {slide.title}
                                </motion.h1>

                                <motion.p
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 1 }}
                                    className="text-lg md:text-xl text-gray-200 font-light"
                                >
                                    {slide.subtitle}
                                </motion.p>
                            </motion.div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
};

export default SliderBanner;
