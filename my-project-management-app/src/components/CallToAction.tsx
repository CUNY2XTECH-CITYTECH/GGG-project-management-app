'use client';
import Image from 'next/image';
import helixImage from '../assets/images/helix2.png';
import emojiStarImage from '../assets/images/emojistar.png';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useEffect, useRef } from 'react';

export const CallToAction = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end end'],
  });

  useEffect(() => {
    scrollYProgress.on('change', (value) => console.log('value', value));
  }, []);

  const translateY = useTransform(scrollYProgress, [0, 1], [-40, 40]);
  return (
    <div
      className="bg-black text-white py-[72px] sm:py-24 text-center"
      ref={containerRef}
    >
      <div className="container max-w-xl relative">
        <motion.div style={{ translateY }}>
          <Image
            src={helixImage}
            alt=""
            className="absolute top-6 left-[calc(100%+36px)] hidden sm:block"
          />
        </motion.div>
        <motion.div style={{ translateY }}>
          <Image
            src={emojiStarImage}
            alt=""
            className="absolute -top-[120px] right-[calc(100%+24px)]"
          />
        </motion.div>
        <h2 className="font-bold text-5xl tracking-tighter sm:text-6xl">
          Stay Ahead of Your Projects
        </h2>
        <p className="text-xl text-white/70 mt-5">
          Streamline your workflow, track progress, and collaborate seamlessly.
          Get real-time insights and stay organized—so you can focus on
          delivering results.
        </p>
        <form className="mt-10 flex flex-col gap-2.5 max-w-sm mx-auto sm:flex-row">
          <input
            type="email"
            placeholder="Enter your email"
            className="h-12 bg-white/20 rounded-lg px-5 font-medium placeholder:text-[#9CA3AF] sm:flex-1"
          />
          <button className="bg-white text-black h-12 rounded-lg px-5">
            Get Started
          </button>
        </form>
      </div>
    </div>
  );
};
