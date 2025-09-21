import React from "react";
import { FaLongArrowAltRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const textVariant = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

const AboutCard = () => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      transition={{ staggerChildren: 0.2 }}
      className="max-w-6xl mx-auto flex flex-col md:flex-row items-center md:space-x-12 px-4 md:px-6 py-2"
    >
      <motion.div
        initial={{ opacity: 0, x: -50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2"
      >
        <motion.h2
          variants={textVariant}
          custom={0}
          className="text-xl md:text-2xl font-bold mb-4 text-gray-900"
        >
          Our <span className="text-blue-600">Story</span>
        </motion.h2>

        <motion.p
          variants={textVariant}
          custom={1}
          className="mb-4 text-gray-800 leading-relaxed"
        >
          We are committed to delivering innovative solutions with a focus on
          quality and customer satisfaction. Our team of experts works
          tirelessly to bring your ideas to life and help your business grow.
        </motion.p>

        <motion.p
          variants={textVariant}
          custom={2}
          className="mb-6 text-gray-800 leading-relaxed"
        >
          Join us on our journey to make a difference in the industry through
          creativity, dedication, and excellence.
        </motion.p>

        <motion.div
          whileHover={{ x: 5 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
        >
          <Link
            to="/about"
            className="group flex items-center gap-2 text-lg md:text-xl font-medium cursor-pointer transition-all duration-300 relative w-fit text-blue-600 hover:text-blue-800"
          >
            <span className="relative">
              See All
              <span className="absolute left-0 -bottom-1 h-[2px] w-0 bg-blue-600 transition-all duration-300 group-hover:w-full"></span>
            </span>
            <FaLongArrowAltRight className="transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50, scale: 0.95 }}
        whileInView={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 15, delay: 0.3 }}
        viewport={{ once: true }}
        className="w-full md:w-1/2 mt-8 md:mt-0"
      >
        <motion.img
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?ixlib=rb-4.0.4&auto=format&fit=crop&w=800&q=80"
          alt="Our Team"
          className="rounded-xl shadow-lg object-cover w-full h-full"
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 200, damping: 12 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default AboutCard;
