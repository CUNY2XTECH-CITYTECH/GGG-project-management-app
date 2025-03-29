'use client';
import Image from 'next/image';
import ArrowWIcon from '../assets/icons/arrow-w.svg';
import cursorImage from '../assets/images/cursor.png';
import messageImage from '../assets/images/message.png';
import { motion } from 'framer-motion';

export const Hero = () => {
  return (
    <div className="bg-gradient-to-b from-black via-[#200D42] via-34% to-[#A46EDB] text-white py-[72px] sm:py-24 relative overflow-clip">
      <div className="absolute h-[375px] w-[750px] sm:w-[1536px] sm:h-[768px] lg:w-[2400px] lg:h-[1200px] rounded-[100%] bg-black left-1/2 -translate-x-1/2 border border-[#B48CDE] bg-[radial-gradient(closest-side,#000_82%,#9560EB)] top-[calc(100%-96px)] sm:top-[calc(100%-120px)]"></div>
      <div className="container relative">
        <div className="flex items-center justify-center">
          <a
            href="#"
            className="inline-flex gap-3 border py-1 px-2 rounded-lg border-white/30"
          >
            <span className="bg-[linear-gradient(to_right,#F87AFF,#FB93D0,#FFDD99,#C3F0B2,#2FD8FE)] text-transparent bg-clip-text">
              Version 1.0 is Here
            </span>
            <span className="inline-flex items-center gap-1">
              <span>Check out the demo</span>
              <ArrowWIcon />
            </span>
          </a>
        </div>
        <div className="flex justify-center mt-8">
          <div className="inline-flex relative">
            <h1 className="text-7xl sm:text-9xl font-bold tracking-tighter text-center inline-flex">
              Stay Focused,
              <br /> Achieve More
            </h1>
            <motion.div
              className="absolute right-[751px] top-[108px] hidden sm:inline"
              drag
              dragSnapToOrigin
            >
              <Image
                src={cursorImage}
                height={200}
                width={200}
                alt=""
                className="max-w-none"
                draggable={false}
              />
            </motion.div>
            <motion.div
              className="absolute top-[56px] left-[787px] hidden sm:inline"
              drag
              dragSnapToOrigin
            >
              <Image
                src={messageImage}
                height={200}
                width={200}
                alt=""
                className="max-w-none"
                draggable={false}
              />
            </motion.div>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-center text-xl mt-8 max-w-md">
            A project management tool designed to help you stay focused and
            organized. While taking control of your projects and tasks, one task
            at a time.
          </p>
        </div>
        <div className="flex items-center justify-center gap-4 mt-8">
          <a href="/signin">
            <button className="bg-white text-black py-3 px-5 rounded-lg font-medium">
              Get Started for Free
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};
