import React from "react";
import { motion } from "framer-motion";
import AboutCard from "./AboutCard";

const AboutSection = () => {
  return (
    <section className="py-6 px-8 overflow-hidden bg-white">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 70, damping: 15 }}
        viewport={{ once: true }}
        className="flex items-center justify-between px-4 py-2 mt-3 mb-8"
      >
        <h1 className="text-2xl md:text-4xl font-bold text-gray-900 relative inline-block">
          About Us
        </h1>
      </motion.div>

      <AboutCard />
    </section>
  );
};

export default AboutSection;
